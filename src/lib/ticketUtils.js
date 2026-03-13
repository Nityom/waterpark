import { configureCashfree } from "./cashfree";
import { createConvexClient } from "./convex";

function mapTicketStatus(order) {
  if (!order) {
    return "failed";
  }

  if (order.redeemed_at) {
    return "redeemed";
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

function mapOrderStatus(paymentStatus) {
  if (paymentStatus === "SUCCESS") {
    return "PAID";
  }

  if (paymentStatus === "FAILED") {
    return "FAILED";
  }

  if (paymentStatus === "USER_DROPPED") {
    return "CANCELLED";
  }

  return "PROCESSING";
}

function normalizePaymentId(value) {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  return String(value);
}

function getLatestPayment(payments) {
  if (!Array.isArray(payments) || payments.length === 0) {
    return null;
  }

  const byPriority = ["SUCCESS", "PENDING", "USER_DROPPED", "FAILED"];

  for (const status of byPriority) {
    const match = payments.find((payment) => payment?.payment_status === status);
    if (match) {
      return match;
    }
  }

  return payments[0];
}

async function syncOrderWithCashfree(orderId, order) {
  const shouldSync =
    !order ||
    (!order.ticket_generated &&
      (order.payment_status === "INITIATED" || order.payment_status === "PENDING"));

  if (!shouldSync) {
    return order;
  }

  const convex = createConvexClient();
  const Cashfree = configureCashfree();
  const paymentsResponse = await Cashfree.PGOrderFetchPayments(orderId);
  const payment = getLatestPayment(paymentsResponse?.data || []);

  if (!payment?.payment_status) {
    return order;
  }

  await convex.mutation("orders:updatePaymentStatus", {
    order_id: orderId,
    payment_status: payment.payment_status,
    order_status: mapOrderStatus(payment.payment_status),
    payment_id: normalizePaymentId(payment.cf_payment_id),
    payment_confirmed_at:
      payment.payment_completion_time ||
      payment.payment_time ||
      new Date().toISOString(),
    webhook_payload: {
      source: "cashfree_poll",
      payment,
    },
  });

  if (payment.payment_status === "SUCCESS") {
    await convex.mutation("orders:generateTicket", {
      order_id: orderId,
    });
  }

  return await convex.query("orders:getOrderById", { orderId });
}

export function getTicketVerificationUrl(orderId) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl.replace(/\/$/, "")}/verify-ticket?order_id=${encodeURIComponent(orderId)}`;
}

export async function getTicketDetails(orderId) {
  const convex = createConvexClient();
  const initialOrder = await convex.query("orders:getOrderById", { orderId });
  const syncedOrder = await syncOrderWithCashfree(orderId, initialOrder);
  const status = mapTicketStatus(syncedOrder);

  return {
    orderId: syncedOrder?.order_id || orderId,
    ticketId: syncedOrder?.ticket_id || null,
    amount: syncedOrder?.amount ?? 0,
    currency: syncedOrder?.currency || "INR",
    note: syncedOrder?.order_note || "Day Pass",
    customerName: syncedOrder?.customer_name || "Guest User",
    customerEmail: syncedOrder?.email || "Not provided",
    customerPhone: syncedOrder?.phone || "Not provided",
    status,
    paymentStatus: syncedOrder?.payment_status || "FAILED",
    redeemedAt: syncedOrder?.redeemed_at || null,
    paymentTime:
      syncedOrder?.payment_confirmed_at || syncedOrder?._creationTime || null,
  };
}
