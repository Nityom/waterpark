export function getTicketQrSource(verificationUrl) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    verificationUrl
  )}`;
}

export default function TicketQrCard({ verificationUrl, customerName }) {
  const qrSource = getTicketQrSource(verificationUrl);

  return (
    <div className="rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(24,34,69,0.08)]">
      <div className="rounded-[24px] border border-[#D9CCFA] bg-[#F7F2FF] p-4 text-center">
        <img
          src={qrSource}
          alt={`QR ticket for ${customerName}`}
          crossOrigin="anonymous"
          className="mx-auto h-52 w-52 rounded-2xl bg-white p-3 shadow-sm"
        />
        <p className="mt-4 text-sm font-semibold text-[#5123B6]">
          Scan to verify this ticket
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Opens the customer verification page with payment status.
        </p>
      </div>
    </div>
  );
}
