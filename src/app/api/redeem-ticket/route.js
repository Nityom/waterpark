import { createConvexClient } from "../../../lib/convex";
import { getTicketDetails } from "../../../lib/ticketUtils";

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

    const convex = createConvexClient();
    const result = await convex.mutation("orders:redeemTicket", {
      order_id: orderId,
      customerName: ticket.customerName,
      customerPhone: ticket.customerPhone,
      customerEmail: ticket.customerEmail,
    });

    if (result.alreadyRedeemed) {
      return Response.json(
        {
          success: false,
          alreadyRedeemed: true,
          redeemedAt: result.redeemedAt,
          error: "Ticket has already been redeemed.",
        },
        { status: 409 }
      );
    }

    return Response.json({
      success: true,
      alreadyRedeemed: false,
      redeemedAt: result.redeemedAt,
    });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Could not redeem ticket" },
      { status: 500 }
    );
  }
}
