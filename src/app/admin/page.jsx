import Link from "next/link";
import { cookies } from "next/headers";
import AdminCharts from "../../components/AdminCharts";
import AdminLoginForm from "../../components/AdminLoginForm";
import AdminLogoutButton from "../../components/AdminLogoutButton";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_VALUE } from "../../lib/adminAuth";
import { createConvexClient } from "../../lib/convex";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatDateTime(value) {
  if (!value) {
    return "-";
  }

  const date = typeof value === "number" ? new Date(value) : new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleString("en-IN");
}

/* ---------------- PAYMENT STATUS COLORS ---------------- */

function getPaymentStatusStyle(status) {
  const s = (status || "").toLowerCase();

  if (s === "success" || s === "successful" || s === "paid") {
    return "bg-green-100 text-green-700 border border-green-200";
  }

  if (s === "failed") {
    return "bg-red-100 text-red-700 border border-red-200";
  }

  if (s === "cancelled" || s === "canceled") {
    return "bg-blue-100 text-blue-700 border border-blue-200";
  }

  if (s === "pending") {
    return "bg-yellow-100 text-yellow-700 border border-yellow-200";
  }
    if (s === "user_dropped") {
    return "bg-blue-100 text-blue-700 border border-blue-200";
  }

  return "bg-gray-100 text-gray-700 border border-gray-200";
}

/* ---------------- METRIC CARD ---------------- */

function MetricCard({ label, value, tone = "default" }) {
  const toneMap = {
    default: "bg-white text-[#101828] border-[#E4E7EC]",
    success: "bg-[#ECFDF3] text-[#175C42] border-[#A6F4C5]",
    warning: "bg-[#FFF7E6] text-[#B54708] border-[#FEDF89]",
    danger: "bg-[#FEF3F2] text-[#B42318] border-[#FECDCA]",
  };

  return (
    <div className={`rounded-[24px] border p-5 shadow-sm ${toneMap[tone] || toneMap.default}`}>
      <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-80">{label}</p>
      <p className="mt-3 text-3xl font-extrabold">{value}</p>
    </div>
  );
}

/* ---------------- FILTER BAR ---------------- */

function FilterBar({ filterType, referenceDate, fromDate, toDate }) {
  const filterOptions = [
    { label: "Date", value: "date" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ];

  return (
    <form className="flex flex-wrap items-end gap-3 rounded-[28px] border border-[#D0D5DD] bg-white p-5 shadow-sm">
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
          Filter
        </label>
        <select
          name="filter"
          defaultValue={filterType}
          className="rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
          Reference Date
        </label>
        <input
          type="date"
          name="date"
          defaultValue={referenceDate}
          className="rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
          From Date
        </label>
        <input
          type="date"
          name="from"
          defaultValue={fromDate}
          className="rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
          To Date
        </label>
        <input
          type="date"
          name="to"
          defaultValue={toDate}
          className="rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]"
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-[#175C42] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#104A35]"
      >
        Apply Filter
      </button>
    </form>
  );
}

/* ---------------- ADMIN PAGE ---------------- */

export default async function AdminPage({ searchParams }) {
  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get(ADMIN_COOKIE_NAME)?.value === ADMIN_COOKIE_VALUE;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#F3F7F5_0%,#FFFFFF_45%,#F7FAFC_100%)] px-4 py-12">
        <div className="mx-auto max-w-md rounded-[32px] border border-[#D0D5DD] bg-white p-8 shadow-[0_24px_70px_rgba(16,24,40,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#175C42]">
            Waves Admin
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-[#101828]">
            Admin Login
          </h1>

          <div className="mt-8">
            <AdminLoginForm />
          </div>

          <Link
            href="/"
            className="mt-5 inline-flex text-sm font-semibold text-[#175C42]"
          >
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  const resolvedSearchParams = await searchParams;
  const filterType = ["date", "week", "month", "year"].includes(
    resolvedSearchParams?.filter
  )
    ? resolvedSearchParams.filter
    : "date";

  const referenceDate =
    resolvedSearchParams?.date || new Date().toISOString().slice(0, 10);

  const fromDate = resolvedSearchParams?.from || "";
  const toDate = resolvedSearchParams?.to || "";

  const convex = createConvexClient();

  const dashboard = await convex.query("orders:getAdminDashboardData", {
    filterType,
    referenceDate,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F3F7F5_0%,#FFFFFF_45%,#F7FAFC_100%)] px-4 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-6">

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#175C42]">
              Waves Admin
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-[#101828] md:text-5xl">
              Booking Dashboard
            </h1>
          </div>
          <AdminLogoutButton />
        </div>

        <FilterBar
          filterType={filterType}
          referenceDate={referenceDate}
          fromDate={fromDate}
          toDate={toDate}
        />

        <AdminCharts summary={dashboard.summary} charts={dashboard.charts} />

        {/* ---------------- RECENT ORDERS ---------------- */}

        <section className="rounded-[32px] border border-[#D0D5DD] bg-white p-6 shadow-[0_24px_70px_rgba(16,24,40,0.06)]">

          <h2 className="text-xl font-extrabold text-[#101828]">
            Recent Orders
          </h2>

          <div className="mt-6 overflow-x-auto">

            <table className="min-w-full divide-y divide-[#EAECF0] text-left">

              <thead>
                <tr className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">
                  <th className="px-3 py-3">Order</th>
                  <th className="px-3 py-3">Customer</th>
                  <th className="px-3 py-3">Visit</th>
                  <th className="px-3 py-3">Amount</th>
                  <th className="px-3 py-3">Payment</th>
                  <th className="px-3 py-3">Ticket</th>
                  <th className="px-3 py-3">Redeemed</th>
                  <th className="px-3 py-3">Created</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F2F4F7] text-sm text-[#101828]">

                {dashboard.recentOrders.map((order) => (
                  <tr key={order.order_id}>

                    <td className="px-3 py-4 font-mono text-xs">
                      {order.order_id}
                    </td>

                    <td className="px-3 py-4">
                      <p className="font-semibold">{order.customer_name}</p>
                      <p className="text-xs text-[#667085]">{order.phone}</p>
                    </td>

                    <td className="px-3 py-4">{order.visit_date || "-"}</td>

                    <td className="px-3 py-4 font-semibold">
                      {formatCurrency(order.amount)}
                    </td>

                    {/* PAYMENT STATUS WITH COLORS */}

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
                        {order.ticket_generated
                          ? order.ticket_id || "Generated"
                          : "Not Generated"}
                      </p>
                      <p className="text-xs text-[#667085]">
                        {order.order_status}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      {order.redeemed_at
                        ? formatDateTime(order.redeemed_at)
                        : "No"}
                    </td>

                    <td className="px-3 py-4">
                      {formatDateTime(order.created_at)}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </section>

      </div>
    </main>
  );
}