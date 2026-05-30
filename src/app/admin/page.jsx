import Link from "next/link";
import { cookies } from "next/headers";
import AdminCharts from "../../components/AdminCharts";
import AdminFilterForm from "../../components/AdminFilterForm";
import AdminLoginForm from "../../components/AdminLoginForm";
import AdminLogoutButton from "../../components/AdminLogoutButton";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_VALUE } from "../../lib/adminAuth";
import { getTodayInIndia } from "../../lib/bookingTime";
import { createConvexClient } from "../../lib/convex";
import { formatDateRangeLabel, formatDateTimeShort, formatShortDate } from "../../lib/dateFormat";
import OrdersTable from "../../components/OrdersTable";

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

function buildQueryString(entries) {
  const params = new URLSearchParams();

  Object.entries(entries).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return params.toString();
}



function OverviewFilterBar({ filterType, referenceDate, fromDate, toDate, visitDate, visitorsSearchTerm }) {
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Date", value: "date" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ];
  const allQuery = buildQueryString({
    filter: "all",
    visitDate,
    visitorsSearch: visitorsSearchTerm,
  });
  const allHref = allQuery ? `/admin?${allQuery}` : "/admin";
  const allButtonClassName = filterType === "all"
    ? "rounded-full border border-[#175C42] bg-[#ECFDF3] px-5 py-3 text-sm font-bold text-[#175C42]"
    : "rounded-full border border-[#D0D5DD] bg-white px-5 py-3 text-sm font-bold text-[#344054] transition hover:bg-[#F9FAFB]";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">Quick Filter</span>
        <Link href={allHref} scroll={false} className={allButtonClassName}>
          All
        </Link>
      </div>

      <AdminFilterForm
        className="flex flex-wrap items-end gap-3 rounded-[28px] border border-[#D0D5DD] bg-white p-5 shadow-sm"
        hiddenFields={{ visitDate, visitorsSearch: visitorsSearchTerm }}
        fields={[
          {
            type: "select",
            name: "filter",
            label: "Filter",
            options: filterOptions,
            defaultValue: filterType,
            labelClassName: "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#667085]",
            inputClassName: "rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]",
          },
          {
            type: "date",
            name: "date",
            label: "Reference Date",
            defaultValue: referenceDate,
            labelClassName: "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#667085]",
            inputClassName: "rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]",
          },
          {
            type: "date",
            name: "from",
            label: "From Date",
            defaultValue: fromDate,
            labelClassName: "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#667085]",
            inputClassName: "rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]",
          },
          {
            type: "date",
            name: "to",
            label: "To Date",
            defaultValue: toDate,
            labelClassName: "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#667085]",
            inputClassName: "rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]",
          },
        ]}
        submitLabel="Apply Filter"
        pendingLabel="Applying..."
      />
    </div>
  );
}

function TicketsFilterBar({ visitDate, visitorsSearchTerm, query }) {
  return (
    <AdminFilterForm
      className="mt-5 flex flex-wrap items-end gap-3 rounded-[24px] border border-[#EAECF0] bg-[#F8FAFC] p-4"
      hiddenFields={{
        filter: query.filterType,
        date: query.referenceDate,
        from: query.fromDate,
        to: query.toDate,
        search: query.searchTerm,
      }}
      fields={[
        {
          type: "date",
          name: "visitDate",
          label: "Visit Date",
          defaultValue: visitDate,
          labelClassName: "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#667085]",
          inputClassName: "rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]",
        },
        {
          type: "text",
          name: "visitorsSearch",
          label: "Customer Search",
          defaultValue: visitorsSearchTerm,
          placeholder: "Search by name, number, or date",
          wrapperClassName: "min-w-[240px] flex-1",
          labelClassName: "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#667085]",
          inputClassName: "w-full rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]",
        },
      ]}
      submitLabel="Show Customers"
      pendingLabel="Loading..."
    />
  );
}

function AllOrdersFilterBar({ query }) {
  return (
    <AdminFilterForm
      className="mt-5 flex flex-wrap items-end gap-3 rounded-[24px] border border-[#EAECF0] bg-[#F8FAFC] p-4"
      hiddenFields={{
        filter: query.filterType,
        date: query.referenceDate,
        from: query.fromDate,
        to: query.toDate,
        visitDate: query.visitDate,
        visitorsSearch: query.visitorsSearchTerm,
      }}
      fields={[
        {
          type: "text",
          name: "search",
          label: "Search All Orders",
          defaultValue: query.searchTerm,
          placeholder: "Search by name, number, order id, or date",
          wrapperClassName: "min-w-[280px] flex-1",
          labelClassName: "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#667085]",
          inputClassName: "w-full rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]",
        },
      ]}
      submitLabel="Search Orders"
      pendingLabel="Searching..."
    />
  );
}

export default async function AdminPage({ searchParams }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get(ADMIN_COOKIE_NAME)?.value === ADMIN_COOKIE_VALUE;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#DDFBFF] px-4 py-12">
        <div className="mx-auto max-w-md rounded-[32px] border border-[#D0D5DD] bg-white p-8 shadow-[0_24px_70px_rgba(16,24,40,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#175C42]">The Waves Admin</p>
          <h1 className="mt-3 text-3xl font-extrabold text-[#101828]">Admin Login</h1>
          <div className="mt-8">
            <AdminLoginForm />
          </div>
          <Link href="/" className="mt-5 inline-flex text-sm font-semibold text-[#175C42]">Return Home</Link>
        </div>
      </main>
    );
  }

  const resolvedSearchParams = await searchParams;
  const filterType = ["all", "date", "week", "month", "year"].includes(resolvedSearchParams?.filter)
    ? resolvedSearchParams.filter
    : "date";
  const today = getTodayInIndia();
  const referenceDate = resolvedSearchParams?.date || today;
  const fromDate = resolvedSearchParams?.from || "";
  const toDate = resolvedSearchParams?.to || "";
  const searchTerm = resolvedSearchParams?.search || "";
  const visitDate = resolvedSearchParams?.visitDate || referenceDate;
  const visitorsSearchTerm = resolvedSearchParams?.visitorsSearch || "";
  const recentPage = Math.max(1, Number(resolvedSearchParams?.recentPage || 1));
  const ticketsPage = Math.max(1, Number(resolvedSearchParams?.ticketsPage || 1));

  const convex = createConvexClient();
  const dashboard = await convex.query("orders:getAdminDashboardData", {
    filterType,
    referenceDate,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
    searchTerm: searchTerm || undefined,
    visitDate,
    visitorsSearchTerm: visitorsSearchTerm || undefined,
    recentPage,
    ticketsPage,
  });

  const baseQuery = {
    filter: filterType,
    date: referenceDate,
    from: fromDate,
    to: toDate,
    search: searchTerm,
    visitDate,
    visitorsSearch: visitorsSearchTerm,
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F3F7F5_0%,#FFFFFF_45%,#F7FAFC_100%)] px-4 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#175C42]">The Waves Admin</p>
            <h1 className="mt-2 text-3xl font-extrabold text-[#101828] md:text-5xl">Booking Dashboard</h1>
            <p className="mt-3 max-w-2xl text-sm text-[#667085] md:text-base">
              Live booking overview from Convex for {formatDateRangeLabel(dashboard.referenceDate)}.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        <OverviewFilterBar
          filterType={filterType}
          referenceDate={referenceDate}
          fromDate={fromDate}
          toDate={toDate}
          visitDate={visitDate}
          visitorsSearchTerm={visitorsSearchTerm}
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

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Lunch Count For Selected Date" value={dashboard.summary.lunchCountForSelectedDate || 0} tone="success" />
        </section>

        <OrdersTable
          title={`Customers Coming On ${formatShortDate(dashboard.selectedVisitDate)}`}
          description="Change the visit date here to see expected visitors for any day, with their payment and ticket status."
          orders={dashboard.selectedVisitDateTickets}
          pagination={dashboard.selectedVisitDateTicketsPagination}
          paginationKey="ticketsPage"
          paginationQuery={{ ...baseQuery, recentPage, ticketsPage }}
          showLunchColumn={true}
          filters={
            <TicketsFilterBar
              visitDate={visitDate}
              visitorsSearchTerm={visitorsSearchTerm}
              query={{
                filterType,
                referenceDate,
                fromDate,
                toDate,
                searchTerm,
              }}
            />
          }
        />

        <OrdersTable
          title="All Orders"
          description="All orders across the system. Search by name, number, order id, or date and page through large result sets."
          orders={dashboard.allOrders}
          pagination={dashboard.allOrdersPagination}
          paginationKey="recentPage"
          paginationQuery={{ ...baseQuery, recentPage, ticketsPage }}
          filters={
            <AllOrdersFilterBar
              query={{
                filterType,
                referenceDate,
                fromDate,
                toDate,
                visitDate,
                visitorsSearchTerm,
                searchTerm,
              }}
            />
          }
        />
      </div>
    </main>
  );
}
