import { getTicketDetails } from "../../../lib/ticketUtils";
import { redeemTicket } from "../../../lib/redemptionStore";

export async function POST(req) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return Response.json({ error: "Order ID is required" }, { status: 400 });
    }

    const ticket = await getTicketDetails(orderId);

    if (ticket.status !== "verified" && ticket.status !== "redeemed") {
      return Response.json(
        { error: "Only successful tickets can be redeemed" },
        { status: 400 }
      );
    }

    const result = await redeemTicket(orderId, {
      customerName: ticket.customerName,
      customerPhone: ticket.customerPhone,
      customerEmail: ticket.customerEmail,
      note: ticket.note,
      amount: ticket.amount,
    });

    return Response.json({
      success: true,
      alreadyRedeemed: result.alreadyRedeemed,
      redeemedAt: result.record.redeemedAt,
    });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Could not redeem ticket" },
      { status: 500 }
    );
  }
}
