import Link from "next/link";
import DownloadTicketButton from "../../components/DownloadTicketButton";
import TicketQrCard, { getTicketQrSource } from "../../components/TicketQrCard";
import TicketStatusBadge from "../../components/TicketStatusBadge";
import { getTicketDetails, getTicketVerificationUrl } from "../../lib/ticketUtils";

export default async function PaymentSuccess({ searchParams }) {
  const { order_id } = await searchParams;

  if (!order_id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Access</h1>
          <p className="text-gray-600 mb-6">No order ID found.</p>
          <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  let ticket = null;
  let statusMessage = "Your payment is currently being processed.";
  let detailMessage =
    "If the amount has been deducted, please wait a few minutes while we confirm the transaction. Your ticket will be generated automatically once the payment is confirmed. If the ticket is not generated after some time, please contact our support team.";
  let isSuccess = false;

  try {
    ticket = await getTicketDetails(order_id);

    if (ticket.status === "verified" || ticket.status === "redeemed") {
      isSuccess = true;
      statusMessage =
        "Payment Successful. Your ticket has been generated successfully.";
      detailMessage = `Ticket ID: ${ticket.ticketId}. You will receive the ticket details shortly.`;
    } else if (ticket.paymentStatus === "PENDING") {
      statusMessage = "Your payment is currently being processed.";
      detailMessage =
        "If the amount has been deducted, please wait a few minutes while we confirm the transaction. Your ticket will be generated automatically once the payment is confirmed. If the ticket is not generated after some time, please contact our support team.";
    } else if (ticket.paymentStatus === "USER_DROPPED") {
      statusMessage = "The payment was not completed or was cancelled.";
      detailMessage =
        "No ticket has been generated. You can retry the payment to complete your booking.";
    } else {
      statusMessage = "Payment Failed. Your ticket has not been generated.";
      detailMessage =
        "If the amount was deducted from your bank account, please contact our support team with your payment details so we can investigate the issue.";
    }
  } catch (error) {
    console.error("Error verifying payment:", error.response?.data || error.message);
    statusMessage = "Payment Failed. Your ticket has not been generated.";
    detailMessage =
      "If the amount was deducted from your bank account, please contact our support team with your payment details so we can investigate the issue.";
  }

  const shouldShowTicket = Boolean(
    ticket && (ticket.status === "verified" || ticket.status === "redeemed")
  );
  const verificationUrl = shouldShowTicket
    ? getTicketVerificationUrl(ticket.orderId)
    : "";
  const qrSource = shouldShowTicket ? getTicketQrSource(verificationUrl) : "";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#EEF7F1_0%,#FFFFFF_42%,#F7F9FF_100%)] p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[32px] bg-white p-6 shadow-[0_20px_70px_rgba(16,24,40,0.08)] md:p-8">
            <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
              isSuccess ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
            }`}>
              {isSuccess ? (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>

            <div className="text-center">
              {ticket ? <TicketStatusBadge status={ticket.status} /> : null}
              <h1 className="mt-4 text-3xl font-extrabold text-gray-900">{statusMessage}</h1>
              <p className="mt-2 text-gray-500">
                Order ID: <span className="font-mono text-sm text-gray-800">{order_id}</span>
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
                {detailMessage}
              </p>
            </div>

            {shouldShowTicket ? (
              <div
                id="ticket-download-card"
                className="mt-8 overflow-hidden rounded-[28px] border border-[#D4F0DB] bg-[linear-gradient(135deg,#123B2A_0%,#0F766E_55%,#D7F5DD_100%)] p-[1px]"
              >
                <div className="rounded-[27px] bg-[linear-gradient(135deg,#0F172A_0%,#1F2937_55%,#1B4332_100%)] p-6 text-white">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#86EFAC]">
                        Entry Ticket
                      </p>
                      <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
                        {ticket.note}
                      </h2>
                      <p className="mt-2 text-sm text-white/75">
                        Show this ticket at the gate for verification.
                      </p>
                    </div>

                    <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-right">
                      <p className="text-xs uppercase tracking-[0.14em] text-white/60">Amount</p>
                      <p className="text-xl font-bold">
                        {ticket.currency} {ticket.amount}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-3xl bg-white/8 p-5 backdrop-blur">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                          Guest Name
                        </p>
                        <p className="mt-2 text-xl font-bold">{ticket.customerName}</p>
                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                          Mobile
                        </p>
                        <p className="mt-2 text-base font-semibold">{ticket.customerPhone}</p>
                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                          Email
                        </p>
                        <p className="mt-2 break-all text-sm font-semibold">{ticket.customerEmail}</p>
                      </div>

                      <div className="rounded-3xl bg-white/8 p-5 backdrop-blur">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                          Payment Time
                        </p>
                        <p className="mt-2 text-lg font-bold">
                          {ticket.paymentTime ? new Date(ticket.paymentTime).toLocaleString("en-IN") : "Unavailable"}
                        </p>
                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                          Order Reference
                        </p>
                        <p className="mt-2 break-all font-mono text-sm">{ticket.orderId}</p>
                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                          Ticket ID
                        </p>
                        <p className="mt-2 break-all font-mono text-sm">{ticket.ticketId}</p>
                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                          Ticket Status
                        </p>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#86EFAC]">
                          {ticket.status === "redeemed" ? "Redeemed" : "Valid for Entry"}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-white/8 p-5 text-center backdrop-blur">
                      <img
                        src={qrSource}
                        alt={`QR ticket for ${ticket.customerName}`}
                        crossOrigin="anonymous"
                        className="mx-auto h-44 w-44 rounded-2xl bg-white p-3 shadow-sm"
                      />
                      <p className="mt-4 text-sm font-semibold text-[#CFFCC5]">
                        Scan to verify this ticket
                      </p>
                      <p className="mt-1 text-xs text-white/65">
                        Opens the live ticket verification page.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {shouldShowTicket ? (
              <div className="mt-8 flex flex-wrap gap-3">
                <DownloadTicketButton
                  targetId="ticket-download-card"
                  fileName={`${ticket.ticketId || ticket.orderId || "ticket"}.pdf`}
                />
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-full border border-[#D0D5DD] px-5 py-3 text-sm font-bold text-[#344054] transition hover:bg-[#F9FAFB]"
                >
                  Return Home
                </Link>
              </div>
            ) : null}
          </section>

          <aside className="space-y-6">
            {shouldShowTicket ? (
              <TicketQrCard
                verificationUrl={verificationUrl}
                customerName={ticket.customerName}
              />
            ) : null}

            <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_45px_rgba(24,34,69,0.08)]">
              <h2 className="text-lg font-bold text-[#101828]">Gate Verification</h2>
              <p className="mt-3 text-sm text-gray-600">
                Scan the QR at entry. The verification page will show the customer
                details and a green verified tick when the payment is successful.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
