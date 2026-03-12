import { configureCashfree } from "./cashfree";
import { getRedeemedTicket } from "./redemptionStore";

function buildBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return baseUrl.replace(/\/$/, "");
}

export function getTicketVerificationUrl(orderId) {
  return `${buildBaseUrl()}/verify-ticket?order_id=${encodeURIComponent(orderId)}`;
}

export async function getTicketDetails(orderId) {
  const Cashfree = configureCashfree();

  const [orderResult, paymentsResult, redeemedResult] = await Promise.allSettled([
    Cashfree.PGFetchOrder(orderId),
    Cashfree.PGOrderFetchPayments(orderId),
    getRedeemedTicket(orderId),
  ]);

  if (paymentsResult.status !== "fulfilled") {
    throw paymentsResult.reason;
  }

  const order =
    orderResult.status === "fulfilled" ? orderResult.value.data : null;
  const payments = paymentsResult.value.data;
  const redeemedRecord =
    redeemedResult.status === "fulfilled" ? redeemedResult.value : null;
  const successfulPayment = payments.find(
    (payment) => payment.payment_status === "SUCCESS"
  );
  const pendingPayment = payments.find(
    (payment) => payment.payment_status === "PENDING"
  );

  let status = "failed";

  if (successfulPayment) {
    status = redeemedRecord ? "redeemed" : "verified";
  } else if (pendingPayment) {
    status = "pending";
  }

  return {
    orderId: order?.order_id || orderId,
    amount: order?.order_amount ?? successfulPayment?.payment_amount ?? 0,
    currency: order?.order_currency || "INR",
    note: order?.order_note || "Day Pass",
    customerName: order?.customer_details?.customer_name || "Guest User",
    customerEmail: order?.customer_details?.customer_email || "Not provided",
    customerPhone: order?.customer_details?.customer_phone || "Not provided",
    status,
    redeemedAt: redeemedRecord?.redeemedAt || null,
    paymentTime:
      successfulPayment?.payment_completion_time ||
      successfulPayment?.payment_time ||
      order?.created_at ||
      null,
  };
}
