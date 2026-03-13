import { configureCashfree, getCashfreeMode } from "../../../lib/cashfree";
import {
  getDayTypeForVisitDate,
  getVisitDateValidationMessage,
} from "../../../lib/bookingTime";
import { createConvexClient, getConvexHttpActionsUrl } from "../../../lib/convex";
import { formatShortDate } from "../../../lib/dateFormat";

export async function POST(req) {
  try {
    const Cashfree = configureCashfree();
    const convex = createConvexClient();
    const body = await req.json();

    const {
      amount,
      customer_name,
      customer_email,
      customer_phone,
      ticket_type,
      visit_date,
      quantity,
      adult_quantity,
      child_quantity,
    } = body;

    if (
      !amount ||
      !customer_name ||
      !customer_email ||
      !customer_phone ||
      !visit_date
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const visitDateError = getVisitDateValidationMessage(visit_date);

    if (visitDateError) {
      return Response.json(
        { error: visitDateError },
        { status: 400 }
      );
    }

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return Response.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const ticketQuantity = Number(quantity || 1);
    const adultQuantity = Number(adult_quantity || 0);
    const childQuantity = Number(child_quantity || 0);

    if (!Number.isInteger(ticketQuantity) || ticketQuantity <= 0) {
      return Response.json(
        { error: "Invalid ticket quantity" },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(adultQuantity) ||
      !Number.isInteger(childQuantity) ||
      adultQuantity < 0 ||
      childQuantity < 0 ||
      adultQuantity + childQuantity !== ticketQuantity
    ) {
      return Response.json(
        { error: "Invalid adult/child ticket split" },
        { status: 400 }
      );
    }

    const day_type = getDayTypeForVisitDate(visit_date);
    const order_id = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const customer_id = `CUST_${Date.now()}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;
    const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
    const ticketParts = [];

    if (adultQuantity > 0) {
      ticketParts.push(`Adult Ticket x${adultQuantity}`);
    }

    if (childQuantity > 0) {
      ticketParts.push(`Child Ticket x${childQuantity}`);
    }

    const ticketLabel =
      ticketParts.join(" + ") ||
      (ticket_type === "child" ? "Child Ticket" : "Adult Ticket");
    const dayLabel = day_type === "sunday" ? "Sunday" : "Regular";
    const formattedVisitDate = formatShortDate(visit_date);
    const sanitizedCustomerName = customer_name
      .trim()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, " ");

    const orderMeta = {
      return_url: `${normalizedBaseUrl}/payment-success?order_id={order_id}`,
      notify_url: `${getConvexHttpActionsUrl()}/cashfree/webhook`,
    };

    const orderRequest = {
      order_amount: numericAmount,
      order_currency: "INR",
      order_id,
      customer_details: {
        customer_id,
        customer_name: sanitizedCustomerName || "Guest User",
        customer_email,
        customer_phone,
      },
      order_meta: orderMeta,
      order_note: `${ticketLabel} x${ticketQuantity} (${dayLabel}) - Visit ${formattedVisitDate}`,
    };

    const response = await Cashfree.PGCreateOrder(orderRequest);

    await convex.mutation("orders:createOrder", {
      order_id,
      customer_name: sanitizedCustomerName || "Guest User",
      email: customer_email,
      phone: customer_phone,
      amount: numericAmount,
      currency: "INR",
      order_note: orderRequest.order_note,
      day_type,
      visit_date,
      ticket_type,
      quantity: ticketQuantity,
      gateway_order_id: response.data.order_id,
    });

    return Response.json({
      success: true,
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
      mode: getCashfreeMode(),
    });
  } catch (error) {
    const cashfreeError = error?.response?.data;

    console.error("Cashfree error:", cashfreeError || error.message);

    return Response.json(
      {
        success: false,
        error: cashfreeError?.message || error.message || "Order creation failed",
        code: cashfreeError?.code || null,
        type: cashfreeError?.type || null,
      },
      { status: 500 }
    );
  }
}
