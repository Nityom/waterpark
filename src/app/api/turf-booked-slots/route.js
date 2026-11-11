import { createConvexClient } from "../../../lib/convex";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      return Response.json({ bookedSlots: [] });
    }

    const convex = createConvexClient();
    const booked = await convex.query("orders:getBookedTurfSlots", {
      visitDate: date,
    });

    return Response.json({
      success: true,
      bookedSlots: booked || [],
    });
  } catch (error) {
    console.error("Error fetching booked turf slots:", error);
    return Response.json({ success: false, bookedSlots: [] });
  }
}

