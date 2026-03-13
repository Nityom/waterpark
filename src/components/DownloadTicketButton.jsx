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

function drawField(pdf, { label, value, x, y, width, valueSize = 12 }) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.setTextColor(83, 92, 116);
  pdf.text(label, x, y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(valueSize);
  pdf.setTextColor(16, 24, 40);
  const lines = pdf.splitTextToSize(String(value || "-"), width);
  pdf.text(lines, x, y + 14);
  return y + 14 + lines.length * (valueSize + 2);
}

function drawInfoCard(pdf, x, y, width, height, fields) {
  pdf.setFillColor(247, 248, 252);
  pdf.roundedRect(x, y, width, height, 16, 16, "F");

  let cursorY = y + 20;

  for (const field of fields) {
    cursorY = drawField(pdf, {
      ...field,
      x: x + 16,
      y: cursorY,
      width: width - 32,
    });
    cursorY += 12;
  }
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
      const margin = 28;
      const cardX = margin;
      const cardY = 28;
      const cardWidth = pageWidth - margin * 2;
      const cardHeight = pageHeight - margin * 2;
      const qrDataUrl = qrSource ? await loadImageAsDataUrl(qrSource) : null;
      const paidAt = ticket.paymentTime
        ? new Date(ticket.paymentTime).toLocaleString("en-IN")
        : "Unavailable";
      const ticketStatus = ticket.status === "redeemed" ? "Redeemed" : "Valid for Entry";

      pdf.setFillColor(241, 245, 249);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(cardX, cardY, cardWidth, cardHeight, 24, 24, "F");

      pdf.setDrawColor(23, 92, 66);
      pdf.setLineWidth(4);
      pdf.roundedRect(cardX + 2, cardY + 2, cardWidth - 4, cardHeight - 4, 22, 22, "S");

      pdf.setFillColor(12, 27, 61);
      pdf.roundedRect(cardX + 18, cardY + 18, cardWidth - 36, 124, 20, 20, "F");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(134, 239, 172);
      pdf.text("ENTRY TICKET", cardX + 34, cardY + 44);

      pdf.setFontSize(20);
      pdf.setTextColor(255, 255, 255);
      const noteLines = pdf.splitTextToSize(ticket.note || "Day Pass", cardWidth - 210);
      pdf.text(noteLines, cardX + 34, cardY + 72);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(219, 234, 254);
      pdf.text("Show this ticket at the gate for verification.", cardX + 34, cardY + 116);

      pdf.setFillColor(255, 255, 255);
      pdf.setGState(new pdf.GState({ opacity: 0.14 }));
      pdf.roundedRect(cardX + cardWidth - 140, cardY + 36, 88, 38, 16, 16, "F");
      pdf.setGState(new pdf.GState({ opacity: 1 }));
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.setTextColor(227, 232, 240);
      pdf.text("AMOUNT", cardX + cardWidth - 122, cardY + 50);
      pdf.setFontSize(15);
      pdf.setTextColor(255, 255, 255);
      pdf.text(`${ticket.currency || "INR"} ${ticket.amount || 0}`, cardX + cardWidth - 122, cardY + 68);

      const contentTop = cardY + 166;
      const leftWidth = 250;
      const middleWidth = 170;
      const gap = 16;
      const qrWidth = 116;

      drawInfoCard(pdf, cardX + 24, contentTop, leftWidth, 182, [
        { label: "GUEST NAME", value: ticket.customerName, valueSize: 15 },
        { label: "MOBILE", value: ticket.customerPhone },
        { label: "EMAIL", value: ticket.customerEmail, valueSize: 11 },
      ]);

      drawInfoCard(pdf, cardX + 24 + leftWidth + gap, contentTop, middleWidth, 182, [
        { label: "PAYMENT TIME", value: paidAt, valueSize: 11 },
        { label: "ORDER REFERENCE", value: ticket.orderId, valueSize: 10 },
        { label: "TICKET ID", value: ticket.ticketId, valueSize: 10 },
        { label: "TICKET STATUS", value: ticketStatus, valueSize: 12 },
      ]);

      const qrCardX = cardX + cardWidth - qrWidth - 32;
      const qrCardY = contentTop;
      pdf.setFillColor(247, 248, 252);
      pdf.roundedRect(qrCardX, qrCardY, qrWidth, 182, 16, 16, "F");
      pdf.setFillColor(255, 255, 255);
      pdf.roundedRect(qrCardX + 12, qrCardY + 14, qrWidth - 24, qrWidth - 24, 14, 14, "F");

      if (qrDataUrl) {
        pdf.addImage(qrDataUrl, "PNG", qrCardX + 20, qrCardY + 22, qrWidth - 40, qrWidth - 40);
      }

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(23, 92, 66);
      pdf.text("Scan to verify", qrCardX + 18, qrCardY + 142);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(83, 92, 116);
      pdf.text("Use this QR at entry or open", qrCardX + 12, qrCardY + 158);
      pdf.text("the live ticket verification page.", qrCardX + 12, qrCardY + 170);

      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(1);
      pdf.line(cardX + 24, cardY + cardHeight - 122, cardX + cardWidth - 24, cardY + cardHeight - 122);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(23, 92, 66);
      pdf.text("Verification Instructions", cardX + 24, cardY + cardHeight - 96);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(71, 85, 105);
      const footerLines = pdf.splitTextToSize(
        "Present this ticket at the gate. The QR code opens the live verification page, where staff can confirm whether the ticket is valid or already redeemed.",
        cardWidth - 48
      );
      pdf.text(footerLines, cardX + 24, cardY + cardHeight - 76);

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
