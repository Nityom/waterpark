"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatDateTimeShort, formatShortDate } from "../lib/dateFormat";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function getPaymentStatusStyle(status) {
  const s = (status || "").toLowerCase();

  if (s === "success" || s === "successful" || s === "paid") {
    return "bg-green-100 text-green-700 border border-green-200";
  }

  if (s === "failed") {
    return "bg-red-100 text-red-700 border border-red-200";
  }

  if (s === "cancelled" || s === "canceled" || s === "user_dropped") {
    return "bg-blue-100 text-blue-700 border border-blue-200";
  }

  if (s === "pending" || s === "initiated") {
    return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  }

  return "bg-gray-100 text-gray-700 border border-gray-200";
}

function buildQueryString(entries) {
  const params = new URLSearchParams();

  Object.entries(entries).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

function Pagination({ pagination, query, pageKey = "turfPage" }) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const previousQuery = buildQueryString({
    ...query,
    [pageKey]: pagination.page - 1,
  });
  const nextQuery = buildQueryString({
    ...query,
    [pageKey]: pagination.page + 1,
  });

  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#EAECF0] pt-4 text-sm text-[#667085]">
      <p>
        Page {pagination.page} of {pagination.totalPages} · {pagination.totalItems} turf bookings
      </p>
      <div className="flex items-center gap-2">
        {pagination.hasPreviousPage ? (
          <Link
            href={`/admin?${previousQuery}`}
            scroll={false}
            className="rounded-full border border-[#D0D5DD] px-4 py-2 font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-full border border-[#EAECF0] px-4 py-2 font-semibold text-[#98A2B3]">
            Previous
          </span>
        )}
        {pagination.hasNextPage ? (
          <Link
            href={`/admin?${nextQuery}`}
            scroll={false}
            className="rounded-full border border-[#D0D5DD] px-4 py-2 font-semibold text-[#344054] transition hover:bg-[#F9FAFB]"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-full border border-[#EAECF0] px-4 py-2 font-semibold text-[#98A2B3]">
            Next
          </span>
        )}
      </div>
    </div>
  );
}

export default function TurfOrdersTable({
  title = "🏏 Cricket Playground Turf Bookings",
  description = "All cricket turf reservations with slot timing, hours, payment status, and player details.",
  orders = [],
  pagination,
  paginationKey = "turfPage",
  paginationQuery = {},
  filters,
}) {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (orderId) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  const extractSlotInfo = (order) => {
    if (order.turf_slot) return order.turf_slot;
    const note = order.order_note || "";
    const slotMatch = note.match(/\((.*?)\)/);
    return slotMatch ? slotMatch[1] : "Slot Confirmed";
  };

  const extractHours = (order) => {
    if (order.turf_hours) return order.turf_hours;
    const note = order.order_note || "";
    const hrMatch = note.match(/(\d+)\s*hr/i);
    return hrMatch ? parseInt(hrMatch[1], 10) : order.quantity || 1;
  };

  return (
    <section className="rounded-[32px] border border-[#C6DCB8] bg-white p-6 shadow-[0_24px_70px_rgba(16,24,40,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-bold text-[#175C42] mb-2">
            <span>🏏</span> Turf Arena Management
          </div>
          <h2 className="text-xl font-extrabold text-[#101828]">{title}</h2>
          <p className="mt-1 text-sm text-[#667085]">{description}</p>
        </div>
        <div className="rounded-2xl bg-[#F4F9F2] border border-[#D5EAD0] px-4 py-2 text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-[#175C42]">Rate</p>
          <p className="text-base font-extrabold text-[#101828]">₹499 / hour</p>
        </div>
      </div>

      {filters || null}

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-[#EAECF0] text-left">
          <thead>
            <tr className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
              <th className="px-3 py-3">Order ID</th>
              <th className="px-3 py-3">Player / Captain</th>
              <th className="px-3 py-3">Match Date</th>
              <th className="px-3 py-3">Slot Timing</th>
              <th className="px-3 py-3">Hours</th>
              <th className="px-3 py-3">Amount</th>
              <th className="px-3 py-3">Payment</th>
              <th className="px-3 py-3">Ticket</th>
              <th className="px-3 py-3">Redeemed</th>
              <th className="px-3 py-3">Booked At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F4F7] text-sm text-[#101828]">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="10" className="px-3 py-8 text-center text-sm text-[#667085]">
                  No cricket turf bookings found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isExpanded = expandedRow === order.order_id;
                const slot = extractSlotInfo(order);
                const hours = extractHours(order);

                return (
                  <React.Fragment key={order.order_id}>
                    <tr
                      className="cursor-pointer transition-colors hover:bg-emerald-50/50"
                      onClick={() => toggleRow(order.order_id)}
                    >
                      <td className="px-3 py-4 font-mono text-xs font-medium text-gray-800">
                        {order.order_id}
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-semibold text-[#101828]">{order.customer_name}</p>
                        <p className="text-xs text-[#667085]">{order.phone}</p>
                      </td>
                      <td className="px-3 py-4 font-semibold">
                        {order.visit_date ? formatShortDate(order.visit_date) : "-"}
                      </td>
                      <td className="px-3 py-4">
                        <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                          {slot}
                        </span>
                      </td>
                      <td className="px-3 py-4 font-semibold text-center">
                        {hours} hr{hours > 1 ? "s" : ""}
                      </td>
                      <td className="px-3 py-4 font-semibold text-[#175C42]">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="px-3 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${getPaymentStatusStyle(
                            order.payment_status
                          )}`}
                        >
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-semibold">
                          {order.ticket_generated ? order.ticket_id || "Generated" : "Not Generated"}
                        </p>
                        <p className="text-xs text-[#667085]">{order.order_status}</p>
                      </td>
                      <td className="px-3 py-4">
                        {order.redeemed_at ? (
                          <span className="text-xs font-bold text-green-700">
                            {formatDateTimeShort(order.redeemed_at)}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">No</span>
                        )}
                      </td>
                      <td className="px-3 py-4 text-xs text-[#667085]">
                        {formatDateTimeShort(order.created_at)}
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan="10" className="p-0 border-b border-[#F2F4F7]">
                          <div className="bg-[#F6FAF5] px-6 py-4">
                            <div className="rounded-2xl border border-[#D5EAD0] bg-white p-5 shadow-sm">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-bold uppercase tracking-wider text-[#175C42]">
                                  🏏 Turf Match & Player Details
                                </h4>
                                <a
                                  href={`/verify-ticket?order_id=${encodeURIComponent(order.order_id)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-bold text-[#175C42] underline hover:text-emerald-700"
                                >
                                  Open Live Ticket Verification →
                                </a>
                              </div>
                              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="rounded-xl bg-[#F3F8F2] p-3 text-center">
                                  <p className="text-xs font-medium text-[#64748B]">Duration</p>
                                  <p className="mt-1 text-lg font-bold text-[#101828]">
                                    {hours} Hour{hours > 1 ? "s" : ""}
                                  </p>
                                </div>
                                <div className="rounded-xl bg-[#F3F8F2] p-3 text-center">
                                  <p className="text-xs font-medium text-[#64748B]">Time Slot</p>
                                  <p className="mt-1 text-sm font-bold text-[#101828]">{slot}</p>
                                </div>
                                <div className="rounded-xl bg-[#F3F8F2] p-3 text-center">
                                  <p className="text-xs font-medium text-[#64748B]">Customer Email</p>
                                  <p className="mt-1 text-xs font-semibold text-[#101828] break-all">
                                    {order.email || "Not provided"}
                                  </p>
                                </div>
                                <div className="rounded-xl bg-[#F3F8F2] p-3 text-center">
                                  <p className="text-xs font-medium text-[#64748B]">Ticket Status</p>
                                  <p className="mt-1 text-sm font-bold text-[#175C42]">
                                    {order.redeemed_at ? "Redeemed at Turf" : order.ticket_generated ? "Valid for Match" : "Pending"}
                                  </p>
                                </div>
                              </div>
                              {order.order_note && (
                                <div className="mt-4 border-t border-[#E2E8F0] pt-3">
                                  <p className="text-xs font-medium text-[#64748B]">Booking Note</p>
                                  <p className="mt-1 text-sm text-[#334155]">{order.order_note}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} query={paginationQuery} pageKey={paginationKey} />
    </section>
  );
}

