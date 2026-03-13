import { httpActionGeneric, httpRouter, anyApi } from "convex/server";

const http = httpRouter();
const httpAction = httpActionGeneric;

function getOrderId(payload) {
  return (
    payload?.data?.order?.order_id ||
    payload?.order?.order_id ||
    payload?.order_id ||
    payload?.data?.order_id ||
    null
  );
}

function getPaymentStatus(payload) {
  return (
    payload?.data?.payment?.payment_status ||
    payload?.payment?.payment_status ||
    payload?.payment_status ||
    payload?.data?.payment_status ||
    null
  );
}

function getPaymentId(payload) {
  return (
    payload?.data?.payment?.cf_payment_id ||
    payload?.payment?.cf_payment_id ||
    payload?.cf_payment_id ||
    payload?.data?.cf_payment_id ||
    null
  );
}

function getPaymentTime(payload) {
  return (
    payload?.data?.payment?.payment_completion_time ||
    payload?.data?.payment?.payment_time ||
    payload?.payment?.payment_completion_time ||
    payload?.payment?.payment_time ||
    new Date().toISOString()
  );
}

function buildOrderStatus(paymentStatus) {
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

http.route({
  path: "/cashfree/webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payload = await request.json();
    const orderId = getOrderId(payload);
    const paymentStatus = getPaymentStatus(payload);

    if (!orderId || !paymentStatus) {
      return Response.json(
        { error: "Missing order_id or payment_status" },
        { status: 400 }
      );
    }

    const order = await ctx.runQuery(anyApi.orders.getOrderById, {
      orderId,
    });

    if (!order) {
      return Response.json(
        { error: `Unknown order_id: ${orderId}` },
        { status: 404 }
      );
    }

    await ctx.runMutation(anyApi.orders.updatePaymentStatus, {
      order_id: orderId,
      payment_status: paymentStatus,
      order_status: buildOrderStatus(paymentStatus),
      payment_id: getPaymentId(payload) || undefined,
      payment_confirmed_at: getPaymentTime(payload),
      webhook_payload: payload,
    });

    if (paymentStatus === "SUCCESS") {
      const ticket = await ctx.runMutation(anyApi.orders.generateTicket, {
        order_id: orderId,
      });

      return Response.json({
        message:
          `Payment Successful. Your ticket has been generated successfully. Ticket ID: ${ticket.ticket_id}.`,
        ticket_id: ticket.ticket_id,
      });
    }

    if (paymentStatus === "FAILED") {
      return Response.json({
        message:
          "Payment Failed. Your ticket has not been generated. If the amount was deducted, please contact our support team so we can investigate the issue.",
      });
    }

    if (paymentStatus === "PENDING") {
      return Response.json({
        message:
          "Your payment is currently being processed. If the amount has been deducted, please wait a few minutes while we confirm the transaction. Your ticket will be generated automatically once the payment is confirmed.",
      });
    }

    if (paymentStatus === "USER_DROPPED") {
      return Response.json({
        message:
          "The payment was not completed. No ticket has been generated. You can retry the payment.",
      });
    }

    return Response.json({
      message: "Webhook received.",
    });
  }),
});

export default http;
