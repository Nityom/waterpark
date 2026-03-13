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

      // ─── Palette ──────────────────────────────────────────────────────────
      const VIOLET   = [70,  26, 162];
      const VIOLET_D = [32,  10,  85];
      const LIME     = [197, 250,  25];
      const CYAN     = [0,  212, 212];
      const PINK     = [255,  20, 147];
      const WHITE    = [255, 255, 255];
      const INK      = [20,   8,  50];
      const MUTED    = [140, 120, 180];
      const SURFACE  = [245, 242, 255];
      const BORDER   = [210, 195, 245];

      // ─── Create a temporary PDF just to measure text heights ─────────────
      const pdfMeasure = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

      const paidAt = ticket.paymentTime
        ? new Date(ticket.paymentTime).toLocaleString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit",
          })
        : "—";
      const isRedeemed = ticket.status === "redeemed";

      // Layout constants
      const pageMargin = 32;
      const heroH      = 210;   // hero block height
      const tearH      = 30;    // tear line zone
      const bodyPadTop = 28;    // space after tear before first field
      const colGap     = 16;
      const qrPanelW   = 140;
      const qrSize     = qrPanelW - 22;
      const stripH     = 36;    // brand strip height

      // Horizontal layout (will be same for both passes)
      const cX = pageMargin;
      const cW = 595.28 - pageMargin * 2;   // A4 width

      const qrPanelX = cX + cW - qrPanelW - 16;
      const col1X    = cX + 28;
      const availW   = qrPanelX - col1X - 12;
      const col1W    = availW * 0.52;
      const col2X    = col1X + col1W + colGap;
      const col2W    = availW - col1W - colGap;

      // ── Measure body content height ───────────────────────────────────────
      function measureTextH(pdf, text, width, fontSize) {
        pdf.setFontSize(fontSize);
        return pdf.splitTextToSize(String(text || "—"), width).length * (fontSize + 2);
      }

      const bodyTop = pageMargin + heroH + tearH + bodyPadTop;

      // Left col
      let lH = bodyTop;
      lH += 12 + measureTextH(pdfMeasure, ticket.customerName, col1W, 17);
      lH += 18 + 12 + measureTextH(pdfMeasure, ticket.customerPhone, col1W, 11);
      lH += 14 + 12 + measureTextH(pdfMeasure, ticket.customerEmail, col1W, 10);

      // Right col
      let rH = bodyTop;
      rH += 12 + measureTextH(pdfMeasure, paidAt, col2W, 10);
      rH += 14 + 12 + measureTextH(pdfMeasure, ticket.orderId, col2W, 10);
      rH += 14 + 12 + measureTextH(pdfMeasure, ticket.ticketId, col2W, 10);

      // QR panel height
      const qrPanelH  = 14 + qrSize + 12 + 11 + 11 + 10; // top pad + qr + gap + label + sublabel + bottom pad
      const qrBottom  = bodyTop - 8 + qrPanelH;

      const contentBottom = Math.max(lH, rH, qrBottom);

      // Footer
      pdfMeasure.setFontSize(8.5);
      const ftLines  = pdfMeasure.splitTextToSize(
        "Present this ticket at the entrance gate. Staff will scan the QR code to confirm your ticket is valid. Entry is for one person only — do not share or duplicate this ticket.",
        cW - 44
      );
      const footerH  = 20 + 14 + ftLines.length * 11; // heading + gap + lines

      // Total card height = contentBottom - cY  + divider(30) + footer + strip gap(20) + stripH + bottom pad(16)
      const cY       = pageMargin;
      const dividerY = contentBottom + 28;
      const ftY      = dividerY + 20;
      const ftBottom = ftY + 14 + ftLines.length * 11;
      const cH       = (ftBottom - cY) + 24 + stripH + 16;

      // ─── Real PDF ─────────────────────────────────────────────────────────
      const [qrDataUrl, logoDataUrl] = await Promise.all([
        qrSource ? loadImageAsDataUrl(qrSource).catch(() => null) : Promise.resolve(null),
        loadImageAsDataUrl("/logo.png").catch(() => null),
      ]);

      const pageH = cH + pageMargin * 2;
      const pdf   = new jsPDF({ orientation: "portrait", unit: "pt",
                                format: [595.28, pageH] });

      // ─── Page background ──────────────────────────────────────────────────
      const bgStops = [
        [20, 6, 60], [28, 8, 78], [38, 12, 95],
        [50, 18, 118], [62, 22, 142], [70, 26, 162],
      ];
      bgStops.forEach(([r, g, b], i) => {
        pdf.setFillColor(r, g, b);
        pdf.rect(0, i * (pageH / bgStops.length), 595.28, pageH / bgStops.length + 2, "F");
      });

      // Bg glow orbs
      [[60, 80, 48, ...CYAN, 0.07], [530, 55, 42, ...LIME, 0.05],
       [560, pageH * 0.38, 36, ...PINK, 0.06], [48, pageH * 0.72, 40, ...CYAN, 0.05]]
        .forEach(([gx, gy, gr, r, g, b, op]) => {
          pdf.setGState(new pdf.GState({ opacity: op }));
          pdf.setFillColor(r, g, b); pdf.circle(gx, gy, gr, "F");
        });
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // ─── Card shadow ──────────────────────────────────────────────────────
      pdf.setGState(new pdf.GState({ opacity: 0.36 }));
      pdf.setFillColor(...CYAN);
      pdf.roundedRect(cX + 3, cY + 6, cW, cH, 22, 22, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Card body
      pdf.setFillColor(...WHITE);
      pdf.roundedRect(cX, cY, cW, cH, 22, 22, "F");
      pdf.setDrawColor(...CYAN); pdf.setLineWidth(2);
      pdf.roundedRect(cX, cY, cW, cH, 22, 22, "S");

      // ─── Hero ─────────────────────────────────────────────────────────────
      pdf.setFillColor(...VIOLET_D);
      pdf.roundedRect(cX, cY, cW, heroH + 24, 22, 22, "F");
      pdf.rect(cX, cY + heroH - 4, cW, 28, "F");

      pdf.setGState(new pdf.GState({ opacity: 0.48 }));
      pdf.setFillColor(...VIOLET);
      pdf.rect(cX, cY, cW, heroH * 0.55, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      // Diagonal slices
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

      // Waves
      function drawWave(baseY, color, opacity, amp, freq, phase, bandH) {
        pdf.setGState(new pdf.GState({ opacity }));
        pdf.setFillColor(...color);
        const pts = [];
        for (let i = 0; i <= 40; i++)
          pts.push([cX+(i/40)*cW, baseY + Math.sin((i/40)*Math.PI*freq+phase)*amp]);
        pts.push([cX+cW, baseY+bandH], [cX, baseY+bandH]);
        pdf.lines(pts.slice(1).map((p,i)=>[p[0]-pts[i][0],p[1]-pts[i][1]]),
                  pts[0][0], pts[0][1], [1,1], "F", true);
        pdf.setGState(new pdf.GState({ opacity: 1 }));
      }
      drawWave(cY+heroH-42, CYAN, 0.58, 12, 4, 0.6, 55);
      drawWave(cY+heroH-22, LIME, 0.20, 7,  5, 2.0, 32);

      // Lime left bar
      pdf.setFillColor(...LIME);
      pdf.roundedRect(cX+18, cY+20, 4, heroH-16, 2, 2, "F");

      // Logo
      if (logoDataUrl) {
        pdf.addImage(logoDataUrl, "PNG", cX+30, cY+13, 128, 46);
      } else {
        pdf.setFont("helvetica","bold"); pdf.setFontSize(15);
        pdf.setTextColor(...LIME);
        pdf.text("THE WAVES", cX+30, cY+44);
      }

      // Park subtitle
      pdf.setFont("helvetica","bold"); pdf.setFontSize(7.5);
      pdf.setTextColor(...CYAN); pdf.setCharSpace(2.2);
      pdf.text("WATERPARK & AMUSEMENT PARK", cX+30, cY+74);
      pdf.setCharSpace(0);

      // Ticket name
      pdf.setFont("helvetica","bold"); pdf.setFontSize(22);
      pdf.setTextColor(...WHITE);
      const eventLines = pdf.splitTextToSize(ticket.note || "Day Pass", cW-185).slice(0,2);
      pdf.text(eventLines, cX+30, cY+110);
      const titleBottom = cY + 110 + eventLines.length * 25;

      // Sub-label
      pdf.setFont("helvetica","normal"); pdf.setFontSize(8.5);
      pdf.setTextColor(185, 165, 238);
      pdf.text("Present this ticket at the entrance for verification", cX+30, titleBottom+14);

      // Amount badge
      const badgeW = 130, badgeH = 60;
      const badgeX = cX + cW - badgeW - 14;
      const badgeY = cY + 14;
      pdf.setGState(new pdf.GState({ opacity: 0.20 }));
      pdf.setFillColor(...WHITE);
      pdf.roundedRect(badgeX, badgeY, badgeW, badgeH, 12, 12, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));
      pdf.setFillColor(...LIME);
      pdf.roundedRect(badgeX, badgeY, badgeW, 4, 2, 2, "F");
      pdf.setFont("helvetica","bold"); pdf.setFontSize(7.5);
      pdf.setTextColor(...LIME); pdf.setCharSpace(1.5);
      pdf.text("AMOUNT PAID", badgeX+12, badgeY+19);
      pdf.setCharSpace(0);
      pdf.setFontSize(22); pdf.setTextColor(...WHITE);
      pdf.text(`${ticket.currency||"INR"} ${ticket.amount||0}`, badgeX+12, badgeY+46);

      // Status pill — same width as badge, right below it
      const pillW = badgeW, pillH = 28;
      const pillX = badgeX, pillY = badgeY + badgeH + 10;
      pdf.setFillColor(...(isRedeemed ? PINK : LIME));
      pdf.roundedRect(pillX, pillY, pillW, pillH, 14, 14, "F");
      pdf.setFont("helvetica","bold"); pdf.setFontSize(9);
      pdf.setTextColor(...(isRedeemed ? WHITE : VIOLET_D));
      const statusLabel = isRedeemed ? "● REDEEMED" : "✓ VALID FOR ENTRY";
      const labelW = pdf.getTextWidth(statusLabel);
      pdf.text(statusLabel, pillX + (pillW-labelW)/2, pillY+18);

      // ─── Tear line ────────────────────────────────────────────────────────
      const tearY = cY + heroH + 15;
      pdf.setFillColor(38, 12, 95);
      pdf.circle(cX-1, tearY, 17, "F");
      pdf.circle(cX+cW+1, tearY, 17, "F");
      pdf.setDrawColor(...CYAN); pdf.setLineWidth(1.2);
      pdf.setLineDash([6,5], 0);
      pdf.line(cX+18, tearY, cX+cW-18, tearY);
      pdf.setLineDash([],0);
      pdf.setFont("helvetica","bold"); pdf.setFontSize(7.5);
      pdf.setTextColor(...MUTED); pdf.setCharSpace(2.5);
      const admitText = "✂  ADMIT ONE";
      pdf.text(admitText, cX+(cW-pdf.getTextWidth(admitText))/2, tearY+4);
      pdf.setCharSpace(0);

      // ─── Body: helper ─────────────────────────────────────────────────────
      function infoRow(label, value, x, y, w, opts = {}) {
        const { size=11, bold=false, color=INK } = opts;
        pdf.setFont("helvetica","normal"); pdf.setFontSize(7);
        pdf.setTextColor(...MUTED); pdf.setCharSpace(1.2);
        pdf.text(label.toUpperCase(), x, y);
        pdf.setCharSpace(0);
        pdf.setFont("helvetica", bold?"bold":"normal");
        pdf.setFontSize(size); pdf.setTextColor(...color);
        const lines = pdf.splitTextToSize(String(value||"—"), w);
        pdf.text(lines, x, y+12);
        return y + 12 + lines.length*(size+2);
      }

      // QR Panel
      const qrPanelY = bodyTop - 8;
      const qrX = qrPanelX + 11;
      const qrY = qrPanelY + 14;
      const actualQrPanelH = 14 + qrSize + 12 + 11 + 11 + 10;

      pdf.setFillColor(...SURFACE);
      pdf.roundedRect(qrPanelX, qrPanelY, qrPanelW, actualQrPanelH, 14, 14, "F");
      pdf.setDrawColor(...BORDER); pdf.setLineWidth(0.8);
      pdf.roundedRect(qrPanelX, qrPanelY, qrPanelW, actualQrPanelH, 14, 14, "S");
      pdf.setFillColor(...CYAN);
      pdf.roundedRect(qrPanelX, qrPanelY, qrPanelW, 5, 3, 3, "F");

      pdf.setFillColor(...WHITE);
      pdf.roundedRect(qrX, qrY, qrSize, qrSize, 8, 8, "F");
      pdf.setDrawColor(...BORDER); pdf.setLineWidth(0.5);
      pdf.roundedRect(qrX, qrY, qrSize, qrSize, 8, 8, "S");

      if (qrDataUrl) {
        pdf.addImage(qrDataUrl, "PNG", qrX+4, qrY+4, qrSize-8, qrSize-8);
      } else {
        pdf.setFillColor(...BORDER);
        pdf.roundedRect(qrX+8, qrY+8, qrSize-16, qrSize-16, 6, 6, "F");
        pdf.setFont("helvetica","normal"); pdf.setFontSize(7);
        pdf.setTextColor(...MUTED);
        pdf.text("QR CODE", qrX+qrSize/2-14, qrY+qrSize/2+3);
      }

      const qrLabelY = qrY+qrSize+12;
      pdf.setFont("helvetica","bold"); pdf.setFontSize(8);
      pdf.setTextColor(...VIOLET);
      pdf.text("Scan to verify", qrX, qrLabelY);
      pdf.setFont("helvetica","normal"); pdf.setFontSize(7);
      pdf.setTextColor(...MUTED);
      pdf.text("Opens live ticket verification", qrX, qrLabelY+11);

      // Left column
      let ly = bodyTop;
      ly = infoRow("Guest Name", ticket.customerName, col1X, ly, col1W, { size:17, bold:true, color:VIOLET });
      ly += 18;
      ly = infoRow("Mobile", ticket.customerPhone, col1X, ly, col1W, { size:11 });
      ly += 14;
      ly = infoRow("Email", ticket.customerEmail, col1X, ly, col1W, { size:10 });

      // Right column
      let ry = bodyTop;
      ry = infoRow("Payment Time", paidAt, col2X, ry, col2W, { size:10 });
      ry += 14;
      ry = infoRow("Order Reference", ticket.orderId, col2X, ry, col2W, { size:10 });
      ry += 14;
      ry = infoRow("Ticket ID", ticket.ticketId, col2X, ry, col2W,
                   { size:10, bold:true, color:[0,158,158] });

      // ─── Divider ──────────────────────────────────────────────────────────
      const realContentBottom = Math.max(ly, ry, qrPanelY + actualQrPanelH);
      const realDivY = realContentBottom + 28;

      pdf.setGState(new pdf.GState({ opacity: 0.07 }));
      pdf.setFillColor(...CYAN);
      const swPts = [];
      for (let i=0; i<=30; i++)
        swPts.push([cX+(i/30)*cW, realDivY + Math.sin((i/30)*Math.PI*5)*4]);
      swPts.push([cX+cW, realDivY+20],[cX, realDivY+20]);
      pdf.lines(swPts.slice(1).map((p,i)=>[p[0]-swPts[i][0],p[1]-swPts[i][1]]),
                swPts[0][0], swPts[0][1],[1,1],"F",true);
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      pdf.setDrawColor(...BORDER); pdf.setLineWidth(0.8);
      pdf.line(cX+22, realDivY, cX+cW-22, realDivY);

      // ─── Footer ───────────────────────────────────────────────────────────
      const realFtY = realDivY + 20;
      pdf.setFont("helvetica","bold"); pdf.setFontSize(8.5);
      pdf.setTextColor(...VIOLET); pdf.setCharSpace(1);
      pdf.text("VERIFICATION INSTRUCTIONS", cX+22, realFtY);
      pdf.setCharSpace(0);

      pdf.setFont("helvetica","normal"); pdf.setFontSize(8.5);
      pdf.setTextColor(...MUTED);
      const realFtLines = pdf.splitTextToSize(
        "Present this ticket at the entrance gate. Staff will scan the QR code to confirm your ticket is valid. Entry is for one person only — do not share or duplicate this ticket.",
        cW-44
      );
      pdf.text(realFtLines, cX+22, realFtY+14);
      const realFtBottom = realFtY + 14 + realFtLines.length * 11;

      // ─── Brand strip ──────────────────────────────────────────────────────
      const realStripTop = realFtBottom + 22;
      const realStripH   = 36;

      pdf.setFillColor(...VIOLET_D);
      // Draw strip with only bottom corners rounded (matching card bottom)
      pdf.roundedRect(cX, realStripTop, cW, realStripH + 22, 22, 22, "F");
      pdf.rect(cX, realStripTop, cW, 22, "F"); // flatten top

      const dotY = realStripTop + realStripH / 2;
      pdf.setFillColor(...LIME);   pdf.circle(cX+24,       dotY, 4, "F");
      pdf.setFillColor(...CYAN);   pdf.circle(cX+cW-24,    dotY, 4, "F");
      pdf.setFillColor(...PINK);   pdf.circle(cX+cW/2,     dotY, 3, "F");

      pdf.setFont("helvetica","bold"); pdf.setFontSize(8.5);
      pdf.setTextColor(...CYAN);
      const brand = "The Waves Waterpark & Amusement Park";
      pdf.text(brand, cX+(cW-pdf.getTextWidth(brand))/2, dotY+4);

      // ─── Top corner accents ────────────────────────────────────────────────
      pdf.setFillColor(...LIME); pdf.circle(cX+20, cY+20, 7, "F");
      pdf.setFillColor(...PINK); pdf.circle(cX+cW-20, cY+20, 7, "F");

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