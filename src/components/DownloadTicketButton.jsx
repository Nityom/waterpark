"use client";

import { useState } from "react";
import jsPDF from "jspdf";

function loadImageAsDataUrl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("Could not load image");
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Could not read image"));
      reader.readAsDataURL(blob);
    } catch (error) {
      reject(error);
    }
  });
}

export default function DownloadTicketButton({
  fileName = "ticket.pdf",
  ticket,
  qrSource,
}) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!ticket || downloading) return;

    try {
      setDownloading(true);

      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const W = pdf.internal.pageSize.getWidth();   // 595.28
      const H = pdf.internal.pageSize.getHeight();  // 841.89

      // ─── Load assets ──────────────────────────────────────────────────────
      const [qrDataUrl, logoDataUrl] = await Promise.all([
        qrSource ? loadImageAsDataUrl(qrSource).catch(() => null) : Promise.resolve(null),
        loadImageAsDataUrl("/logo.png").catch(() => null),
      ]);

      const paidAt = ticket.paymentTime
        ? new Date(ticket.paymentTime).toLocaleString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit",
          })
        : "—";
      const isRedeemed = ticket.status === "redeemed";

      // ─── Palette ──────────────────────────────────────────────────────────
      const VIOLET   = [70,  26, 162];   // #461AA2
      const VIOLET_D = [32,  10,  85];   // darker hero bg
      const LIME     = [197, 250,  25];  // #C5FA19
      const CYAN     = [0,  212, 212];   // #00D4D4
      const PINK     = [255,  20, 147];  // #FF1493
      const WHITE    = [255, 255, 255];
      const INK      = [20,   8,  50];
      const MUTED    = [140, 120, 180];
      const SURFACE  = [245, 242, 255];
      const BORDER   = [210, 195, 245];

      // ─── Helper: wave path ────────────────────────────────────────────────
      function drawWave(baseY, fillColor, opacity, amplitude, frequency, phaseShift, bandH) {
        pdf.setGState(new pdf.GState({ opacity }));
        pdf.setFillColor(...fillColor);
        const pts = [];
        const steps = 40;
        for (let i = 0; i <= steps; i++) {
          const x = cX + (i / steps) * cW;
          const y = baseY + Math.sin((i / steps) * Math.PI * frequency + phaseShift) * amplitude;
          pts.push([x, y]);
        }
        pts.push([cX + cW, baseY + bandH], [cX, baseY + bandH]);
        pdf.lines(
          pts.slice(1).map((p, i) => [p[0] - pts[i][0], p[1] - pts[i][1]]),
          pts[0][0], pts[0][1], [1, 1], "F", true
        );
        pdf.setGState(new pdf.GState({ opacity: 1 }));
      }

      // ─── Layout constants ─────────────────────────────────────────────────
      // Page margin
      const margin = 28;
      const cX = margin, cY = margin, cW = W - margin * 2, cH = H - margin * 2;

      // Hero height — enough for logo + subtitle + title (2 lines) + sub-label + waves
      const heroH = 210;
      // Tear line
      const tearY = cY + heroH;
      // Body starts below tear
      const bodyPad = 24;
      const bodyTop = tearY + bodyPad;

      // QR panel dimensions
      const qrPanelW = 138;
      const qrSize   = qrPanelW - 22;
      const qrPanelX = cX + cW - qrPanelW - 16;

      // Body columns — left of QR panel
      const col1X  = cX + 24;
      const col2X  = cX + 24 + (qrPanelX - cX - 24) * 0.50 + 12;
      const col1W  = (qrPanelX - cX - 24) * 0.50 - 12;
      const col2W  = qrPanelX - col2X - 12;

      // infoRow helper
      function infoRow(label, value, x, y, w, opts = {}) {
        const { size = 11, bold = false, color = INK } = opts;
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7);
        pdf.setTextColor(...MUTED);
        pdf.setCharSpace(1.2);
        pdf.text(label.toUpperCase(), x, y);
        pdf.setCharSpace(0);
        pdf.setFont("helvetica", bold ? "bold" : "normal");
        pdf.setFontSize(size);
        pdf.setTextColor(...color);
        const lines = pdf.splitTextToSize(String(value || "—"), w);
        pdf.text(lines, x, y + 12);
        return y + 12 + lines.length * (size + 2);
      }

      // ── Measure body content height so we can size the card precisely ──
      // We do a dry-run measuring pass (no actual drawing yet)
      let ly = bodyTop;
      // simulate left column
      const guestLines = pdf.splitTextToSize(String(ticket.customerName || "—"), col1W);
      ly += 12 + guestLines.length * (17 + 2); // size 17
      ly += 16;
      ly += 12 + 1 * (11 + 2); // mobile
      ly += 14;
      ly += 12 + pdf.splitTextToSize(String(ticket.customerEmail || "—"), col1W).length * (10 + 2);

      let ry = bodyTop;
      ry += 12 + pdf.splitTextToSize(String(paidAt), col2W).length * (10 + 2);
      ry += 14;
      ry += 12 + pdf.splitTextToSize(String(ticket.orderId || "—"), col2W).length * (10 + 2);
      ry += 14;
      ry += 12 + pdf.splitTextToSize(String(ticket.ticketId || "—"), col2W).length * (10 + 2);

      const bodyContentBottom = Math.max(ly, ry);

      // Divider + footer
      const dividerY   = bodyContentBottom + 28;
      const footerY    = dividerY + 22;
      const footerLines = pdf.splitTextToSize(
        "Present this ticket at the entrance gate. Staff will scan the QR code to confirm your ticket is valid. Entry is for one person only — do not share or duplicate this ticket.",
        cW - 48
      );
      const footerBottom = footerY + 14 + footerLines.length * 12;

      // Brand strip height
      const stripH = 38;
      const stripPad = 16;

      // Total card height driven by content
      const neededCH = (footerBottom - cY) + stripPad + stripH + margin;
      // Use whichever is taller — full A4 or content-driven
      // We keep cH fixed as A4 minus margins but verify footer fits
      // (A4 = 841.89pt, cH = 841.89 - 56 = 785.89)
      // footer will always fit for normal ticket data

      // ─── Page background ──────────────────────────────────────────────────
      const bgStops = [
        [20, 6, 60], [28, 8, 78], [38, 12, 95],
        [50, 18, 118], [62, 22, 142], [70, 26, 162],
      ];
      bgStops.forEach(([r, g, b], i) => {
        pdf.setFillColor(r, g, b);
        pdf.rect(0, i * (H / bgStops.length), W, H / bgStops.length + 2, "F");
      });

      // Glow orbs on bg
      [[60, 80, 48, ...CYAN, 0.07], [W - 65, 55, 42, ...LIME, 0.05],
       [W - 30, H * 0.38, 36, ...PINK, 0.06], [48, H * 0.72, 40, ...CYAN, 0.05]]
        .forEach(([gx, gy, gr, r, g, b, op]) => {
          pdf.setGState(new pdf.GState({ opacity: op }));
          pdf.setFillColor(r, g, b); pdf.circle(gx, gy, gr, "F");
        });
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // ─── Card shadow + body ───────────────────────────────────────────────
      pdf.setGState(new pdf.GState({ opacity: 0.38 }));
      pdf.setFillColor(...CYAN);
      pdf.roundedRect(cX + 3, cY + 6, cW, cH, 24, 24, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      pdf.setFillColor(...WHITE);
      pdf.roundedRect(cX, cY, cW, cH, 24, 24, "F");
      pdf.setDrawColor(...CYAN);
      pdf.setLineWidth(2);
      pdf.roundedRect(cX, cY, cW, cH, 24, 24, "S");

      // ─── Hero block ───────────────────────────────────────────────────────
      pdf.setFillColor(...VIOLET_D);
      pdf.roundedRect(cX, cY, cW, heroH + 24, 24, 24, "F");
      pdf.rect(cX, cY + heroH - 4, cW, 28, "F"); // flatten bottom corners

      // Violet overlay
      pdf.setGState(new pdf.GState({ opacity: 0.48 }));
      pdf.setFillColor(...VIOLET);
      pdf.rect(cX, cY, cW, heroH * 0.55, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Diagonal accent slices
      pdf.setGState(new pdf.GState({ opacity: 0.09 }));
      pdf.setFillColor(...LIME);
      pdf.lines([[170,0],[-95,heroH+24],[-170,0],[95,-(heroH+24)]], cX+cW*0.44, cY, [1,1], "F", true);
      pdf.setGState(new pdf.GState({ opacity: 0.07 }));
      pdf.setFillColor(...CYAN);
      pdf.lines([[100,0],[-58,heroH+24],[-100,0],[58,-(heroH+24)]], cX+cW*0.67, cY, [1,1], "F", true);
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Floating orbs
      [[cX+cW-58,cY+36,20,...PINK,0.14],[cX+cW-90,cY+60,13,...CYAN,0.12],[cX+cW-40,cY+72,9,...LIME,0.16]]
        .forEach(([ox,oy,or_,r,g,b,op]) => {
          pdf.setGState(new pdf.GState({ opacity: op }));
          pdf.setFillColor(r,g,b); pdf.circle(ox,oy,or_,"F");
        });
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Waves inside hero
      drawWave(cY + heroH - 42, CYAN, 0.58, 12, 4, 0.6, 55);
      drawWave(cY + heroH - 22, LIME, 0.20, 7,  5, 2.0, 32);

      // Lime left accent bar
      pdf.setFillColor(...LIME);
      pdf.roundedRect(cX + 18, cY + 20, 4, heroH - 16, 2, 2, "F");

      // ── Logo ──────────────────────────────────────────────────────────────
      if (logoDataUrl) {
        pdf.addImage(logoDataUrl, "PNG", cX + 30, cY + 13, 128, 46);
      } else {
        pdf.setFont("helvetica", "bold"); pdf.setFontSize(15);
        pdf.setTextColor(...LIME);
        pdf.text("THE WAVES", cX + 30, cY + 44);
      }

      // Park subtitle
      pdf.setFont("helvetica", "bold"); pdf.setFontSize(7.5);
      pdf.setTextColor(...CYAN); pdf.setCharSpace(2.2);
      pdf.text("WATERPARK & AMUSEMENT PARK", cX + 30, cY + 74);
      pdf.setCharSpace(0);

      // Ticket name (max 2 lines, font 21)
      pdf.setFont("helvetica", "bold"); pdf.setFontSize(21);
      pdf.setTextColor(...WHITE);
      const maxTitleW = cW - 180; // leave room for badge on right
      const eventLines = pdf.splitTextToSize(ticket.note || "Day Pass", maxTitleW).slice(0, 2);
      pdf.text(eventLines, cX + 30, cY + 108);
      const titleBottom = cY + 108 + eventLines.length * 24;

      // Sub-label
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(8.5);
      pdf.setTextColor(185, 165, 238);
      pdf.text("Present this ticket at the entrance for verification", cX + 30, titleBottom + 16);

      // ── Amount badge — top right, inside hero ─────────────────────────────
      // Badge: fixed right of card, top-aligned, width 130
      const badgeW  = 130;
      const badgeH  = 60;
      const badgeX  = cX + cW - badgeW - 14;
      const badgeY  = cY + 14;

      pdf.setGState(new pdf.GState({ opacity: 0.20 }));
      pdf.setFillColor(...WHITE);
      pdf.roundedRect(badgeX, badgeY, badgeW, badgeH, 13, 13, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));
      pdf.setFillColor(...LIME);
      pdf.roundedRect(badgeX, badgeY, badgeW, 4, 2, 2, "F");
      pdf.setFont("helvetica", "bold"); pdf.setFontSize(7.5);
      pdf.setTextColor(...LIME); pdf.setCharSpace(1.5);
      pdf.text("AMOUNT PAID", badgeX + 12, badgeY + 19);
      pdf.setCharSpace(0);
      pdf.setFontSize(21); pdf.setTextColor(...WHITE);
      pdf.text(`${ticket.currency || "INR"} ${ticket.amount || 0}`, badgeX + 12, badgeY + 46);

      // ── Status pill — below badge, same right alignment ───────────────────
      const pillW   = badgeW;
      const pillH   = 28;
      const pillX   = badgeX;
      const pillY   = badgeY + badgeH + 10;

      pdf.setFillColor(...(isRedeemed ? PINK : LIME));
      pdf.roundedRect(pillX, pillY, pillW, pillH, 14, 14, "F");
      pdf.setFont("helvetica", "bold"); pdf.setFontSize(9);
      pdf.setTextColor(...(isRedeemed ? WHITE : VIOLET_D));
      const statusLabel = isRedeemed ? "● REDEEMED" : "✓ VALID FOR ENTRY";
      const labelW = pdf.getTextWidth(statusLabel);
      pdf.text(statusLabel, pillX + (pillW - labelW) / 2, pillY + 18);

      // ─── Perforated tear line ──────────────────────────────────────────────
      pdf.setFillColor(38, 12, 95);
      pdf.circle(cX - 1,      tearY, 17, "F");
      pdf.circle(cX + cW + 1, tearY, 17, "F");
      pdf.setDrawColor(...CYAN); pdf.setLineWidth(1.2);
      pdf.setLineDash([6, 5], 0);
      pdf.line(cX + 18, tearY, cX + cW - 18, tearY);
      pdf.setLineDash([], 0);
      pdf.setFont("helvetica", "bold"); pdf.setFontSize(7.5);
      pdf.setTextColor(...MUTED); pdf.setCharSpace(2.5);
      const admitText = "✂  ADMIT ONE";
      pdf.text(admitText, cX + (cW - pdf.getTextWidth(admitText)) / 2, tearY + 4);
      pdf.setCharSpace(0);

      // ─── Body content ─────────────────────────────────────────────────────
      // QR panel
      const qrPanelY = bodyTop - 8;
      const qrX      = qrPanelX + 11;
      const qrY      = qrPanelY + 14;
      const qrPanelH = qrSize + 14 + 12 + 22 + 10; // qr box + label rows + padding

      pdf.setFillColor(...SURFACE);
      pdf.roundedRect(qrPanelX, qrPanelY, qrPanelW, qrPanelH, 14, 14, "F");
      pdf.setDrawColor(...BORDER); pdf.setLineWidth(0.8);
      pdf.roundedRect(qrPanelX, qrPanelY, qrPanelW, qrPanelH, 14, 14, "S");
      pdf.setFillColor(...CYAN);
      pdf.roundedRect(qrPanelX, qrPanelY, qrPanelW, 5, 3, 3, "F");

      pdf.setFillColor(...WHITE);
      pdf.roundedRect(qrX, qrY, qrSize, qrSize, 8, 8, "F");
      pdf.setDrawColor(...BORDER); pdf.setLineWidth(0.5);
      pdf.roundedRect(qrX, qrY, qrSize, qrSize, 8, 8, "S");

      if (qrDataUrl) {
        pdf.addImage(qrDataUrl, "PNG", qrX + 4, qrY + 4, qrSize - 8, qrSize - 8);
      } else {
        pdf.setFillColor(...BORDER);
        pdf.roundedRect(qrX + 8, qrY + 8, qrSize - 16, qrSize - 16, 6, 6, "F");
        pdf.setFont("helvetica", "normal"); pdf.setFontSize(7);
        pdf.setTextColor(...MUTED);
        pdf.text("QR CODE", qrX + qrSize / 2 - 14, qrY + qrSize / 2 + 3);
      }

      const qrLabelY = qrY + qrSize + 12;
      pdf.setFont("helvetica", "bold"); pdf.setFontSize(8);
      pdf.setTextColor(...VIOLET);
      pdf.text("Scan to verify", qrX, qrLabelY);
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(7);
      pdf.setTextColor(...MUTED);
      pdf.text("Opens live ticket verification", qrX, qrLabelY + 11);

      // Left column — draw for real
      let lyCursor = bodyTop;
      lyCursor = infoRow("Guest Name", ticket.customerName, col1X, lyCursor, col1W,
                         { size: 17, bold: true, color: VIOLET });
      lyCursor += 16;
      lyCursor = infoRow("Mobile", ticket.customerPhone, col1X, lyCursor, col1W, { size: 11 });
      lyCursor += 14;
      lyCursor = infoRow("Email", ticket.customerEmail, col1X, lyCursor, col1W, { size: 10 });

      // Right column
      let ryCursor = bodyTop;
      ryCursor = infoRow("Payment Time", paidAt, col2X, ryCursor, col2W, { size: 10 });
      ryCursor += 14;
      ryCursor = infoRow("Order Reference", ticket.orderId, col2X, ryCursor, col2W, { size: 10 });
      ryCursor += 14;
      ryCursor = infoRow("Ticket ID", ticket.ticketId, col2X, ryCursor, col2W,
                         { size: 10, bold: true, color: [0, 158, 158] });

      // ─── Divider ──────────────────────────────────────────────────────────
      const contentBottom = Math.max(lyCursor, ryCursor, qrPanelY + qrPanelH);
      const divY = contentBottom + 30;

      // Subtle wave behind divider
      pdf.setGState(new pdf.GState({ opacity: 0.07 }));
      pdf.setFillColor(...CYAN);
      const swPts = [];
      for (let i = 0; i <= 30; i++)
        swPts.push([cX + (i / 30) * cW, divY + Math.sin((i / 30) * Math.PI * 5) * 4]);
      swPts.push([cX + cW, divY + 20], [cX, divY + 20]);
      pdf.lines(swPts.slice(1).map((p,i)=>[p[0]-swPts[i][0],p[1]-swPts[i][1]]), swPts[0][0], swPts[0][1],[1,1],"F",true);
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      pdf.setDrawColor(...BORDER); pdf.setLineWidth(0.8);
      pdf.line(cX + 22, divY, cX + cW - 22, divY);

      // ─── Footer instructions ───────────────────────────────────────────────
      const ftY = divY + 20;
      pdf.setFont("helvetica", "bold"); pdf.setFontSize(8.5);
      pdf.setTextColor(...VIOLET); pdf.setCharSpace(1);
      pdf.text("VERIFICATION INSTRUCTIONS", cX + 22, ftY);
      pdf.setCharSpace(0);

      pdf.setFont("helvetica", "normal"); pdf.setFontSize(8.5);
      pdf.setTextColor(...MUTED);
      const ftLines = pdf.splitTextToSize(
        "Present this ticket at the entrance gate. Staff will scan the QR code to confirm your ticket is valid. Entry is for one person only — do not share or duplicate this ticket.",
        cW - 44
      );
      pdf.text(ftLines, cX + 22, ftY + 14);
      const ftBottom = ftY + 14 + ftLines.length * 11;

      // ─── Brand strip ──────────────────────────────────────────────────────
      const stripTop = ftBottom + 28;

      // Flatten top of rounded card bottom
      pdf.setFillColor(...VIOLET_D);
      pdf.roundedRect(cX, stripTop, cW, cY + cH - stripTop, 24, 24, "F");
      pdf.rect(cX, stripTop, cW, 18, "F"); // flatten top corners of this strip

      // 3 colour accent dots
      const dotY = stripTop + (cY + cH - stripTop) / 2;
      pdf.setFillColor(...LIME); pdf.circle(cX + 24, dotY, 4, "F");
      pdf.setFillColor(...CYAN); pdf.circle(cX + cW - 24, dotY, 4, "F");
      pdf.setFillColor(...PINK); pdf.circle(cX + cW / 2, dotY, 3, "F");

      pdf.setFont("helvetica", "bold"); pdf.setFontSize(8.5);
      pdf.setTextColor(...CYAN);
      const brand = "The Waves Waterpark & Amusement Park";
      pdf.text(brand, cX + (cW - pdf.getTextWidth(brand)) / 2, dotY + 4);

      // ─── Top corner accent dots ────────────────────────────────────────────
      pdf.setFillColor(...LIME); pdf.circle(cX + 20, cY + 20, 7, "F");
      pdf.setFillColor(...PINK); pdf.circle(cX + cW - 20, cY + 20, 7, "F");

      pdf.save(fileName);
    } catch (error) {
      console.error("Ticket PDF download failed:", error);
      alert("Could not download the ticket PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#461AA2] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#3a1488] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" />
      </svg>
      {downloading ? "Preparing PDF…" : "Download Ticket"}
    </button>
  );
}