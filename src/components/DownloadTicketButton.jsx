"use client";

import { useState } from "react";
import jsPDF from "jspdf";

async function loadImageAsDataUrl(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
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

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const W = pdf.internal.pageSize.getWidth();
      const H = pdf.internal.pageSize.getHeight();

      /* ---------------------------------- */
      /* LOAD ASSETS */
      /* ---------------------------------- */

      const [qrDataUrl, logoDataUrl] = await Promise.all([
        qrSource ? loadImageAsDataUrl(qrSource) : null,
        loadImageAsDataUrl("/logo.png"),
      ]);

      const paidAt = ticket.paymentTime
        ? new Date(ticket.paymentTime).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "—";

      const isRedeemed = ticket.status === "redeemed";

      /* ---------------------------------- */
      /* COLORS */
      /* ---------------------------------- */

      const VIOLET = [70, 26, 162];
      const VIOLET_D = [35, 10, 90];
      const LIME = [197, 250, 25];
      const CYAN = [0, 212, 212];
      const PINK = [255, 20, 147];

      const WHITE = [255, 255, 255];
      const INK = [20, 8, 50];
      const MUTED = [140, 120, 180];
      const SURFACE = [245, 242, 255];
      const BORDER = [210, 195, 245];

      /* ---------------------------------- */
      /* PAGE BACKGROUND */
      /* ---------------------------------- */

      const bgStops = [
        [20, 6, 65],
        [28, 8, 80],
        [38, 12, 96],
        [50, 18, 120],
        [60, 22, 140],
        [70, 26, 162],
      ];

      bgStops.forEach(([r, g, b], i) => {
        pdf.setFillColor(r, g, b);
        pdf.rect(0, (H / bgStops.length) * i, W, H / bgStops.length + 2, "F");
      });

      /* ---------------------------------- */
      /* CARD */
      /* ---------------------------------- */

      const cX = 28;
      const cY = 28;
      const cW = W - 56;
      const cH = H - 56;

      pdf.setFillColor(...WHITE);
      pdf.roundedRect(cX, cY, cW, cH, 24, 24, "F");

      pdf.setDrawColor(...CYAN);
      pdf.setLineWidth(2);
      pdf.roundedRect(cX, cY, cW, cH, 24, 24, "S");

      /* ---------------------------------- */
      /* HERO SECTION */
      /* ---------------------------------- */

      const heroH = 200;

      pdf.setFillColor(...VIOLET_D);
      pdf.roundedRect(cX, cY, cW, heroH + 24, 24, 24, "F");

      pdf.setFillColor(...VIOLET);
      pdf.rect(cX, cY, cW, heroH * 0.5, "F");

      /* LOGO */

      if (logoDataUrl) {
        pdf.addImage(logoDataUrl, "PNG", cX + 32, cY + 14, 130, 48);
      }

      /* TITLE */

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.setTextColor(...WHITE);

      const eventLines = pdf.splitTextToSize(
        ticket.note || "Day Pass",
        cW - 200
      );

      pdf.text(eventLines.slice(0, 2), cX + 32, cY + 108);

      /* AMOUNT BADGE */

      const badgeX = cX + cW - 148;
      const badgeY = cY + 14;

      pdf.setFillColor(...WHITE);
      pdf.roundedRect(badgeX, badgeY, 126, 62, 14, 14, "F");

      pdf.setFillColor(...LIME);
      pdf.rect(badgeX, badgeY, 126, 4, "F");

      pdf.setFontSize(8);
      pdf.setTextColor(...VIOLET);
      pdf.text("AMOUNT PAID", badgeX + 14, badgeY + 20);

      pdf.setFontSize(22);
      pdf.setTextColor(...INK);
      pdf.text(
        `${ticket.currency || "INR"} ${ticket.amount || 0}`,
        badgeX + 14,
        badgeY + 48
      );

      /* STATUS */

      const pillX = badgeX;
      const pillY = cY + 92;

      pdf.setFillColor(...(isRedeemed ? PINK : LIME));
      pdf.roundedRect(pillX, pillY, 126, 30, 15, 15, "F");

      pdf.setFontSize(10);
      pdf.setTextColor(...(isRedeemed ? WHITE : VIOLET_D));

      const statusText = isRedeemed
        ? "● REDEEMED"
        : "✓ VALID FOR ENTRY";

      const stW = pdf.getTextWidth(statusText);

      pdf.text(statusText, pillX + (126 - stW) / 2, pillY + 19);

      /* ---------------------------------- */
      /* PERFORATED LINE */
      /* ---------------------------------- */

      const perfY = cY + heroH + 24;

      pdf.setLineDash([6, 5]);
      pdf.setDrawColor(...CYAN);
      pdf.line(cX + 20, perfY, cX + cW - 20, perfY);
      pdf.setLineDash([]);

      /* ---------------------------------- */
      /* BODY GRID */
      /* ---------------------------------- */

      const bodyTop = perfY + 30;

      const qrPanelW = 140;
      const qrPanelX = cX + cW - qrPanelW - 20;

      const col1X = cX + 28;
      const bodyRight = qrPanelX - 20;

      const colGap = 20;

      const col1W = (bodyRight - col1X - colGap) / 2;
      const col2X = col1X + col1W + colGap;
      const col2W = col1W;

      /* ---------------------------------- */
      /* INFO ROW */
      /* ---------------------------------- */

      function infoRow(label, value, x, y, w, opts = {}) {
        const { size = 11, bold = false, color = INK } = opts;

        const rowHeight = 28;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7);
        pdf.setTextColor(...MUTED);
        pdf.text(label.toUpperCase(), x, y);

        pdf.setFont("helvetica", bold ? "bold" : "normal");
        pdf.setFontSize(size);
        pdf.setTextColor(...color);

        const lines = pdf.splitTextToSize(String(value || "—"), w);
        pdf.text(lines, x, y + 12);

        return y + rowHeight;
      }

      /* LEFT COLUMN */

      let ly = bodyTop;

      ly = infoRow(
        "Guest Name",
        ticket.customerName,
        col1X,
        ly,
        col1W,
        { size: 17, bold: true, color: VIOLET }
      );

      ly = infoRow(
        "Mobile",
        ticket.customerPhone,
        col1X,
        ly,
        col1W
      );

      ly = infoRow(
        "Email",
        ticket.customerEmail,
        col1X,
        ly,
        col1W
      );

      /* RIGHT COLUMN */

      let ry = bodyTop;

      ry = infoRow(
        "Payment Time",
        paidAt,
        col2X,
        ry,
        col2W
      );

      ry = infoRow(
        "Order Reference",
        ticket.orderId,
        col2X,
        ry,
        col2W
      );

      ry = infoRow(
        "Ticket ID",
        ticket.ticketId,
        col2X,
        ry,
        col2W,
        { bold: true, color: CYAN }
      );

      /* ---------------------------------- */
      /* QR PANEL */
      /* ---------------------------------- */

      const qrPanelH = 170;

      pdf.setFillColor(...SURFACE);
      pdf.roundedRect(
        qrPanelX,
        bodyTop - 10,
        qrPanelW,
        qrPanelH,
        16,
        16,
        "F"
      );

      pdf.setDrawColor(...BORDER);
      pdf.roundedRect(
        qrPanelX,
        bodyTop - 10,
        qrPanelW,
        qrPanelH,
        16,
        16,
        "S"
      );

      const qrSize = qrPanelW - 24;

      const qrX = qrPanelX + 12;
      const qrY = bodyTop + 6;

      pdf.setFillColor(...WHITE);
      pdf.roundedRect(qrX, qrY, qrSize, qrSize, 10, 10, "F");

      if (qrDataUrl) {
        pdf.addImage(qrDataUrl, "PNG", qrX + 5, qrY + 5, qrSize - 10, qrSize - 10);
      }

      pdf.setFontSize(8);
      pdf.setTextColor(...VIOLET);
      pdf.text("Scan to verify", qrX, qrY + qrSize + 16);

      /* ---------------------------------- */
      /* FOOTER */
      /* ---------------------------------- */

      const footerY = bodyTop + qrPanelH + 20;

      pdf.setFontSize(9);
      pdf.setTextColor(...VIOLET);

      pdf.text("VERIFICATION INSTRUCTIONS", cX + 24, footerY);

      pdf.setFontSize(8);
      pdf.setTextColor(...MUTED);

      const footerText = pdf.splitTextToSize(
        "Present this ticket at the entrance gate. Staff will scan the QR code to confirm your ticket is valid. Entry is for one person only — do not share or duplicate this ticket.",
        cW - 50
      );

      pdf.text(footerText, cX + 24, footerY + 14);

      /* ---------------------------------- */
      /* SAVE */
      /* ---------------------------------- */

      pdf.save(fileName);
    } catch (error) {
      console.error(error);
      alert("Could not download ticket");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#461AA2] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#3a1488]"
    >
      {downloading ? "Preparing PDF…" : "Download Ticket"}
    </button>
  );
}