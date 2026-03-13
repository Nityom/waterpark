import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

const mutation = mutationGeneric;
const query = queryGeneric;

function buildTicketId(orderId) {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TKT_${orderId.replace(/[^A-Za-z0-9]/g, "").slice(-10)}_${suffix}`;
}

export const getOrderById = query({
  args: {
    orderId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_order_id", (q) => q.eq("order_id", args.orderId))
      .unique();
  },
});

export const createOrder = mutation({
  args: {
    order_id: v.string(),
    customer_name: v.string(),
    email: v.string(),
    phone: v.string(),
    amount: v.number(),
    currency: v.string(),
    order_note: v.string(),
    day_type: v.optional(v.string()),
    ticket_type: v.optional(v.string()),
    quantity: v.optional(v.number()),
    gateway_order_id: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("orders")
      .withIndex("by_order_id", (q) => q.eq("order_id", args.order_id))
      .unique();

    const record = {
      ...args,
      payment_status: existing?.payment_status || "INITIATED",
      order_status: existing?.order_status || "INITIATED",
      ticket_generated: existing?.ticket_generated || false,
      ticket_id: existing?.ticket_id,
      payment_id: existing?.payment_id,
      payment_confirmed_at: existing?.payment_confirmed_at,
      webhook_payload: existing?.webhook_payload,
    };

    if (existing) {
      await ctx.db.patch(existing._id, record);
      return { orderId: existing._id, order_id: args.order_id };
    }

    const orderId = await ctx.db.insert("orders", record);
    return { orderId, order_id: args.order_id };
  },
});

export const updatePaymentStatus = mutation({
  args: {
    order_id: v.string(),
    payment_status: v.string(),
    order_status: v.string(),
    payment_id: v.optional(v.string()),
    payment_confirmed_at: v.optional(v.string()),
    webhook_payload: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("orders")
      .withIndex("by_order_id", (q) => q.eq("order_id", args.order_id))
      .unique();

    if (!existing) {
      throw new Error(`Order not found: ${args.order_id}`);
    }

    await ctx.db.patch(existing._id, {
      payment_status: args.payment_status,
      order_status: args.order_status,
      payment_id: args.payment_id || existing.payment_id,
      payment_confirmed_at:
        args.payment_confirmed_at || existing.payment_confirmed_at,
      webhook_payload: args.webhook_payload || existing.webhook_payload,
    });

    return await ctx.db.get(existing._id);
  },
});

export const generateTicket = mutation({
  args: {
    order_id: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("orders")
      .withIndex("by_order_id", (q) => q.eq("order_id", args.order_id))
      .unique();

    if (!existing) {
      throw new Error(`Order not found: ${args.order_id}`);
    }

    if (existing.ticket_generated && existing.ticket_id) {
      return {
        ticket_id: existing.ticket_id,
        alreadyGenerated: true,
      };
    }

    if (existing.payment_status !== "SUCCESS") {
      throw new Error("Ticket can only be generated for successful payments");
    }

    const ticket_id = buildTicketId(args.order_id);

    await ctx.db.patch(existing._id, {
      ticket_generated: true,
      ticket_id,
      order_status: "TICKET_GENERATED",
      payment_confirmed_at:
        existing.payment_confirmed_at || new Date().toISOString(),
    });

    return {
      ticket_id,
      alreadyGenerated: false,
    };
  },
});
