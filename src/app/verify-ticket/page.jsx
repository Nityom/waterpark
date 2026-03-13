import Link from "next/link";
import RedeemTicketButton from "../../components/RedeemTicketButton";
import TicketStatusBadge from "../../components/TicketStatusBadge";
import { formatDateTimeShort, formatShortDate } from "../../lib/dateFormat";
import { getTicketDetails } from "../../lib/ticketUtils";

function VerifyIcon({ verified }) {
  return (
    <div className={`flex h-20 w-20 items-center justify-center rounded-full ${verified ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
      {verified ? (
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
  );
}

export default async function VerifyTicketPage({ searchParams }) {
  const { order_id: orderId } = await searchParams;

  if (!orderId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FB] p-4">
        <div className="w-full max-w-md rounded-[28px] bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-extrabold text-red-600">Invalid Ticket</h1>
          <p className="mt-3 text-sm text-gray-500">No order ID was provided for verification.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-[#5123B6] px-6 py-3 text-white">Return Home</Link>
        </div>
      </main>
    );
  }

  let ticket;
  let loadError = null;

  try {
    ticket = await getTicketDetails(orderId);
  } catch (error) {
    console.error("Ticket verification failed:", error?.response?.data || error.message);
    loadError = "We could not verify this ticket right now.";
  }

  if (loadError || !ticket) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F7FB] p-4">
        <div className="w-full max-w-md rounded-[28px] bg-white p-8 text-center shadow-lg">
          <VerifyIcon verified={false} />
          <h1 className="mt-6 text-2xl font-extrabold text-[#101828]">Verification Failed</h1>
          <p className="mt-3 text-sm text-gray-500">{loadError}</p>
          <p className="mt-2 font-mono text-xs text-gray-400">{orderId}</p>
        </div>
      </main>
    );
  }

  const verified = ticket.status === "verified" || ticket.status === "redeemed";

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#EDF7F0_0%,#F8FAFC_45%,#FFFFFF_100%)] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[32px] bg-white p-6 shadow-[0_22px_70px_rgba(16,24,40,0.08)] md:p-8">
          <div className="flex flex-col items-center text-center">
            <VerifyIcon verified={verified} />
            <div className="mt-5">
              <TicketStatusBadge status={ticket.status} />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold text-[#101828]">
              {ticket.status === "redeemed" ? "Ticket Already Redeemed" : verified ? "Customer Verified" : "Ticket Not Verified"}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Order ID: <span className="font-mono text-gray-700">{ticket.orderId}</span>
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-[#F7F8FC] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">Customer Name</p>
              <p className="mt-2 text-lg font-bold text-[#101828]">{ticket.customerName}</p>
            </div>
            <div className="rounded-3xl bg-[#F7F8FC] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">Ticket Type</p>
              <p className="mt-2 text-lg font-bold text-[#101828]">{ticket.note}</p>
            </div>
            <div className="rounded-3xl bg-[#F7F8FC] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">Mobile</p>
              <p className="mt-2 text-lg font-bold text-[#101828]">{ticket.customerPhone}</p>
            </div>
            <div className="rounded-3xl bg-[#F7F8FC] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">Email</p>
              <p className="mt-2 break-all text-lg font-bold text-[#101828]">{ticket.customerEmail}</p>
            </div>
            <div className="rounded-3xl bg-[#F7F8FC] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">Amount</p>
              <p className="mt-2 text-lg font-bold text-[#101828]">{ticket.currency} {ticket.amount}</p>
            </div>
            <div className="rounded-3xl bg-[#F7F8FC] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">Visit Date</p>
              <p className="mt-2 text-lg font-bold text-[#101828]">{ticket.visitDate ? formatShortDate(ticket.visitDate) : "Unavailable"}</p>
            </div>
            <div className="rounded-3xl bg-[#F7F8FC] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">Paid At</p>
              <p className="mt-2 text-lg font-bold text-[#101828]">{ticket.paymentTime ? formatDateTimeShort(ticket.paymentTime) : "Unavailable"}</p>
            </div>
          </div>

          {ticket.redeemedAt ? (
            <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">Redeemed At</p>
              <p className="mt-2 text-lg font-bold text-emerald-900">{formatDateTimeShort(ticket.redeemedAt)}</p>
            </div>
          ) : null}

          {ticket.status === "verified" ? <RedeemTicketButton orderId={ticket.orderId} /> : null}
        </div>
      </div>
    </main>
  );
}

