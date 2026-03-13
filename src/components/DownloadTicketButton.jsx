"use client";

import { useState } from "react";
import jsPDF from "jspdf";

function loadImageAsDataUrl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, { mode: "cors" });

      if (!response.ok) {
        throw new Error("Could not load QR image");
      }

      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Could not read QR image"));
      reader.readAsDataURL(blob);
    } catch (error) {
      reject(error);
    }
  });
}

function drawLabelValue(pdf, label, value, x, y, width) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(110, 118, 138);
  pdf.text(label, x, y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(13);
  pdf.setTextColor(16, 24, 40);
  const lines = pdf.splitTextToSize(String(value || "-"), width);
  pdf.text(lines, x, y + 14);
  return y + 14 + lines.length * 14;
}

export default function DownloadTicketButton({
  fileName = "ticket.pdf",
  ticket,
  qrSource,
}) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!ticket || downloading) {
      return;
    }

    try {
      setDownloading(true);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 32;
      const cardX = margin;
      const cardY = 34;
      const cardWidth = pageWidth - margin * 2;
      const cardHeight = pageHeight - margin * 2;
      const qrDataUrl = qrSource ? await loadImageAsDataUrl(qrSource) : null;

      pdf.setFillColor(243, 247, 241);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      pdf.setFillColor(18, 59, 42);
      pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 22, 22, "F");

      pdf.setFillColor(15, 23, 42);
      pdf.roundedRect(cardX + 8, cardY + 8, cardWidth - 16, cardHeight - 16, 20, 20, "F");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(134, 239, 172);
      pdf.text("ENTRY TICKET", cardX + 28, cardY + 40);

      pdf.setFontSize(22);
      pdf.setTextColor(255, 255, 255);
      const noteLines = pdf.splitTextToSize(ticket.note || "Day Pass", 280);
      pdf.text(noteLines, cardX + 28, cardY + 72);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(210, 218, 231);
      pdf.text("Show this ticket at the gate for verification.", cardX + 28, cardY + 118);

      pdf.setFillColor(255, 255, 255);
      pdf.setDrawColor(255, 255, 255);
      pdf.setGState(new pdf.GState({ opacity: 0.12 }));
      pdf.roundedRect(cardX + cardWidth - 146, cardY + 28, 110, 42, 18, 18, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(184, 193, 208);
      pdf.text("AMOUNT", cardX + cardWidth - 124, cardY + 44);
      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      pdf.text(`${ticket.currency || "INR"} ${ticket.amount || 0}`, cardX + cardWidth - 124, cardY + 63);

      const leftX = cardX + 28;
      const topY = cardY + 160;
      const columnWidth = 215;
      const boxHeight = 188;
      const gap = 18;

      pdf.setFillColor(255, 255, 255);
      pdf.setGState(new pdf.GState({ opacity: 0.08 }));
      pdf.roundedRect(leftX, topY, columnWidth, boxHeight, 20, 20, "F");
      pdf.roundedRect(leftX + columnWidth + gap, topY, columnWidth, boxHeight, 20, 20, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      let y1 = drawLabelValue(pdf, "GUEST NAME", ticket.customerName, leftX + 18, topY + 24, columnWidth - 36);
      y1 = drawLabelValue(pdf, "MOBILE", ticket.customerPhone, leftX + 18, y1 + 12, columnWidth - 36);
      drawLabelValue(pdf, "EMAIL", ticket.customerEmail, leftX + 18, y1 + 12, columnWidth - 36);

      let y2 = drawLabelValue(
        pdf,
        "PAYMENT TIME",
        ticket.paymentTime ? new Date(ticket.paymentTime).toLocaleString("en-IN") : "Unavailable",
        leftX + columnWidth + gap + 18,
        topY + 24,
        columnWidth - 36
      );
      y2 = drawLabelValue(pdf, "ORDER REFERENCE", ticket.orderId, leftX + columnWidth + gap + 18, y2 + 12, columnWidth - 36);
      y2 = drawLabelValue(pdf, "TICKET ID", ticket.ticketId, leftX + columnWidth + gap + 18, y2 + 12, columnWidth - 36);
      drawLabelValue(
        pdf,
        "TICKET STATUS",
        ticket.status === "redeemed" ? "Redeemed" : "Valid for Entry",
        leftX + columnWidth + gap + 18,
        y2 + 12,
        columnWidth - 36
      );

      const qrBoxX = cardX + cardWidth - 194;
      const qrBoxY = cardY + 160;
      const qrBoxSize = 162;
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 18, 18, "F");

      if (qrDataUrl) {
        pdf.addImage(qrDataUrl, "PNG", qrBoxX + 14, qrBoxY + 14, qrBoxSize - 28, qrBoxSize - 28);
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(207, 252, 197);
      pdf.text("Scan to verify this ticket", qrBoxX - 6, qrBoxY + qrBoxSize + 22);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(210, 218, 231);
      pdf.text("Opens the live ticket verification page.", qrBoxX - 2, qrBoxY + qrBoxSize + 38);

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
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#5123B6] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#461AA2] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1" />
      </svg>
      {downloading ? "Preparing PDF..." : "Download Ticket"}
    </button>
  );
}
