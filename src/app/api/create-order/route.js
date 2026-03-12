import { configureCashfree, getCashfreeMode } from "../../../lib/cashfree";

export async function POST(req) {
  try {
    const Cashfree = configureCashfree();
    const body = await req.json();

    const {
      amount,
      customer_name,
      customer_email,
      customer_phone,
      ticket_type,
      day_type,
      quantity,
    } = body;

    if (!amount || !customer_name || !customer_email || !customer_phone) {
      return Response.json(
        { error: "Missing required fields" },
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

    if (!Number.isInteger(ticketQuantity) || ticketQuantity <= 0) {
      return Response.json(
        { error: "Invalid ticket quantity" },
        { status: 400 }
      );
    }

    const order_id = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const customer_id = `CUST_${Date.now()}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;
    const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
    const ticketLabel =
      ticket_type === "child" ? "Child Ticket" : "Adult Ticket";
    const dayLabel = day_type === "sunday" ? "Sunday" : "Regular";
    const sanitizedCustomerName = customer_name
      .trim()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, " ");

    const orderRequest = {
      order_amount: numericAmount,
      order_currency: "INR",
      order_id: order_id,

      customer_details: {
        customer_id,
        customer_name: sanitizedCustomerName || "Guest User",
        customer_email,
        customer_phone,
      },

      order_meta: {
        return_url: `${normalizedBaseUrl}/payment-success?order_id={order_id}`,
      },
      order_note: `${ticketLabel} x${ticketQuantity} (${dayLabel})`,
    };

    const response = await Cashfree.PGCreateOrder(orderRequest);

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
