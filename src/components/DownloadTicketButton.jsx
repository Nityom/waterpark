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

/**
 * Parses ticket note to extract type + quantity badges.
 * e.g. "Adult Ticket x1 (Regular) - Visit 2026-03-13"
 *   → [{ label: "ADULT", qty: "×1", color: CYAN }]
 * Supports Adult / Child / Senior / Student keywords.
 */
function parseTicketBadges(note, CYAN, LIME, PINK, VIOLET) {
  if (!note) return [];
  const badges = [];
  const patterns = [
    { re: /adult[^\dx]*x?\s*(\d+)/i,   label: "ADULT",   color: CYAN  },
    { re: /child[^\dx]*x?\s*(\d+)/i,   label: "CHILD",   color: LIME  },
    { re: /senior[^\dx]*x?\s*(\d+)/i,  label: "SENIOR",  color: PINK  },
    { re: /student[^\dx]*x?\s*(\d+)/i, label: "STUDENT", color: VIOLET},
    { re: /infant[^\dx]*x?\s*(\d+)/i,  label: "INFANT",  color: PINK  },
  ];
  for (const { re, label, color } of patterns) {
    const m = note.match(re);
    if (m) badges.push({ label, qty: `×${m[1]}`, color });
  }
  // fallback: if nothing matched but has "x<n>" pattern
  if (badges.length === 0) {
    const fallback = note.match(/x\s*(\d+)/i);
    if (fallback) badges.push({ label: "TICKET", qty: `×${fallback[1]}`, color: CYAN });
  }
  return badges;
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

      const paidAt = ticket.paymentTime
  ? (() => {
      const d = new Date(ticket.paymentTime);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = String(d.getFullYear()).slice(-2);
      return `${day}-${month}-${year}`;
    })()
  : "—";
      const isRedeemed = ticket.status === "redeemed";

      // Ticket type badges
      const ticketBadges = parseTicketBadges(ticket.note, CYAN, LIME, PINK, VIOLET);

      // ─── Layout constants ─────────────────────────────────────────────────
      const pageMargin = 32;
      const heroH      = 210;
      const tearZoneH  = 34;    // total height of tear line zone
      const bodyPadTop = 36;    // MORE breathing room at top of white body
      const colGap     = 16;
      const qrPanelW   = 138;
      const qrSize     = qrPanelW - 22;

      const cX = pageMargin;
      const cW = 595.28 - pageMargin * 2;

      // Badge + pill width — guarantee fits inside card
      const badgeW  = Math.min(134, cW * 0.26);
      const badgeX  = cX + cW - badgeW - 18;  // 18pt from right edge — always inside

      const qrPanelX = cX + cW - qrPanelW - 18;
      const col1X    = cX + 28;
      const availW   = qrPanelX - col1X - 12;
      const col1W    = availW * 0.52;
      const col2X    = col1X + col1W + colGap;
      const col2W    = availW - col1W - colGap;

      const bodyTop  = pageMargin + heroH + tearZoneH + bodyPadTop;

      // ── Measure pass ──────────────────────────────────────────────────────
      const pdfM = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

      function measureH(text, width, fontSize) {
        pdfM.setFontSize(fontSize);
        return pdfM.splitTextToSize(String(text || "—"), width).length * (fontSize + 2);
      }

      // Left col heights
      let lH = bodyTop;
      lH += 12 + measureH(ticket.customerName, col1W, 17); // guest name
      lH += 20 + 12 + measureH(ticket.customerPhone, col1W, 11); // mobile
      lH += 16 + 12 + measureH(ticket.customerEmail, col1W, 10); // email

      // Ticket type badge row (if any) — 28pt per row of badges
      if (ticketBadges.length > 0) lH += 20 + 26;

      // Right col heights
      let rH = bodyTop;
      rH += 12 + measureH(paidAt, col2W, 10);
      rH += 16 + 12 + measureH(ticket.orderId || "—", col2W, 10);
      rH += 16 + 12 + measureH(ticket.ticketId || "—", col2W, 10);

      // QR panel height
      const qrPanelH = 14 + qrSize + 14 + 11 + 12 + 8;
      const qrBottom = bodyTop - 10 + qrPanelH;

      const contentBottom = Math.max(lH, rH, qrBottom) + 4;

      // Footer
      pdfM.setFontSize(8.5);
      const ftText = "Present this ticket at the entrance gate. Staff will scan the QR code to confirm your ticket is valid. Entry is for one person only — do not share or duplicate this ticket.";
      const ftLines = pdfM.splitTextToSize(ftText, cW - 44);

      const cY       = pageMargin;
      const dividerY = contentBottom + 30;
      const ftY      = dividerY + 20;
      const ftBottom = ftY + 14 + ftLines.length * 11;
      const stripH   = 36;
      const cH       = (ftBottom - cY) + 22 + stripH + 14;
      const pageH    = cH + pageMargin * 2;

      // ─── Real PDF ─────────────────────────────────────────────────────────
      const [qrDataUrl, logoDataUrl] = await Promise.all([
        qrSource ? loadImageAsDataUrl(qrSource).catch(() => null) : Promise.resolve(null),
        loadImageAsDataUrl("/logo.png").catch(() => null),
      ]);

      const pdf = new jsPDF({ orientation: "portrait", unit: "pt",
                              format: [595.28, pageH] });

      // ─── Page bg ──────────────────────────────────────────────────────────
      const bgStops = [[20,6,60],[28,8,78],[38,12,95],[50,18,118],[62,22,142],[70,26,162]];
      bgStops.forEach(([r,g,b],i) => {
        pdf.setFillColor(r,g,b);
        pdf.rect(0, i*(pageH/bgStops.length), 595.28, pageH/bgStops.length+2, "F");
      });
      [[60,80,48,...CYAN,0.07],[530,55,42,...LIME,0.05],[560,pageH*0.38,36,...PINK,0.06],[48,pageH*0.72,40,...CYAN,0.05]]
        .forEach(([gx,gy,gr,r,g,b,op]) => {
          pdf.setGState(new pdf.GState({opacity:op}));
          pdf.setFillColor(r,g,b); pdf.circle(gx,gy,gr,"F");
        });
      pdf.setGState(new pdf.GState({opacity:1}));

      // ─── Card ─────────────────────────────────────────────────────────────
      pdf.setGState(new pdf.GState({opacity:0.35}));
      pdf.setFillColor(...CYAN);
      pdf.roundedRect(cX+3, cY+6, cW, cH, 22, 22, "F");
      pdf.setGState(new pdf.GState({opacity:1}));

      pdf.setFillColor(...WHITE);
      pdf.roundedRect(cX, cY, cW, cH, 22, 22, "F");
      pdf.setDrawColor(...CYAN); pdf.setLineWidth(2);
      pdf.roundedRect(cX, cY, cW, cH, 22, 22, "S");

      // ─── Hero ─────────────────────────────────────────────────────────────
      pdf.setFillColor(...VIOLET_D);
      pdf.roundedRect(cX, cY, cW, heroH+24, 22, 22, "F");
      pdf.rect(cX, cY+heroH-4, cW, 28, "F");

      pdf.setGState(new pdf.GState({opacity:0.48}));
      pdf.setFillColor(...VIOLET);
      pdf.rect(cX, cY, cW, heroH*0.55, "F");
      pdf.setGState(new pdf.GState({opacity:1}));

      pdf.setGState(new pdf.GState({opacity:0.09}));
      pdf.setFillColor(...LIME);
      pdf.lines([[170,0],[-95,heroH+24],[-170,0],[95,-(heroH+24)]], cX+cW*0.44, cY, [1,1], "F", true);
      pdf.setGState(new pdf.GState({opacity:0.07}));
      pdf.setFillColor(...CYAN);
      pdf.lines([[100,0],[-58,heroH+24],[-100,0],[58,-(heroH+24)]], cX+cW*0.67, cY, [1,1], "F", true);
      pdf.setGState(new pdf.GState({opacity:1}));

      [[cX+cW-58,cY+36,20,...PINK,0.14],[cX+cW-90,cY+60,13,...CYAN,0.12],[cX+cW-40,cY+72,9,...LIME,0.16]]
        .forEach(([ox,oy,or_,r,g,b,op]) => {
          pdf.setGState(new pdf.GState({opacity:op}));
          pdf.setFillColor(r,g,b); pdf.circle(ox,oy,or_,"F");
        });
      pdf.setGState(new pdf.GState({opacity:1}));

      // Waves
      function drawWave(baseY, color, opacity, amp, freq, phase, bandH) {
        pdf.setGState(new pdf.GState({opacity}));
        pdf.setFillColor(...color);
        const pts = [];
        for (let i=0;i<=40;i++)
          pts.push([cX+(i/40)*cW, baseY+Math.sin((i/40)*Math.PI*freq+phase)*amp]);
        pts.push([cX+cW,baseY+bandH],[cX,baseY+bandH]);
        pdf.lines(pts.slice(1).map((p,i)=>[p[0]-pts[i][0],p[1]-pts[i][1]]),
                  pts[0][0],pts[0][1],[1,1],"F",true);
        pdf.setGState(new pdf.GState({opacity:1}));
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
      const eventLines = pdf.splitTextToSize(ticket.note||"Day Pass", cW-195).slice(0,2);
      pdf.text(eventLines, cX+30, cY+110);
      const titleBottom = cY + 110 + eventLines.length * 25;

      // Sub-label
      pdf.setFont("helvetica","normal"); pdf.setFontSize(8.5);
      pdf.setTextColor(185,165,238);
      pdf.text("Present this ticket at the entrance for verification", cX+30, titleBottom+14);

      // ── Amount badge ──────────────────────────────────────────────────────
      const badgeH  = 60;
      const badgeY  = cY + 14;

      pdf.setGState(new pdf.GState({opacity:0.20}));
      pdf.setFillColor(...WHITE);
      pdf.roundedRect(badgeX, badgeY, badgeW, badgeH, 12, 12, "F");
      pdf.setGState(new pdf.GState({opacity:1}));
      pdf.setFillColor(...LIME);
      pdf.roundedRect(badgeX, badgeY, badgeW, 4, 2, 2, "F");
      pdf.setFont("helvetica","bold"); pdf.setFontSize(7);
      pdf.setTextColor(...LIME); pdf.setCharSpace(1.2);
      pdf.text("AMOUNT PAID", badgeX+10, badgeY+18);
      pdf.setCharSpace(0);
      pdf.setFontSize(21); pdf.setTextColor(...WHITE);
      pdf.text(`${ticket.currency||"INR"} ${ticket.amount||0}`, badgeX+10, badgeY+44);

      // ── Status pill — below badge, same alignment, FULLY inside card ──────
      const pillH   = 26;
      const pillY   = badgeY + badgeH + 10;
      // Reduce font until text fits in badge width
      const pillLabel = isRedeemed ? "● REDEEMED" : "VALID FOR ENTRY";
      pdf.setFont("helvetica","bold");
      let pillFontSize = 9;
      pdf.setFontSize(pillFontSize);
      while (pdf.getTextWidth(pillLabel) > badgeW - 16 && pillFontSize > 6) {
        pillFontSize -= 0.5;
        pdf.setFontSize(pillFontSize);
      }
      pdf.setFillColor(...(isRedeemed ? PINK : LIME));
      pdf.roundedRect(badgeX, pillY, badgeW, pillH, 13, 13, "F");
      pdf.setTextColor(...(isRedeemed ? WHITE : VIOLET_D));
      const labelW = pdf.getTextWidth(pillLabel);
      pdf.text(pillLabel, badgeX + (badgeW-labelW)/2, pillY+17);

      // ─── Tear line ────────────────────────────────────────────────────────
      const tearY = cY + heroH + 17;
      pdf.setFillColor(38, 12, 95);
      pdf.circle(cX-1,      tearY, 17, "F");
      pdf.circle(cX+cW+1,   tearY, 17, "F");
      pdf.setDrawColor(...CYAN); pdf.setLineWidth(1.2);
      pdf.setLineDash([6,5], 0);
      pdf.line(cX+18, tearY, cX+cW-18, tearY);
      pdf.setLineDash([],0);
      pdf.setFont("helvetica","bold"); pdf.setFontSize(7.5);
      pdf.setTextColor(...MUTED); pdf.setCharSpace(2.5);
      const admitText = "✂  ADMIT ONE";
      pdf.text(admitText, cX+(cW-pdf.getTextWidth(admitText))/2, tearY+4);
      pdf.setCharSpace(0);

      // ─── Info row helper ──────────────────────────────────────────────────
      function infoRow(label, value, x, y, w, opts={}) {
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

      // ─── QR Panel ─────────────────────────────────────────────────────────
      const qrPanelY  = bodyTop - 10;
      const qrX       = qrPanelX + 11;
      const qrY       = qrPanelY + 14;
      const realQrPanelH = 14 + qrSize + 14 + 11 + 12 + 8;

      pdf.setFillColor(...SURFACE);
      pdf.roundedRect(qrPanelX, qrPanelY, qrPanelW, realQrPanelH, 14, 14, "F");
      pdf.setDrawColor(...BORDER); pdf.setLineWidth(0.8);
      pdf.roundedRect(qrPanelX, qrPanelY, qrPanelW, realQrPanelH, 14, 14, "S");
      // Cyan top bar
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
      const qrLY = qrY+qrSize+13;
      pdf.setFont("helvetica","bold"); pdf.setFontSize(8);
      pdf.setTextColor(...VIOLET);
      pdf.text("Scan to verify", qrX, qrLY);
      pdf.setFont("helvetica","normal"); pdf.setFontSize(7);
      pdf.setTextColor(...MUTED);
      pdf.text("Opens live ticket verification", qrX, qrLY+11);

      // ─── Left column ──────────────────────────────────────────────────────
      let ly = bodyTop;
      ly = infoRow("Guest Name", ticket.customerName, col1X, ly, col1W,
                   { size:12, bold:true, color:VIOLET });
      ly += 20;
      ly = infoRow("Mobile", ticket.customerPhone, col1X, ly, col1W, { size:11 });
      ly += 16;
      ly = infoRow("Email", ticket.customerEmail, col1X, ly, col1W, { size:10 });

      // Ticket type badges (below email in left col)
      if (ticketBadges.length > 0) {
        ly += 20;
        let bx = col1X;
        for (const badge of ticketBadges) {
          const bLabel   = `${badge.label}  ${badge.qty}`;
          pdf.setFont("helvetica","bold"); pdf.setFontSize(8);
          const bW = pdf.getTextWidth(bLabel) + 20;
          pdf.setFillColor(...badge.color);
          pdf.setGState(new pdf.GState({opacity: 0.15}));
          pdf.roundedRect(bx, ly, bW, 22, 11, 11, "F");
          pdf.setGState(new pdf.GState({opacity:1}));
          pdf.setDrawColor(...badge.color); pdf.setLineWidth(1);
          pdf.roundedRect(bx, ly, bW, 22, 11, 11, "S");
          pdf.setTextColor(...badge.color);
          pdf.text(bLabel, bx+10, ly+14.5);
          bx += bW + 8;
        }
        ly += 22;
      }

      // ─── Right column ─────────────────────────────────────────────────────
      let ry = bodyTop;
      ry = infoRow("Payment Time", paidAt, col2X, ry, col2W, { size:10 });
      ry += 16;
      ry = infoRow("Order Reference", ticket.orderId, col2X, ry, col2W, { size:10 });
      ry += 16;
      ry = infoRow("Ticket ID", ticket.ticketId, col2X, ry, col2W,
                   { size:10, bold:true, color:[0,158,158] });

      // ─── Divider ──────────────────────────────────────────────────────────
      const realContentBottom = Math.max(ly, ry, qrPanelY+realQrPanelH) + 4;
      const realDivY = realContentBottom + 30;

      pdf.setGState(new pdf.GState({opacity:0.07}));
      pdf.setFillColor(...CYAN);
      const swPts = [];
      for (let i=0;i<=30;i++)
        swPts.push([cX+(i/30)*cW, realDivY+Math.sin((i/30)*Math.PI*5)*4]);
      swPts.push([cX+cW,realDivY+20],[cX,realDivY+20]);
      pdf.lines(swPts.slice(1).map((p,i)=>[p[0]-swPts[i][0],p[1]-swPts[i][1]]),
                swPts[0][0],swPts[0][1],[1,1],"F",true);
      pdf.setGState(new pdf.GState({opacity:1}));

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
      const realFtLines = pdf.splitTextToSize(ftText, cW-44);
      pdf.text(realFtLines, cX+22, realFtY+14);
      const realFtBottom = realFtY + 14 + realFtLines.length*11;

      // ─── Brand strip ──────────────────────────────────────────────────────
      const stripTop = realFtBottom + 22;
      const stripTotalH = cY + cH - stripTop;
      pdf.setFillColor(...VIOLET_D);
      pdf.roundedRect(cX, stripTop, cW, stripTotalH, 22, 22, "F");
      pdf.rect(cX, stripTop, cW, 18, "F");

      const dotY = stripTop + stripTotalH/2;
      pdf.setFillColor(...LIME); pdf.circle(cX+24, dotY, 4, "F");
      pdf.setFillColor(...CYAN); pdf.circle(cX+cW-24, dotY, 4, "F");
      pdf.setFillColor(...PINK); pdf.circle(cX+cW/2, dotY, 3, "F");

      pdf.setFont("helvetica","bold"); pdf.setFontSize(8.5);
      pdf.setTextColor(...CYAN);
      const brand = "The Waves Waterpark & Amusement Park";
      pdf.text(brand, cX+(cW-pdf.getTextWidth(brand))/2, dotY+4);

      // ─── Corner accents ───────────────────────────────────────────────────
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