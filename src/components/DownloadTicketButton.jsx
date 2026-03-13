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
      const VIOLET   = [70,  26,  162];   // #461AA2
      const VIOLET_D = [35,  10,  90];    // darker
      const LIME     = [197, 250,  25];   // #C5FA19
      const CYAN     = [0,   212, 212];   // #00D4D4
      const PINK     = [255,  20, 147];   // #FF1493
      const WHITE    = [255, 255, 255];
      const INK      = [20,   8,  50];
      const MUTED    = [140, 120, 180];
      const SURFACE  = [245, 242, 255];
      const BORDER   = [210, 195, 245];

      // ─── Page background ──────────────────────────────────────────────────
      const bgStops = [
        [20,  6,  65], [28,  8,  80], [38, 12,  96],
        [50, 18, 120], [60, 22, 140], [70, 26, 162],
      ];
      bgStops.forEach(([r, g, b], i) => {
        pdf.setFillColor(r, g, b);
        pdf.rect(0, i * (H / bgStops.length), W, H / bgStops.length + 2, "F");
      });

      // Subtle glow orbs on bg
      [[60, 80, 50, ...CYAN, 0.07], [W-70, 55, 45, ...LIME, 0.05],
       [W-35, H*0.4, 38, ...PINK, 0.06], [50, H*0.72, 42, ...CYAN, 0.05]]
        .forEach(([gx, gy, gr, r, g, b, op]) => {
          pdf.setGState(new pdf.GState({ opacity: op }));
          pdf.setFillColor(r, g, b);
          pdf.circle(gx, gy, gr, "F");
        });
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // ─── Card ─────────────────────────────────────────────────────────────
      const cX = 28, cY = 28, cW = W - 56, cH = H - 56;

      // Cyan glow shadow
      pdf.setGState(new pdf.GState({ opacity: 0.4 }));
      pdf.setFillColor(...CYAN);
      pdf.roundedRect(cX + 3, cY + 6, cW, cH, 24, 24, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      pdf.setFillColor(...WHITE);
      pdf.roundedRect(cX, cY, cW, cH, 24, 24, "F");
      pdf.setDrawColor(...CYAN);
      pdf.setLineWidth(2);
      pdf.roundedRect(cX, cY, cW, cH, 24, 24, "S");

      // ─── Hero ─────────────────────────────────────────────────────────────
      const heroH = 200;

      // Base
      pdf.setFillColor(...VIOLET_D);
      pdf.roundedRect(cX, cY, cW, heroH + 24, 24, 24, "F");
      pdf.rect(cX, cY + heroH, cW, 24, "F"); // flatten bottom

      // Mid violet overlay
      pdf.setGState(new pdf.GState({ opacity: 0.5 }));
      pdf.setFillColor(...VIOLET);
      pdf.rect(cX, cY, cW, heroH * 0.55, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Diagonal decorative slices
      pdf.setGState(new pdf.GState({ opacity: 0.10 }));
      pdf.setFillColor(...LIME);
      pdf.lines([[170,0],[-95,heroH+24],[-170,0],[95,-(heroH+24)]], cX+cW*0.44, cY, [1,1], "F", true);
      pdf.setGState(new pdf.GState({ opacity: 0.08 }));
      pdf.setFillColor(...CYAN);
      pdf.lines([[100,0],[-58,heroH+24],[-100,0],[58,-(heroH+24)]], cX+cW*0.67, cY, [1,1], "F", true);
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Floating orbs
      [[cX+cW-55, cY+38, 20, ...PINK, 0.14],
       [cX+cW-88, cY+62, 13, ...CYAN, 0.12],
       [cX+cW-40, cY+70, 9,  ...LIME, 0.16]]
        .forEach(([ox,oy,or_,r,g,b,op]) => {
          pdf.setGState(new pdf.GState({ opacity: op }));
          pdf.setFillColor(r,g,b); pdf.circle(ox,oy,or_,"F");
        });
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Wave 1 — CYAN
      pdf.setGState(new pdf.GState({ opacity: 0.60 }));
      pdf.setFillColor(...CYAN);
      const wY = cY + heroH - 38;
      const wPts = [];
      for (let i = 0; i <= 32; i++)
        wPts.push([cX+(i/32)*cW, wY + Math.sin((i/32)*Math.PI*4+0.6)*12]);
      wPts.push([cX+cW, wY+50], [cX, wY+50]);
      pdf.lines(wPts.slice(1).map((p,i)=>[p[0]-wPts[i][0],p[1]-wPts[i][1]]), wPts[0][0], wPts[0][1],[1,1],"F",true);
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Wave 2 — LIME
      pdf.setGState(new pdf.GState({ opacity: 0.22 }));
      pdf.setFillColor(...LIME);
      const w2Y = cY + heroH - 20;
      const w2Pts = [];
      for (let i = 0; i <= 32; i++)
        w2Pts.push([cX+(i/32)*cW, w2Y + Math.sin((i/32)*Math.PI*5+2.0)*7]);
      w2Pts.push([cX+cW, w2Y+30], [cX, w2Y+30]);
      pdf.lines(w2Pts.slice(1).map((p,i)=>[p[0]-w2Pts[i][0],p[1]-w2Pts[i][1]]), w2Pts[0][0], w2Pts[0][1],[1,1],"F",true);
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Lime left accent bar
      pdf.setFillColor(...LIME);
      pdf.roundedRect(cX+20, cY+22, 4, heroH-18, 2, 2, "F");

      // ── Logo ──
      if (logoDataUrl) {
        pdf.addImage(logoDataUrl, "PNG", cX+32, cY+14, 130, 48);
      } else {
        pdf.setFont("helvetica","bold"); pdf.setFontSize(16);
        pdf.setTextColor(...LIME);
        pdf.text("THE WAVES", cX+32, cY+46);
      }

      // Park subtitle
      pdf.setFont("helvetica","bold"); pdf.setFontSize(7.5);
      pdf.setTextColor(...CYAN); pdf.setCharSpace(2.2);
      pdf.text("WATERPARK & AMUSEMENT PARK", cX+32, cY+76);
      pdf.setCharSpace(0);

      // Ticket name — split long text to max 2 lines
      pdf.setFont("helvetica","bold"); pdf.setFontSize(22);
      pdf.setTextColor(...WHITE);
      const eventLines = pdf.splitTextToSize(ticket.note || "Day Pass", cW - 200);
      pdf.text(eventLines.slice(0,2), cX+32, cY+108);

      // Sub-label
      pdf.setFont("helvetica","normal"); pdf.setFontSize(9);
      pdf.setTextColor(190, 170, 240);
      pdf.text("Present this ticket at the entrance for verification", cX+32, cY+152);

      // ── Amount badge — positioned to NOT overlap status pill ──
      const badgeX = cX+cW-148, badgeY = cY+14;
      pdf.setGState(new pdf.GState({ opacity: 0.20 }));
      pdf.setFillColor(...WHITE);
      pdf.roundedRect(badgeX, badgeY, 126, 62, 14, 14, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));
      // lime top line
      pdf.setFillColor(...LIME);
      pdf.roundedRect(badgeX, badgeY, 126, 4, 2, 2, "F");
      pdf.setFont("helvetica","bold"); pdf.setFontSize(7.5);
      pdf.setTextColor(...LIME); pdf.setCharSpace(1.5);
      pdf.text("AMOUNT PAID", badgeX+14, badgeY+20);
      pdf.setCharSpace(0);
      pdf.setFontSize(22); pdf.setTextColor(...WHITE);
      pdf.text(`${ticket.currency||"INR"} ${ticket.amount||0}`, badgeX+14, badgeY+48);

      // ── Status pill — below badge, fully within hero ──
      const pillX = cX+cW-148, pillY = cY+92;
      pdf.setFillColor(...(isRedeemed ? PINK : LIME));
      pdf.roundedRect(pillX, pillY, 126, 30, 15, 15, "F");
      pdf.setFont("helvetica","bold"); pdf.setFontSize(9.5);
      pdf.setTextColor(...(isRedeemed ? WHITE : VIOLET_D));
      const statusText = isRedeemed ? "● REDEEMED" : "✓  VALID FOR ENTRY";
      const stW = pdf.getTextWidth(statusText);
      pdf.text(statusText, pillX + (126-stW)/2, pillY+19);

      // ─── Perforated tear line ──────────────────────────────────────────────
      const perfY = cY + heroH + 24;

      pdf.setFillColor(38, 12, 96); // match bg
      pdf.circle(cX-1,  perfY, 18, "F");
      pdf.circle(cX+cW+1, perfY, 18, "F");

      pdf.setDrawColor(...CYAN); pdf.setLineWidth(1.2);
      pdf.setLineDash([6,5], 0);
      pdf.line(cX+20, perfY, cX+cW-20, perfY);
      pdf.setLineDash([],0);

      pdf.setFont("helvetica","bold"); pdf.setFontSize(7.5);
      pdf.setTextColor(...MUTED); pdf.setCharSpace(2.5);
      const admitText = "✂  ADMIT ONE";
      const admitW = pdf.getTextWidth(admitText);
      pdf.text(admitText, cX+(cW-admitW)/2-4, perfY+4.5);
      pdf.setCharSpace(0);

      // ─── Body ─────────────────────────────────────────────────────────────
      const bodyTop   = perfY + 28;
      const qrPanelW  = 140;
      const qrPanelX  = cX + cW - qrPanelW - 20;
      const col1X     = cX + 28;
      const bodyRight = qrPanelX - 20;
      const col1W     = (bodyRight - col1X) * 0.54;
      const col2X     = col1X + col1W + 18;
      const col2W     = bodyRight - col2X;

      function infoRow(label, value, x, y, w, opts = {}) {
        const { size = 12, bold = false, color = INK } = opts;
        pdf.setFont("helvetica","normal"); pdf.setFontSize(7.5);
        pdf.setTextColor(...MUTED); pdf.setCharSpace(1.2);
        pdf.text(label.toUpperCase(), x, y);
        pdf.setCharSpace(0);
        pdf.setFont("helvetica", bold ? "bold" : "normal");
        pdf.setFontSize(size); pdf.setTextColor(...color);
        const lines = pdf.splitTextToSize(String(value||"—"), w);
        pdf.text(lines, x, y+13);
        return y + 13 + lines.length*(size+2);
      }

      // Left column
      let ly = bodyTop;
      ly = infoRow("Guest Name", ticket.customerName, col1X, ly, col1W, { size:17, bold:true, color:VIOLET });
      ly += 18;
      ly = infoRow("Mobile", ticket.customerPhone, col1X, ly, col1W, { size:12 });
      ly += 14;
      ly = infoRow("Email", ticket.customerEmail, col1X, ly, col1W, { size:10 });

      // Right column
      let ry = bodyTop;
      ry = infoRow("Payment Time", paidAt, col2X, ry, col2W, { size:10 });
      ry += 14;
      ry = infoRow("Order Reference", ticket.orderId, col2X, ry, col2W, { size:10 });
      ry += 14;
      ry = infoRow("Ticket ID", ticket.ticketId, col2X, ry, col2W, { size:10, bold:true, color:[0,160,160] });

      // ─── QR panel ─────────────────────────────────────────────────────────
      const maxColY  = Math.max(ly, ry);
      const qrPanelH = maxColY - bodyTop + 28;

      pdf.setFillColor(...SURFACE);
      pdf.roundedRect(qrPanelX, bodyTop-10, qrPanelW, qrPanelH+10, 16, 16, "F");
      pdf.setDrawColor(...BORDER); pdf.setLineWidth(0.8);
      pdf.roundedRect(qrPanelX, bodyTop-10, qrPanelW, qrPanelH+10, 16, 16, "S");

      // Cyan accent bar on top
      pdf.setFillColor(...CYAN);
      pdf.roundedRect(qrPanelX, bodyTop-10, qrPanelW, 5, 3, 3, "F");

      const qrSize = qrPanelW - 24;
      const qrX    = qrPanelX + 12;
      const qrY    = bodyTop + 6;

      pdf.setFillColor(...WHITE);
      pdf.roundedRect(qrX, qrY, qrSize, qrSize, 10, 10, "F");
      pdf.setDrawColor(...BORDER); pdf.setLineWidth(0.6);
      pdf.roundedRect(qrX, qrY, qrSize, qrSize, 10, 10, "S");

      if (qrDataUrl) {
        pdf.addImage(qrDataUrl, "PNG", qrX+5, qrY+5, qrSize-10, qrSize-10);
      } else {
        pdf.setFillColor(...BORDER);
        pdf.roundedRect(qrX+8, qrY+8, qrSize-16, qrSize-16, 6, 6, "F");
        pdf.setFont("helvetica","normal"); pdf.setFontSize(7);
        pdf.setTextColor(...MUTED);
        pdf.text("QR CODE", qrX+qrSize/2-14, qrY+qrSize/2+3);
      }

      const qrLabelY = qrY + qrSize + 14;
      pdf.setFont("helvetica","bold"); pdf.setFontSize(8.5);
      pdf.setTextColor(...VIOLET);
      pdf.text("Scan to verify", qrX, qrLabelY);
      pdf.setFont("helvetica","normal"); pdf.setFontSize(7);
      pdf.setTextColor(...MUTED);
      pdf.text(pdf.splitTextToSize("Opens live ticket verification", qrSize+10), qrX, qrLabelY+12);

      // ─── Divider ──────────────────────────────────────────────────────────
      const dividerY = maxColY + 36;

      // Mini wave
      pdf.setGState(new pdf.GState({ opacity: 0.08 }));
      pdf.setFillColor(...CYAN);
      const swPts = [];
      for (let i = 0; i <= 30; i++)
        swPts.push([cX+(i/30)*cW, dividerY + Math.sin((i/30)*Math.PI*5)*5]);
      swPts.push([cX+cW, dividerY+24], [cX, dividerY+24]);
      pdf.lines(swPts.slice(1).map((p,i)=>[p[0]-swPts[i][0],p[1]-swPts[i][1]]), swPts[0][0], swPts[0][1],[1,1],"F",true);
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      pdf.setDrawColor(...BORDER); pdf.setLineWidth(0.8);
      pdf.line(cX+24, dividerY+4, cX+cW-24, dividerY+4);

      // ─── Footer ───────────────────────────────────────────────────────────
      const ftY = dividerY + 24;
      pdf.setFont("helvetica","bold"); pdf.setFontSize(8.5);
      pdf.setTextColor(...VIOLET); pdf.setCharSpace(1);
      pdf.text("VERIFICATION INSTRUCTIONS", cX+24, ftY);
      pdf.setCharSpace(0);

      pdf.setFont("helvetica","normal"); pdf.setFontSize(8.5);
      pdf.setTextColor(...MUTED);
      const footerLines = pdf.splitTextToSize(
        "Present this ticket at the entrance gate. Staff will scan the QR code to confirm your ticket is valid. Entry is for one person only — do not share or duplicate this ticket.",
        cW - 52
      );
      pdf.text(footerLines, cX+24, ftY+15);

      // ─── Bottom brand strip ────────────────────────────────────────────────
      const stripY = cY + cH - 36;

      pdf.setFillColor(...VIOLET_D);
      pdf.rect(cX, stripY, cW, 36, "F");
      // round just the bottom corners
      pdf.roundedRect(cX, stripY, cW, 36, 24, 24, "F");
      pdf.rect(cX, stripY, cW, 18, "F"); // flatten top of rounded rect

      // Three colour dots
      pdf.setFillColor(...LIME);   pdf.circle(cX+24,      stripY+18, 4, "F");
      pdf.setFillColor(...CYAN);   pdf.circle(cX+cW-24,   stripY+18, 4, "F");
      pdf.setFillColor(...PINK);   pdf.circle(cX+cW/2,    stripY+18, 3, "F");

      pdf.setFont("helvetica","bold"); pdf.setFontSize(8.5);
      pdf.setTextColor(...CYAN);
      const brandLine = "The Waves Waterpark & Amusement Park";
      const brandW = pdf.getTextWidth(brandLine);
      pdf.text(brandLine, cX+(cW-brandW)/2, stripY+22);

      // ─── Top corner accents ────────────────────────────────────────────────
      pdf.setFillColor(...LIME); pdf.circle(cX+22, cY+22, 7, "F");
      pdf.setFillColor(...PINK); pdf.circle(cX+cW-22, cY+22, 7, "F");

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