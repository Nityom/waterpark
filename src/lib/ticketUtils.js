import { createConvexClient } from "./convex";
import { getRedeemedTicket } from "./redemptionStore";

function mapTicketStatus(order) {
  if (!order) {
    return "failed";
  }

  if (order.ticket_generated && order.ticket_id) {
    return "verified";
  }

  if (order.payment_status === "USER_DROPPED") {
    return "cancelled";
  }

  if (order.payment_status === "INITIATED" || order.payment_status === "PENDING") {
    return "pending";
  }

  return "failed";
}

export function getTicketVerificationUrl(orderId) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl.replace(/\/$/, "")}/verify-ticket?order_id=${encodeURIComponent(orderId)}`;
}

export async function getTicketDetails(orderId) {
  const convex = createConvexClient();

  const [orderResult, redeemedResult] = await Promise.allSettled([
    convex.query("orders:getOrderById", { orderId }),
    getRedeemedTicket(orderId),
  ]);

  if (orderResult.status !== "fulfilled") {
    throw orderResult.reason;
  }

  const order = orderResult.value;
  const redeemedRecord =
    redeemedResult.status === "fulfilled" ? redeemedResult.value : null;
  const baseStatus = mapTicketStatus(order);
  const status =
    baseStatus === "verified" && redeemedRecord ? "redeemed" : baseStatus;

  return {
    orderId: order?.order_id || orderId,
    ticketId: order?.ticket_id || null,
    amount: order?.amount ?? 0,
    currency: order?.currency || "INR",
    note: order?.order_note || "Day Pass",
    customerName: order?.customer_name || "Guest User",
    customerEmail: order?.email || "Not provided",
    customerPhone: order?.phone || "Not provided",
    status,
    paymentStatus: order?.payment_status || "FAILED",
    redeemedAt: redeemedRecord?.redeemedAt || null,
    paymentTime: order?.payment_confirmed_at || order?._creationTime || null,
  };
}
