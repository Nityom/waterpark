import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    order_id: v.string(),
    customer_name: v.string(),
    email: v.string(),
    phone: v.string(),
    amount: v.number(),
    currency: v.string(),
    order_note: v.string(),
    visit_date: v.optional(v.string()),
    payment_status: v.string(),
    order_status: v.string(),
    ticket_generated: v.boolean(),
    ticket_id: v.optional(v.string()),
    gateway_order_id: v.optional(v.string()),
    payment_id: v.optional(v.string()),
    payment_confirmed_at: v.optional(v.string()),
    redeemed_at: v.optional(v.string()),
    redeemed_by_name: v.optional(v.string()),
    redeemed_by_phone: v.optional(v.string()),
    redeemed_by_email: v.optional(v.string()),
    day_type: v.optional(v.string()),
    ticket_type: v.optional(v.string()),
    quantity: v.optional(v.number()),
    costumes_quantity: v.optional(v.number()),
    locker_quantity: v.optional(v.number()),
    lunch_quantity: v.optional(v.number()),
    webhook_payload: v.optional(v.any()),
  })
    .index("by_order_id", ["order_id"])
    .index("by_ticket_id", ["ticket_id"]),
});
