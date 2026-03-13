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

      // ─── Brand Palette ────────────────────────────────────────────────────
      // #461AA2 — deep violet (primary / hero bg)
      // #C5FA19 — electric lime (accent / CTA)
      // #00D4D4 — cyan / teal (secondary accent)
      // #FF1493 — hot pink (highlight / status)
      const VIOLET   = [70,  26,  162];   // #461AA2
      const VIOLET_D = [38,  12,  96];    // darker violet for depth
      const VIOLET_L = [90,  50,  200];   // lighter violet for layers
      const LIME     = [197, 250,  25];   // #C5FA19
      const CYAN     = [0,   212, 212];   // #00D4D4
      const PINK     = [255,  20, 147];   // #FF1493
      const WHITE    = [255, 255, 255];
      const INK      = [20,   8,  50];    // near-black with violet tint
      const MUTED    = [140, 120, 180];   // muted violet-grey
      const SURFACE  = [245, 242, 255];   // very light violet tint
      const BORDER   = [210, 195, 245];   // soft violet border

      // ─── Page background — deep violet gradient ───────────────────────────
      const bgStops = [
        [28,  8,  80],
        [38, 12,  96],
        [50, 18, 120],
        [60, 22, 140],
        [70, 26, 162],
        [55, 20, 130],
      ];
      const stripeH = H / bgStops.length;
      bgStops.forEach(([r, g, b], i) => {
        pdf.setFillColor(r, g, b);
        pdf.rect(0, i * stripeH, W, stripeH + 2, "F");
      });

      // Scattered glow dots on bg
      const glowDots = [
        [60, 80, 40, ...CYAN, 0.08],
        [W - 80, 60, 50, ...LIME, 0.06],
        [W - 40, H * 0.4, 35, ...PINK, 0.07],
        [50, H * 0.7, 45, ...CYAN, 0.06],
        [W * 0.5, H * 0.15, 60, ...LIME, 0.05],
      ];
      glowDots.forEach(([gx, gy, gr, r, g, b, op]) => {
        pdf.setGState(new pdf.GState({ opacity: op }));
        pdf.setFillColor(r, g, b);
        pdf.circle(gx, gy, gr, "F");
      });
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // ─── Card ─────────────────────────────────────────────────────────────
      const cX = 28, cY = 28, cW = W - 56, cH = H - 56;

      // Card glow shadow
      pdf.setGState(new pdf.GState({ opacity: 0.45 }));
      pdf.setFillColor(...CYAN);
      pdf.roundedRect(cX + 3, cY + 5, cW, cH, 24, 24, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Card body — pure white
      pdf.setFillColor(...WHITE);
      pdf.roundedRect(cX, cY, cW, cH, 24, 24, "F");

      // Card border — cyan glow
      pdf.setDrawColor(...CYAN);
      pdf.setLineWidth(2);
      pdf.roundedRect(cX, cY, cW, cH, 24, 24, "S");

      // ─── Hero ─────────────────────────────────────────────────────────────
      const heroH = 174;

      // Base violet
      pdf.setFillColor(...VIOLET_D);
      pdf.roundedRect(cX, cY, cW, heroH + 24, 24, 24, "F");
      pdf.setFillColor(...VIOLET_D);
      pdf.rect(cX, cY + heroH - 10, cW, 34, "F");

      // Gradient overlay layers — violet to deep
      pdf.setGState(new pdf.GState({ opacity: 0.5 }));
      pdf.setFillColor(...VIOLET);
      pdf.rect(cX, cY, cW, heroH * 0.6, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Diagonal lime accent slice
      pdf.setGState(new pdf.GState({ opacity: 0.12 }));
      pdf.setFillColor(...LIME);
      pdf.lines(
        [[160, 0], [-90, heroH + 24], [-160, 0], [90, -(heroH + 24)]],
        cX + cW * 0.45, cY, [1, 1], "F", true
      );
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Cyan diagonal slice (offset)
      pdf.setGState(new pdf.GState({ opacity: 0.09 }));
      pdf.setFillColor(...CYAN);
      pdf.lines(
        [[100, 0], [-60, heroH + 24], [-100, 0], [60, -(heroH + 24)]],
        cX + cW * 0.68, cY, [1, 1], "F", true
      );
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Wave on hero bottom — CYAN
      pdf.setGState(new pdf.GState({ opacity: 0.6 }));
      pdf.setFillColor(...CYAN);
      const wBaseY = cY + heroH - 30;
      const wPts = [];
      for (let i = 0; i <= 32; i++) {
        wPts.push([cX + (i / 32) * cW, wBaseY + Math.sin((i / 32) * Math.PI * 4 + 0.6) * 11]);
      }
      wPts.push([cX + cW, wBaseY + 44], [cX, wBaseY + 44]);
      pdf.lines(wPts.slice(1).map((p,i)=>[p[0]-wPts[i][0],p[1]-wPts[i][1]]), wPts[0][0], wPts[0][1], [1,1], "F", true);
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Wave on hero bottom — LIME (offset)
      pdf.setGState(new pdf.GState({ opacity: 0.25 }));
      pdf.setFillColor(...LIME);
      const w2BaseY = cY + heroH - 16;
      const w2Pts = [];
      for (let i = 0; i <= 32; i++) {
        w2Pts.push([cX + (i / 32) * cW, w2BaseY + Math.sin((i / 32) * Math.PI * 5 + 2.0) * 7]);
      }
      w2Pts.push([cX + cW, w2BaseY + 28], [cX, w2BaseY + 28]);
      pdf.lines(w2Pts.slice(1).map((p,i)=>[p[0]-w2Pts[i][0],p[1]-w2Pts[i][1]]), w2Pts[0][0], w2Pts[0][1], [1,1], "F", true);
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Floating glow orbs in hero
      [
        [cX + cW - 55, cY + 35, 22, ...PINK,  0.15],
        [cX + cW - 90, cY + 65, 14, ...CYAN,  0.13],
        [cX + cW - 38, cY + 72, 10, ...LIME,  0.18],
        [cX + cW - 115, cY + 42, 8,  ...LIME, 0.10],
      ].forEach(([ox, oy, or_, r, g, b, op]) => {
        pdf.setGState(new pdf.GState({ opacity: op }));
        pdf.setFillColor(r, g, b);
        pdf.circle(ox, oy, or_, "F");
      });
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // ── Lime left accent bar ──
      pdf.setFillColor(...LIME);
      pdf.roundedRect(cX + 20, cY + 24, 4, heroH - 20, 2, 2, "F");

      // ── Logo ──
      if (logoDataUrl) {
        pdf.addImage(logoDataUrl, "PNG", cX + 32, cY + 16, 132, 46);
      } else {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.setTextColor(...LIME);
        pdf.text("THE WAVES", cX + 32, cY + 46);
      }

      // ── Park subtitle ──
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      pdf.setTextColor(...CYAN);
      pdf.setCharSpace(2.2);
      pdf.text("WATERPARK & AMUSEMENT PARK", cX + 32, cY + 74);
      pdf.setCharSpace(0);

      // ── Ticket / pass name ──
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(25);
      pdf.setTextColor(...WHITE);
      const eventLines = pdf.splitTextToSize(ticket.note || "Day Pass", cW - 230);
      pdf.text(eventLines, cX + 32, cY + 106);

      // ── Sub-label ──
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(190, 170, 240);
      pdf.text("Present this ticket at the entrance for verification", cX + 32, cY + 138);

      // ── Amount badge (top-right) ──
      const badgeX = cX + cW - 142, badgeY = cY + 16;
      pdf.setGState(new pdf.GState({ opacity: 0.18 }));
      pdf.setFillColor(...WHITE);
      pdf.roundedRect(badgeX, badgeY, 120, 60, 14, 14, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));
      // Lime top accent line on badge
      pdf.setFillColor(...LIME);
      pdf.roundedRect(badgeX, badgeY, 120, 4, 2, 2, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      pdf.setTextColor(...LIME);
      pdf.setCharSpace(1.5);
      pdf.text("AMOUNT PAID", badgeX + 12, badgeY + 20);
      pdf.setCharSpace(0);
      pdf.setFontSize(20);
      pdf.setTextColor(...WHITE);
      pdf.text(`${ticket.currency || "INR"} ${ticket.amount || 0}`, badgeX + 12, badgeY + 46);

      // ── Status pill ──
      const pillX = cX + cW - 142, pillY = cY + 92;
      const pillBg = isRedeemed ? PINK : LIME;
      const pillText = isRedeemed ? WHITE : VIOLET_D;
      pdf.setFillColor(...pillBg);
      pdf.roundedRect(pillX, pillY, 120, 28, 14, 14, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(...pillText);
      const statusText = isRedeemed ? "● REDEEMED" : "✓ VALID FOR ENTRY";
      const stW = pdf.getTextWidth(statusText);
      pdf.text(statusText, pillX + (120 - stW) / 2, pillY + 18);

      // ─── Perforated tear line ──────────────────────────────────────────────
      const perfY = cY + heroH + 24;

      // Notch circles — use page bg color
      pdf.setFillColor(50, 18, 120); // matches bg gradient at that Y
      pdf.circle(cX - 1, perfY, 18, "F");
      pdf.circle(cX + cW + 1, perfY, 18, "F");

      // Dashed line — CYAN
      pdf.setDrawColor(...CYAN);
      pdf.setLineWidth(1.2);
      pdf.setLineDash([6, 5], 0);
      pdf.line(cX + 20, perfY, cX + cW - 20, perfY);
      pdf.setLineDash([], 0);

      // "ADMIT ONE" centred on the tear line
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7.5);
      pdf.setTextColor(...MUTED);
      pdf.setCharSpace(2.5);
      const admitText = "✂  ADMIT ONE";
      const admitW = pdf.getTextWidth(admitText);
      pdf.text(admitText, cX + (cW - admitW) / 2 - 4, perfY + 4.5);
      pdf.setCharSpace(0);

      // ─── Body layout ──────────────────────────────────────────────────────
      const bodyTop  = perfY + 24;
      const col1X    = cX + 24;
      const col1W    = (cW - 52 - 150) * 0.56;
      const col2X    = col1X + col1W + 16;
      const col2W    = (cW - 52 - 150) * 0.44 - 16;
      const qrPanelX = cX + cW - 160;
      const qrPanelW = 138;

      function infoRow(label, value, x, y, w, opts = {}) {
        const { size = 12, bold = false, color = INK } = opts;
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7.5);
        pdf.setTextColor(...MUTED);
        pdf.setCharSpace(1.2);
        pdf.text(label.toUpperCase(), x, y);
        pdf.setCharSpace(0);
        pdf.setFont("helvetica", bold ? "bold" : "normal");
        pdf.setFontSize(size);
        pdf.setTextColor(...color);
        const lines = pdf.splitTextToSize(String(value || "—"), w);
        pdf.text(lines, x, y + 13);
        return y + 13 + lines.length * (size + 1.5);
      }

      // Left column
      let ly = bodyTop + 8;
      ly = infoRow("Guest Name", ticket.customerName, col1X, ly, col1W,
                   { size: 18, bold: true, color: VIOLET });
      ly += 20;
      ly = infoRow("Mobile", ticket.customerPhone, col1X, ly, col1W, { size: 12 });
      ly += 14;
      ly = infoRow("Email", ticket.customerEmail, col1X, ly, col1W, { size: 10 });

      // Right column
      let ry = bodyTop + 8;
      ry = infoRow("Payment Time", paidAt, col2X, ry, col2W, { size: 10 });
      ry += 14;
      ry = infoRow("Order Reference", ticket.orderId, col2X, ry, col2W, { size: 10 });
      ry += 14;
      ry = infoRow("Ticket ID", ticket.ticketId, col2X, ry, col2W,
                   { size: 10, bold: true, color: [0, 180, 180] }); // darker cyan for readability

      // ─── QR panel ─────────────────────────────────────────────────────────
      const maxColY  = Math.max(ly, ry);
      const qrPanelH = maxColY - bodyTop + 24;

      // Panel bg — very light violet tint
      pdf.setFillColor(...SURFACE);
      pdf.roundedRect(qrPanelX, bodyTop - 8, qrPanelW, qrPanelH + 8, 16, 16, "F");
      pdf.setDrawColor(...BORDER);
      pdf.setLineWidth(0.8);
      pdf.roundedRect(qrPanelX, bodyTop - 8, qrPanelW, qrPanelH + 8, 16, 16, "S");

      // Cyan top accent bar
      pdf.setFillColor(...CYAN);
      pdf.roundedRect(qrPanelX, bodyTop - 8, qrPanelW, 5, 3, 3, "F");

      const qrSize = qrPanelW - 24;
      const qrX    = qrPanelX + 12;
      const qrY    = bodyTop + 6;

      pdf.setFillColor(...WHITE);
      pdf.roundedRect(qrX, qrY, qrSize, qrSize, 10, 10, "F");
      pdf.setDrawColor(...BORDER);
      pdf.setLineWidth(0.6);
      pdf.roundedRect(qrX, qrY, qrSize, qrSize, 10, 10, "S");

      if (qrDataUrl) {
        pdf.addImage(qrDataUrl, "PNG", qrX + 5, qrY + 5, qrSize - 10, qrSize - 10);
      } else {
        pdf.setFillColor(...BORDER);
        pdf.roundedRect(qrX + 8, qrY + 8, qrSize - 16, qrSize - 16, 6, 6, "F");
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7);
        pdf.setTextColor(...MUTED);
        pdf.text("QR CODE", qrX + qrSize / 2 - 15, qrY + qrSize / 2 + 3);
      }

      const qrLabelY = qrY + qrSize + 14;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8.5);
      pdf.setTextColor(...VIOLET);
      pdf.text("Scan to verify", qrX, qrLabelY);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.setTextColor(...MUTED);
      pdf.text(pdf.splitTextToSize("Opens live ticket verification", qrSize + 10), qrX, qrLabelY + 12);

      // ─── Footer separator ──────────────────────────────────────────────────
      const sepY = cY + cH - 114;

      // Mini wave strip using CYAN
      pdf.setGState(new pdf.GState({ opacity: 0.08 }));
      pdf.setFillColor(...CYAN);
      const swPts = [];
      for (let i = 0; i <= 30; i++) {
        swPts.push([cX + (i / 30) * cW, sepY + Math.sin((i / 30) * Math.PI * 5) * 5]);
      }
      swPts.push([cX + cW, sepY + 26], [cX, sepY + 26]);
      pdf.lines(swPts.slice(1).map((p,i)=>[p[0]-swPts[i][0],p[1]-swPts[i][1]]), swPts[0][0], swPts[0][1], [1,1], "F", true);
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      pdf.setDrawColor(...BORDER);
      pdf.setLineWidth(0.8);
      pdf.line(cX + 24, sepY + 4, cX + cW - 24, sepY + 4);

      // ─── Footer ───────────────────────────────────────────────────────────
      const ftY = sepY + 22;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8.5);
      pdf.setTextColor(...VIOLET);
      pdf.setCharSpace(1);
      pdf.text("VERIFICATION INSTRUCTIONS", cX + 24, ftY);
      pdf.setCharSpace(0);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(...MUTED);
      const footerLines = pdf.splitTextToSize(
        "Present this ticket at the entrance gate. Staff will scan the QR code to confirm your ticket is valid. Entry is for one person only — do not share or duplicate this ticket.",
        cW - 48
      );
      pdf.text(footerLines, cX + 24, ftY + 14);

      // ── Bottom brand strip ──
      // Thin violet gradient bar
      pdf.setFillColor(...VIOLET_D);
      pdf.roundedRect(cX, cY + cH - 34, cW, 34, 0, 0, "F");
      pdf.setFillColor(...VIOLET_D);
      pdf.roundedRect(cX, cY + cH - 34, cW, 34, 24, 24, "F");
      // flatten top corners
      pdf.setFillColor(...VIOLET_D);
      pdf.rect(cX, cY + cH - 34, cW, 17, "F");

      // Lime dots
      pdf.setFillColor(...LIME);
      pdf.circle(cX + 22, cY + cH - 17, 4, "F");
      pdf.setFillColor(...CYAN);
      pdf.circle(cX + cW - 22, cY + cH - 17, 4, "F");
      pdf.setFillColor(...PINK);
      pdf.circle(cX + cW / 2, cY + cH - 17, 3, "F");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(...CYAN);
      const brandLine = "The Waves Waterpark & Amusement Park";
      const brandLineW = pdf.getTextWidth(brandLine);
      pdf.text(brandLine, cX + (cW - brandLineW) / 2, cY + cH - 11);

      // ─── Corner accents (top) ──────────────────────────────────────────────
      pdf.setFillColor(...LIME);
      pdf.circle(cX + 22, cY + 22, 7, "F");
      pdf.setFillColor(...PINK);
      pdf.circle(cX + cW - 22, cY + 22, 7, "F");

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