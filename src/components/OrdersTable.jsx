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

function Pagination({ pagination, query, pageKey }) {
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
        Page {pagination.page} of {pagination.totalPages} · {pagination.totalItems} records
      </p>
      <div className="flex items-center gap-2">
        {pagination.hasPreviousPage ? (
          <Link href={`/admin?${previousQuery}`} scroll={false} className="rounded-full border border-[#D0D5DD] px-4 py-2 font-semibold text-[#344054] transition hover:bg-[#F9FAFB]">
            Previous
          </Link>
        ) : (
          <span className="rounded-full border border-[#EAECF0] px-4 py-2 font-semibold text-[#98A2B3]">Previous</span>
        )}
        {pagination.hasNextPage ? (
          <Link href={`/admin?${nextQuery}`} scroll={false} className="rounded-full border border-[#D0D5DD] px-4 py-2 font-semibold text-[#344054] transition hover:bg-[#F9FAFB]">
            Next
          </Link>
        ) : (
          <span className="rounded-full border border-[#EAECF0] px-4 py-2 font-semibold text-[#98A2B3]">Next</span>
        )}
      </div>
    </div>
  );
}

export default function OrdersTable({ title, description, orders, pagination, paginationKey, paginationQuery, filters, showLunchColumn = false }) {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (orderId) => {
    setExpandedRow(expandedRow === orderId ? null : orderId);
  };

  const parseOrderDetails = (order) => {
    let adults = 0;
    let children = 0;
    const note = order.order_note || "";
    
    const adultsMatch = note.match(/Adults - (\d+)/);
    if (adultsMatch) adults = parseInt(adultsMatch[1], 10);
    
    const childrenMatch = note.match(/Child - (\d+)/);
    if (childrenMatch) children = parseInt(childrenMatch[1], 10);
    
    if (adults === 0 && children === 0 && order.quantity > 0) {
       adults = order.quantity;
    }

    let costumes = order.costumes_quantity || 0;
    let lunch = order.lunch_quantity || 0;
    let locker = order.locker_quantity || 0;

    const costumesMatch = note.match(/Costumes - (\d+)/);
    if (costumesMatch && costumes === 0) costumes = parseInt(costumesMatch[1], 10);

    const lunchMatch = note.match(/Lunch Veg Thali - (\d+)/);
    if (lunchMatch && lunch === 0) lunch = parseInt(lunchMatch[1], 10);

    const lockerMatch = note.match(/Lockers - (\d+)/);
    if (lockerMatch && locker === 0) locker = parseInt(lockerMatch[1], 10);

    return {
      adults,
      children,
      costumes,
      lunch,
      locker,
    };
  };

  return (
    <section className="rounded-[32px] border border-[#D0D5DD] bg-white p-6 shadow-[0_24px_70px_rgba(16,24,40,0.06)]">
      <div>
        <h2 className="text-xl font-extrabold text-[#101828]">{title}</h2>
        <p className="mt-1 text-sm text-[#667085]">{description}</p>
      </div>

      {filters || null}

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-[#EAECF0] text-left">
          <thead>
            <tr className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
              <th className="px-3 py-3">Order</th>
              <th className="px-3 py-3">Customer</th>
              <th className="px-3 py-3">Visit</th>
              <th className="px-3 py-3">Amount</th>
              {showLunchColumn && <th className="px-3 py-3">Lunch</th>}
              <th className="px-3 py-3">Payment</th>
              <th className="px-3 py-3">Ticket</th>
              <th className="px-3 py-3">Redeemed</th>
              <th className="px-3 py-3">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F4F7] text-sm text-[#101828]">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={showLunchColumn ? "9" : "8"} className="px-3 py-8 text-center text-sm text-[#667085]">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const details = parseOrderDetails(order);
                const isExpanded = expandedRow === order.order_id;
                
                return (
                  <React.Fragment key={order.order_id}>
                    <tr 
                      className="cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => toggleRow(order.order_id)}
                    >
                      <td className="px-3 py-4 font-mono text-xs">{order.order_id}</td>
                      <td className="px-3 py-4">
                        <p className="font-semibold">{order.customer_name}</p>
                        <p className="text-xs text-[#667085]">{order.phone}</p>
                      </td>
                      <td className="px-3 py-4">{order.visit_date ? formatShortDate(order.visit_date) : "-"}</td>
                      <td className="px-3 py-4 font-semibold">{formatCurrency(order.amount)}</td>
                      {showLunchColumn && <td className="px-3 py-4 font-semibold">{order.lunch_quantity || 0}</td>}
                      <td className="px-3 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${getPaymentStatusStyle(order.payment_status)}`}>
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-semibold">{order.ticket_generated ? order.ticket_id || "Generated" : "Not Generated"}</p>
                        <p className="text-xs text-[#667085]">{order.order_status}</p>
                      </td>
                      <td className="px-3 py-4">{order.redeemed_at ? formatDateTimeShort(order.redeemed_at) : "No"}</td>
                      <td className="px-3 py-4">{formatDateTimeShort(order.created_at)}</td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan={showLunchColumn ? "9" : "8"} className="p-0 border-b border-[#F2F4F7]">
                          <div className="bg-[#F8FAFC] px-6 py-4">
                            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#475569]">Order Details</h4>
                              <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                                <div className="rounded-xl bg-[#F1F5F9] p-3 text-center">
                                  <p className="text-xs font-medium text-[#64748B]">Adults</p>
                                  <p className="mt-1 text-xl font-bold text-[#0F172A]">{details.adults}</p>
                                </div>
                                <div className="rounded-xl bg-[#F1F5F9] p-3 text-center">
                                  <p className="text-xs font-medium text-[#64748B]">Children</p>
                                  <p className="mt-1 text-xl font-bold text-[#0F172A]">{details.children}</p>
                                </div>
                                <div className="rounded-xl bg-[#F1F5F9] p-3 text-center">
                                  <p className="text-xs font-medium text-[#64748B]">Costumes</p>
                                  <p className="mt-1 text-xl font-bold text-[#0F172A]">{details.costumes}</p>
                                </div>
                                <div className="rounded-xl bg-[#F1F5F9] p-3 text-center">
                                  <p className="text-xs font-medium text-[#64748B]">Lunch Thalis</p>
                                  <p className="mt-1 text-xl font-bold text-[#0F172A]">{details.lunch}</p>
                                </div>
                                <div className="rounded-xl bg-[#F1F5F9] p-3 text-center">
                                  <p className="text-xs font-medium text-[#64748B]">Lockers</p>
                                  <p className="mt-1 text-xl font-bold text-[#0F172A]">{details.locker}</p>
                                </div>
                              </div>
                              {order.order_note && (
                                <div className="mt-4 border-t border-[#E2E8F0] pt-3">
                                  <p className="text-xs font-medium text-[#64748B]">Order Note</p>
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
