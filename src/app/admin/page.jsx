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

export default async function AdminPage({ searchParams }) {
  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get(ADMIN_COOKIE_NAME)?.value === ADMIN_COOKIE_VALUE;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#F3F7F5_0%,#FFFFFF_45%,#F7FAFC_100%)] px-4 py-12">
        <div className="mx-auto max-w-md rounded-[32px] border border-[#D0D5DD] bg-white p-8 shadow-[0_24px_70px_rgba(16,24,40,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#175C42]">Waves Admin</p>
          <h1 className="mt-3 text-3xl font-extrabold text-[#101828]">Admin Login</h1>
          <p className="mt-2 text-sm text-[#667085]">
            Sign in to view booking overview, payment status, ticket redemption stats, and charts.
          </p>
          <div className="mt-8">
            <AdminLoginForm />
          </div>
          <Link href="/" className="mt-5 inline-flex text-sm font-semibold text-[#175C42]">
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  const resolvedSearchParams = await searchParams;
  const filterType = ["date", "week", "month", "year"].includes(resolvedSearchParams?.filter)
    ? resolvedSearchParams.filter
    : "date";
  const referenceDate = resolvedSearchParams?.date || new Date().toISOString().slice(0, 10);
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
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#175C42]">Waves Admin</p>
            <h1 className="mt-2 text-3xl font-extrabold text-[#101828] md:text-5xl">Booking Dashboard</h1>
            <p className="mt-3 max-w-2xl text-sm text-[#667085] md:text-base">
              Live booking overview from Convex for {dashboard.referenceDate}.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <FilterBar
          filterType={filterType}
          referenceDate={referenceDate}
          fromDate={fromDate}
          toDate={toDate}
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total Orders" value={dashboard.summary.totalOrders} />
          <MetricCard label="Revenue" value={formatCurrency(dashboard.summary.totalRevenue)} tone="success" />
          <MetricCard label="Tickets Generated" value={dashboard.summary.ticketsGenerated} />
          <MetricCard label="Redeemed Tickets" value={dashboard.summary.redeemedTickets} tone="warning" />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Successful Payments" value={dashboard.summary.successfulPayments} tone="success" />
          <MetricCard label="Pending Payments" value={dashboard.summary.pendingPayments} tone="warning" />
          <MetricCard label="Failed Payments" value={dashboard.summary.failedPayments} tone="danger" />
          <MetricCard label="Cancelled Payments" value={dashboard.summary.cancelledPayments} tone="default" />
        </section>

        <AdminCharts summary={dashboard.summary} charts={dashboard.charts} />

        <section className="rounded-[32px] border border-[#D0D5DD] bg-white p-6 shadow-[0_24px_70px_rgba(16,24,40,0.06)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-[#101828]">Recent Orders</h2>
              <p className="mt-1 text-sm text-[#667085]">
                Latest orders in the selected filter window.
              </p>
            </div>
          </div>

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
                {dashboard.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-3 py-8 text-center text-sm text-[#667085]">
                      No orders found for this filter.
                    </td>
                  </tr>
                ) : (
                  dashboard.recentOrders.map((order) => (
                    <tr key={order.order_id}>
                      <td className="px-3 py-4 font-mono text-xs">{order.order_id}</td>
                      <td className="px-3 py-4">
                        <p className="font-semibold">{order.customer_name}</p>
                        <p className="text-xs text-[#667085]">{order.phone}</p>
                      </td>
                      <td className="px-3 py-4">{order.visit_date || "-"}</td>
                      <td className="px-3 py-4 font-semibold">{formatCurrency(order.amount)}</td>
                      <td className="px-3 py-4">
                        <span className="rounded-full bg-[#F2F4F7] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#344054]">
                          {order.payment_status}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <p className="font-semibold">{order.ticket_generated ? order.ticket_id || "Generated" : "Not Generated"}</p>
                        <p className="text-xs text-[#667085]">{order.order_status}</p>
                      </td>
                      <td className="px-3 py-4">{order.redeemed_at ? formatDateTime(order.redeemed_at) : "No"}</td>
                      <td className="px-3 py-4">{formatDateTime(order.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
