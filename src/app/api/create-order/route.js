import { configureCashfree, getCashfreeMode } from "../../../lib/cashfree";
import {
  getDayTypeForVisitDate,
  getVisitDateValidationMessage,
  getTurfVisitDateValidationMessage,
} from "../../../lib/bookingTime";
import { createConvexClient, getConvexHttpActionsUrl } from "../../../lib/convex";
import { formatShortDate } from "../../../lib/dateFormat";
import { calculateConvenienceCharge } from "../../../lib/convenienceCharge";
import { parseSlotRange, getSlotBookingStatus } from "../../../lib/turfSlots";

export async function POST(req) {
  try {
    const Cashfree = configureCashfree();
    const convex = createConvexClient();
    const body = await req.json();

    const {
      booking_type,
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
      turf_slot,
      turf_hours,
    } = body;

    const isTurf = booking_type === "turf";

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

    const visitDateError = isTurf
      ? getTurfVisitDateValidationMessage(visit_date)
      : getVisitDateValidationMessage(visit_date);

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

    let ticketQuantity = Number(quantity || 1);
    let adultQuantity = 0;
    let childQuantity = 0;
    let costumesQuantity = 0;
    let lockerQuantity = 0;
    let lunchQuantity = 0;
    let order_note = "";
    let finalTicketType = ticket_type || "adult";
    const hours = Number(turf_hours || quantity || 1);

    if (isTurf) {
      if (!Number.isInteger(hours) || hours <= 0) {
        return Response.json(
          { error: "Invalid turf hours" },
          { status: 400 }
        );
      }
      ticketQuantity = hours;
      finalTicketType = "turf";
      const slotText = turf_slot || "Slot Confirmed";

      // Collision check against Convex DB to prevent double booking
      try {
        const existingBookings = await convex.query("orders:getBookedTurfSlots", {
          visitDate: visit_date,
        });

        const requestedRange = parseSlotRange(slotText, hours);
        if (requestedRange) {
          const conflict = getSlotBookingStatus(requestedRange.startHour, hours, existingBookings || []);
          if (conflict.isBooked) {
            return Response.json(
              {
                error: `The turf slot "${slotText}" is already booked on ${visit_date}. Please choose another time slot.`,
              },
              { status: 409 }
            );
          }
        }
      } catch (err) {
        console.warn("Turf slot collision check warning:", err?.message || err);
      }

      const formattedVisitDate = formatShortDate(visit_date);
      order_note = `Turf Booking - Cricket Playground | ${hours} hr${hours > 1 ? "s" : ""} (${slotText}) - Visit ${formattedVisitDate}`;
    } else {
      adultQuantity = Number(adult_quantity || 0);
      childQuantity = Number(child_quantity || 0);
      costumesQuantity = Number(costumes_quantity || 0);
      lockerQuantity = Number(locker_quantity || 0);
      lunchQuantity = Number(lunch_quantity || 0);

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
      const day_type = getDayTypeForVisitDate(visit_date);
      const dayLabel = day_type === "sunday" ? "Sunday" : "Regular";
      const formattedVisitDate = formatShortDate(visit_date);
      order_note = `${ticketLabel} (${dayLabel}) - Visit ${formattedVisitDate}`;
    }

    const day_type = getDayTypeForVisitDate(visit_date);
    const order_id = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const customer_id = `CUST_${Date.now()}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;
    const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
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
      order_note,
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
      ticket_type: finalTicketType,
      quantity: ticketQuantity,
      costumes_quantity: costumesQuantity,
      locker_quantity: lockerQuantity,
      lunch_quantity: lunchQuantity,
      gateway_order_id: response.data.order_id,
      booking_type: isTurf ? "turf" : "waterpark",
      turf_slot: isTurf ? (turf_slot || undefined) : undefined,
      turf_hours: isTurf ? hours : undefined,
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
