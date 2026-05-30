import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

const mutation = mutationGeneric;
const query = queryGeneric;
const ADMIN_PAGE_SIZE = 10;
const INDIA_TIME_ZONE = "Asia/Kolkata";
const INDIA_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const indiaDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: INDIA_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function buildTicketId(orderId) {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TKT_${orderId.replace(/[^A-Za-z0-9]/g, "").slice(-10)}_${suffix}`;
}

function parseDateOnly(value) {
  const [year, month, day] = String(value || "").split("-").map(Number);
  const date = new Date(Date.UTC(year, (month || 1) - 1, day || 1));
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateOnly(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayInIndia() {
  return indiaDateFormatter.format(new Date());
}

function toIndiaDayStart(dateOnly) {
  return new Date(dateOnly.getTime() - INDIA_OFFSET_MS);
}

function getIndiaDateKey(value) {
  return indiaDateFormatter.format(new Date(value));
}

function formatShortDate(value) {
  const date = parseDateOnly(value);

  if (!date) {
    return "";
  }

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = String(date.getUTCFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}

function formatDateTimeShort(value) {
  if (!value) {
    return "";
  }

  const date = typeof value === "number" ? new Date(value) : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value])
  );

  return `${values.day}-${values.month}-${values.year} ${values.hour}:${values.minute}`;
}

function buildRange(filterType, referenceDate, fromDate, toDate) {
  if (filterType === "all") {
    return {
      start: new Date(0),
      end: new Date(8640000000000000),
      label: "All time",
    };
  }

  if (fromDate || toDate) {
    const from = parseDateOnly(fromDate || toDate);
    const to = parseDateOnly(toDate || fromDate);

    if (from && to) {
      const start = from <= to ? from : to;
      const endBase = from <= to ? to : from;
      const endExclusive = new Date(endBase);
      endExclusive.setUTCDate(endExclusive.getUTCDate() + 1);

      return {
        start: toIndiaDayStart(start),
        end: toIndiaDayStart(endExclusive),
        label: `${formatDateOnly(start)} to ${formatDateOnly(endBase)}`,
      };
    }
  }

  const safeReference = referenceDate || getTodayInIndia();
  const base = parseDateOnly(safeReference);

  if (!base) {
    return buildRange(filterType, getTodayInIndia());
  }

  let startDate = new Date(base);
  let endExclusiveDate = new Date(base);

  if (filterType === "week") {
    const weekday = startDate.getUTCDay();
    const diffToMonday = weekday === 0 ? -6 : 1 - weekday;
    startDate.setUTCDate(startDate.getUTCDate() + diffToMonday);
    endExclusiveDate = new Date(startDate);
    endExclusiveDate.setUTCDate(endExclusiveDate.getUTCDate() + 7);
  } else if (filterType === "month") {
    startDate = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), 1));
    endExclusiveDate = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth() + 1, 1));
  } else if (filterType === "year") {
    startDate = new Date(Date.UTC(base.getUTCFullYear(), 0, 1));
    endExclusiveDate = new Date(Date.UTC(base.getUTCFullYear() + 1, 0, 1));
  } else {
    endExclusiveDate.setUTCDate(endExclusiveDate.getUTCDate() + 1);
  }

  return {
    start: toIndiaDayStart(startDate),
    end: toIndiaDayStart(endExclusiveDate),
    label: safeReference,
  };
}

function getOrderTime(order) {
  const source = order.payment_confirmed_at || order._creationTime;

  if (typeof source === "number") {
    return source;
  }

  const parsed = Date.parse(source);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function normalizeSearchTerm(value) {
  return String(value || "").trim().toLowerCase();
}

function isSuccessfulPayment(order) {
  return String(order?.payment_status || "").toUpperCase() === "SUCCESS";
}

function buildChartSeries(filteredOrders) {
  const buckets = new Map();

  for (const order of filteredOrders) {
    const key = getIndiaDateKey(getOrderTime(order));
    const current = buckets.get(key) || {
      orders: 0,
      revenue: 0,
      redeemed: 0,
    };

    current.orders += 1;
    if (isSuccessfulPayment(order)) {
      current.revenue += Number(order.amount || 0);
    }
    current.redeemed += order.redeemed_at ? 1 : 0;
    buckets.set(key, current);
  }

  const labels = Array.from(buckets.keys()).sort();

  return {
    labels,
    orders: labels.map((label) => buckets.get(label)?.orders || 0),
    revenue: labels.map((label) => buckets.get(label)?.revenue || 0),
    redeemed: labels.map((label) => buckets.get(label)?.redeemed || 0),
  };
}

function matchesSearch(order, searchTerm) {
  if (!searchTerm) {
    return true;
  }

  const createdAt = order.payment_confirmed_at || order._creationTime;
  const haystack = [
    order.order_id,
    order.customer_name,
    order.email,
    order.phone,
    order.visit_date,
    formatShortDate(order.visit_date),
    order.ticket_id,
    order.payment_status,
    order.order_status,
    formatDateTimeShort(createdAt),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(searchTerm);
}

function mapOrderForAdmin(order) {
  return {
    order_id: order.order_id,
    customer_name: order.customer_name,
    phone: order.phone,
    amount: order.amount,
    payment_status: order.payment_status,
    order_status: order.order_status,
    visit_date: order.visit_date || null,
    ticket_id: order.ticket_id || null,
    ticket_generated: order.ticket_generated,
    redeemed_at: order.redeemed_at || null,
    created_at: order.payment_confirmed_at || order._creationTime,
    lunch_quantity: order.lunch_quantity || 0,
    quantity: order.quantity || 0,
    costumes_quantity: order.costumes_quantity || 0,
    locker_quantity: order.locker_quantity || 0,
    order_note: order.order_note || "",
    email: order.email || "",
  };
}

function paginate(items, page) {
  const safePage = Number.isInteger(page) && page > 0 ? page : 1;
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ADMIN_PAGE_SIZE));
  const currentPage = Math.min(safePage, totalPages);
  const startIndex = (currentPage - 1) * ADMIN_PAGE_SIZE;

  return {
    items: items.slice(startIndex, startIndex + ADMIN_PAGE_SIZE),
    pagination: {
      page: currentPage,
      totalPages,
      totalItems,
      pageSize: ADMIN_PAGE_SIZE,
      hasPreviousPage: currentPage > 1,
      hasNextPage: currentPage < totalPages,
    },
  };
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

export const getAdminDashboardData = query({
  args: {
    filterType: v.union(
      v.literal("all"),
      v.literal("date"),
      v.literal("week"),
      v.literal("month"),
      v.literal("year")
    ),
    referenceDate: v.string(),
    fromDate: v.optional(v.string()),
    toDate: v.optional(v.string()),
    searchTerm: v.optional(v.string()),
    visitDate: v.optional(v.string()),
    visitorsSearchTerm: v.optional(v.string()),
    recentPage: v.optional(v.number()),
    ticketsPage: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const orders = await ctx.db.query("orders").collect();
    const { start, end, label } = buildRange(
      args.filterType,
      args.referenceDate,
      args.fromDate,
      args.toDate
    );

    const searchTerm = normalizeSearchTerm(args.searchTerm);
    const visitorsSearchTerm = normalizeSearchTerm(args.visitorsSearchTerm);
    const selectedVisitDate = args.visitDate || args.referenceDate;

    const filteredOrders = orders
      .filter((order) => {
        const orderTime = getOrderTime(order);
        return orderTime >= start.getTime() && orderTime < end.getTime();
      })
      .filter((order) => matchesSearch(order, searchTerm))
      .sort((a, b) => getOrderTime(b) - getOrderTime(a));

    const summary = filteredOrders.reduce(
      (accumulator, order) => {
        accumulator.totalOrders += 1;
        if (isSuccessfulPayment(order)) {
          accumulator.totalRevenue += Number(order.amount || 0);
        }

        if (order.payment_status === "SUCCESS") {
          accumulator.successfulPayments += 1;
        }
        if (order.payment_status === "PENDING" || order.payment_status === "INITIATED") {
          accumulator.pendingPayments += 1;
        }
        if (order.payment_status === "FAILED") {
          accumulator.failedPayments += 1;
        }
        if (order.payment_status === "USER_DROPPED") {
          accumulator.cancelledPayments += 1;
        }
        if (order.ticket_generated) {
          accumulator.ticketsGenerated += 1;
        }
        if (order.redeemed_at) {
          accumulator.redeemedTickets += 1;
        }

        return accumulator;
      },
      {
        totalOrders: 0,
        totalRevenue: 0,
        successfulPayments: 0,
        pendingPayments: 0,
        failedPayments: 0,
        cancelledPayments: 0,
        ticketsGenerated: 0,
        redeemedTickets: 0,
      }
    );

    // Calculate lunch count for selected visit date (successful payments only)
    const lunchCountForSelectedDate = orders
      .filter((order) => order.visit_date === selectedVisitDate && order.payment_status === "SUCCESS")
      .reduce((total, order) => total + (Number(order.lunch_quantity) || 0), 0);

    const charts = buildChartSeries(filteredOrders);

    const ticketsForSelectedDate = orders
      .filter((order) => order.visit_date === selectedVisitDate)
      .filter((order) => matchesSearch(order, visitorsSearchTerm))
      .sort((a, b) => getOrderTime(a) - getOrderTime(b))
      .map(mapOrderForAdmin);

    const allOrders = orders
      .filter((order) => matchesSearch(order, searchTerm))
      .sort((a, b) => getOrderTime(b) - getOrderTime(a))
      .map(mapOrderForAdmin);

    const paginatedTickets = paginate(ticketsForSelectedDate, Math.trunc(args.ticketsPage || 1));
    const paginatedAllOrders = paginate(allOrders, Math.trunc(args.recentPage || 1));

    return {
      filterType: args.filterType,
      referenceDate: label,
      selectedVisitDate,
      searchTerm: args.searchTerm || "",
      visitorsSearchTerm: args.visitorsSearchTerm || "",
      summary: { ...summary, lunchCountForSelectedDate },
      charts,
      selectedVisitDateTickets: paginatedTickets.items,
      selectedVisitDateTicketsPagination: paginatedTickets.pagination,
      allOrders: paginatedAllOrders.items,
      allOrdersPagination: paginatedAllOrders.pagination,
    };
  },
});

export const createOrder = mutation({
  args: {
    order_id: v.string(),
    customer_name: v.string(),
    email: v.string(),
    phone: v.string(),
    amount: v.number(),
    base_amount: v.optional(v.number()),
    convenience_charge: v.optional(v.number()),
    currency: v.string(),
    order_note: v.string(),
    visit_date: v.string(),
    day_type: v.optional(v.string()),
    ticket_type: v.optional(v.string()),
    quantity: v.optional(v.number()),
    costumes_quantity: v.optional(v.number()),
    locker_quantity: v.optional(v.number()),
    lunch_quantity: v.optional(v.number()),
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
      redeemed_at: existing?.redeemed_at,
      redeemed_by_name: existing?.redeemed_by_name,
      redeemed_by_phone: existing?.redeemed_by_phone,
      redeemed_by_email: existing?.redeemed_by_email,
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

export const redeemTicket = mutation({
  args: {
    order_id: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    customerEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("orders")
      .withIndex("by_order_id", (q) => q.eq("order_id", args.order_id))
      .unique();

    if (!existing) {
      throw new Error(`Order not found: ${args.order_id}`);
    }

    if (!existing.ticket_generated || !existing.ticket_id) {
      throw new Error("Only generated tickets can be redeemed");
    }

    if (existing.redeemed_at) {
      return {
        alreadyRedeemed: true,
        redeemedAt: existing.redeemed_at,
      };
    }

    const redeemedAt = new Date().toISOString();

    await ctx.db.patch(existing._id, {
      redeemed_at: redeemedAt,
      redeemed_by_name: args.customerName,
      redeemed_by_phone: args.customerPhone,
      redeemed_by_email: args.customerEmail,
    });

    return {
      alreadyRedeemed: false,
      redeemedAt,
    };
  },
});

