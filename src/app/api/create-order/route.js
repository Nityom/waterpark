import { configureCashfree, getCashfreeMode } from "../../../lib/cashfree";
import {
  getDayTypeForVisitDate,
  getVisitDateValidationMessage,
} from "../../../lib/bookingTime";
import { createConvexClient, getConvexHttpActionsUrl } from "../../../lib/convex";
import { formatShortDate } from "../../../lib/dateFormat";
import { calculateConvenienceCharge } from "../../../lib/convenienceCharge";

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
      costumes_quantity,
      locker_quantity,
      lunch_quantity,
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
    const costumesQuantity = Number(costumes_quantity || 0);
    const lockerQuantity = Number(locker_quantity || 0);
    const lunchQuantity = Number(lunch_quantity || 0);

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

    if (
      !Number.isInteger(costumesQuantity) ||
      !Number.isInteger(lockerQuantity) ||
      !Number.isInteger(lunchQuantity) ||
      costumesQuantity < 0 ||
      lockerQuantity < 0 ||
      lunchQuantity < 0
    ) {
      return Response.json(
        { error: "Invalid add-on quantity" },
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
      ticketParts.push(`Adults - ${adultQuantity}`);
    }

    if (childQuantity > 0) {
      ticketParts.push(`Child - ${childQuantity}`);
    }

    if (costumesQuantity > 0) {
      ticketParts.push(`Costumes - ${costumesQuantity}`);
    }

    if (lockerQuantity > 0) {
      ticketParts.push(`Lockers - ${lockerQuantity}`);
    }

    if (lunchQuantity > 0) {
      ticketParts.push(`Lunch Veg Thali - ${lunchQuantity}`);
    }

    const ticketLabel =
      ticketParts.join(" | ") ||
      (ticket_type === "child" ? "Child - 1" : "Adults - 1");
    const dayLabel = day_type === "sunday" ? "Sunday" : "Regular";
    const formattedVisitDate = formatShortDate(visit_date);
    const sanitizedCustomerName = customer_name
      .trim()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, " ");

    // Calculate convenience charge (2.3% with proper rounding)
    const chargeInfo = calculateConvenienceCharge(numericAmount);
    const finalAmount = chargeInfo.totalAmount;

    const orderMeta = {
      return_url: `${normalizedBaseUrl}/payment-success?order_id={order_id}`,
      notify_url: `${getConvexHttpActionsUrl()}/cashfree/webhook`,
    };

    const orderRequest = {
      order_amount: finalAmount,
      order_currency: "INR",
      order_id,
      customer_details: {
        customer_id,
        customer_name: sanitizedCustomerName || "Guest User",
        customer_email,
        customer_phone,
      },
      order_meta: orderMeta,
      order_note: `${ticketLabel} (${dayLabel}) - Visit ${formattedVisitDate}`,
    };

    const response = await Cashfree.PGCreateOrder(orderRequest);

    await convex.mutation("orders:createOrder", {
      order_id,
      customer_name: sanitizedCustomerName || "Guest User",
      email: customer_email,
      phone: customer_phone,
      amount: finalAmount,
      base_amount: chargeInfo.baseAmount,
      convenience_charge: chargeInfo.chargeAmount,
      currency: "INR",
      order_note: orderRequest.order_note,
      day_type,
      visit_date,
      ticket_type,
      quantity: ticketQuantity,
      costumes_quantity: costumesQuantity,
      locker_quantity: lockerQuantity,
      lunch_quantity: lunchQuantity,
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
