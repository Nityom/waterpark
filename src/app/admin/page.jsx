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
import TurfOrdersTable from "../../components/TurfOrdersTable";
import AdminDashboardTabs from "../../components/AdminDashboardTabs";

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
    tab: "all",
  });
  const allHref = allQuery ? `/admin?${allQuery}` : "/admin?tab=all";
  const allButtonClassName = filterType === "all"
    ? "rounded-full border border-[#175C42] bg-[#ECFDF3] px-5 py-3 text-sm font-bold text-[#175C42]"
    : "rounded-full border border-[#D0D5DD] bg-white px-5 py-3 text-sm font-bold text-[#344054] transition hover:bg-[#F9FAFB]";

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085]">Filter Period</span>
        <Link href={allHref} scroll={false} className={allButtonClassName}>
          All Time
        </Link>
      </div>

      <AdminFilterForm
        className="flex flex-wrap items-end gap-3 rounded-[28px] border border-[#D0D5DD] bg-white p-5 shadow-sm"
        hiddenFields={{ visitDate, visitorsSearch: visitorsSearchTerm, tab: "all" }}
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
        tab: query.tab || "tickets",
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
        turfSearch: query.turfSearchTerm,
        tab: query.tab || "all",
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

function TurfFilterBar({ turfDate, turfSearchTerm, query }) {
  const currentTab = query.tab || "turf";
  const allTurfQuery = buildQueryString({
    filter: query.filterType,
    date: query.referenceDate,
    from: query.fromDate,
    to: query.toDate,
    visitDate: query.visitDate,
    visitorsSearch: query.visitorsSearchTerm,
    search: query.searchTerm,
    turfDate: "",
    turfSearch: "",
    tab: currentTab,
  });
  const allTurfHref = allTurfQuery ? `/admin?${allTurfQuery}` : `/admin?tab=${currentTab}`;
  const isFiltered = Boolean(turfDate || turfSearchTerm);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#175C42]">Turf Filter</span>
        <Link
          href={allTurfHref}
          scroll={false}
          className={
            !isFiltered
              ? "rounded-full border border-[#175C42] bg-[#ECFDF3] px-4 py-2 text-xs font-bold text-[#175C42]"
              : "rounded-full border border-[#D0D5DD] bg-white px-4 py-2 text-xs font-bold text-[#344054] transition hover:bg-[#F9FAFB]"
          }
        >
          All Dates
        </Link>
        {isFiltered ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FEDF89] bg-[#FFFAEB] px-3.5 py-1.5 text-xs font-semibold text-[#B54708]">
            {turfDate ? `Match Date: ${formatShortDate(turfDate)}` : ""}
            {turfDate && turfSearchTerm ? " · " : ""}
            {turfSearchTerm ? `Search: "${turfSearchTerm}"` : ""}
            <Link
              href={allTurfHref}
              scroll={false}
              className="font-bold underline text-[#B54708] hover:text-[#7A2E0E]"
            >
              Clear
            </Link>
          </span>
        ) : null}
      </div>

      <AdminFilterForm
        className="flex flex-wrap items-end gap-3 rounded-[28px] border border-[#C6DCB8] bg-white p-5 shadow-sm"
        hiddenFields={{
          filter: query.filterType,
          date: query.referenceDate,
          from: query.fromDate,
          to: query.toDate,
          visitDate: query.visitDate,
          visitorsSearch: query.visitorsSearchTerm,
          search: query.searchTerm,
          tab: currentTab,
        }}
        fields={[
          {
            type: "date",
            name: "turfDate",
            label: "Match Date",
            defaultValue: turfDate,
            labelClassName: "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#175C42]",
            inputClassName: "rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]",
          },
          {
            type: "text",
            name: "turfSearch",
            label: "Search Turf Bookings",
            defaultValue: turfSearchTerm,
            placeholder: "Search by player name, phone, slot time (e.g. 7 PM), or order ID",
            wrapperClassName: "min-w-[280px] flex-1",
            labelClassName: "mb-1.5 block text-xs font-bold uppercase tracking-[0.14em] text-[#175C42]",
            inputClassName: "w-full rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] outline-none focus:border-[#175C42]",
          },
        ]}
        submitLabel="Show Turf Bookings"
        pendingLabel="Loading..."
      />
    </div>
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
  const turfDate = resolvedSearchParams?.turfDate || "";
  const turfSearchTerm = resolvedSearchParams?.turfSearch || "";
  const recentPage = Math.max(1, Number(resolvedSearchParams?.recentPage || 1));
  const ticketsPage = Math.max(1, Number(resolvedSearchParams?.ticketsPage || 1));
  const turfPage = Math.max(1, Number(resolvedSearchParams?.turfPage || 1));

  const convex = createConvexClient();
  let dashboard;
  try {
    dashboard = await convex.query("orders:getAdminDashboardData", {
      filterType,
      referenceDate,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
      searchTerm: searchTerm || undefined,
      visitDate,
      visitorsSearchTerm: visitorsSearchTerm || undefined,
      turfDate: turfDate || undefined,
      turfSearchTerm: turfSearchTerm || undefined,
      recentPage,
      ticketsPage,
      turfPage,
    });
  } catch (err) {
    console.error("Dashboard query error, trying safe fallback query:", err?.message || err);
    dashboard = await convex.query("orders:getAdminDashboardData", {
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
  }

  const baseQuery = {
    filter: filterType,
    date: referenceDate,
    from: fromDate,
    to: toDate,
    search: searchTerm,
    visitDate,
    visitorsSearch: visitorsSearchTerm,
    turfDate,
    turfSearch: turfSearchTerm,
  };

  const currentTab = resolvedSearchParams?.tab || (turfDate || turfSearchTerm ? "turf" : "all");

  const turfContent = (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#175C42]">🏏 Cricket Turf Arena</span>
          <h2 className="mt-1 text-2xl font-extrabold text-[#101828] md:text-3xl">Turf Overview & Bookings</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Real-time cricket turf reservations, slot timings, player details, and revenue.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-2xl bg-white border border-[#D0D5DD] px-3.5 py-2 text-right shadow-xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#667085]">Timings</p>
            <p className="text-xs font-extrabold text-[#101828]">9:00 AM – 11:00 PM</p>
          </div>
          <div className="rounded-2xl bg-[#ECFDF3] border border-[#A6F4C5] px-4 py-2 text-right shadow-xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#175C42]">Standard Rate</p>
            <p className="text-base font-extrabold text-[#101828]">₹499 <span className="text-xs font-semibold text-[#667085]">/ hr</span></p>
          </div>
        </div>
      </div>

      <TurfFilterBar
        turfDate={turfDate}
        turfSearchTerm={turfSearchTerm}
        query={{
          filterType,
          referenceDate,
          fromDate,
          toDate,
          visitDate,
          visitorsSearchTerm,
          searchTerm,
          turfDate,
          turfSearchTerm,
          tab: "turf",
        }}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Turf Bookings" value={dashboard.summary.turfSummary?.totalBookings || 0} />
        <MetricCard label="Turf Revenue" value={formatCurrency(dashboard.summary.turfSummary?.totalRevenue || 0)} tone="success" />
        <MetricCard label="Turf Hours Booked" value={`${dashboard.summary.turfSummary?.totalHours || 0} hrs`} />
        <MetricCard label="Confirmed Matches" value={dashboard.summary.turfSummary?.successfulBookings || 0} tone="success" />
      </section>

      <TurfOrdersTable
        title={turfDate ? `🏏 Cricket Turf Bookings For ${formatShortDate(turfDate)}` : "🏏 Cricket Playground Turf Bookings"}
        description={turfDate ? `Showing all turf reservations for ${formatShortDate(turfDate)}.` : "Manage cricket turf reservations, view slot timings, hours booked, payment status, and player details."}
        orders={dashboard.turfOrders || []}
        pagination={dashboard.turfOrdersPagination}
        paginationKey="turfPage"
        paginationQuery={{ ...baseQuery, recentPage, ticketsPage, turfPage, tab: "turf" }}
      />
    </div>
  );

  const ticketsContent = (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#026AA2]">🌊 Waterpark Visitors</span>
          <h2 className="mt-1 text-2xl font-extrabold text-[#101828] md:text-3xl">Expected Visitors & Lunch</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Visitors expected for {formatShortDate(dashboard.selectedVisitDate)}, with payment and ticket status.
          </p>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard label="Tickets Generated" value={dashboard.summary.ticketsGenerated} />
        <MetricCard label="Redeemed Tickets" value={dashboard.summary.redeemedTickets} tone="warning" />
        <MetricCard label="Lunch Count For Selected Date" value={dashboard.summary.lunchCountForSelectedDate || 0} tone="success" />
      </section>

      <OrdersTable
        title={`Customers Coming On ${formatShortDate(dashboard.selectedVisitDate)}`}
        description="Change the visit date here to see expected visitors for any day, with their payment and ticket status."
        orders={dashboard.selectedVisitDateTickets}
        pagination={dashboard.selectedVisitDateTicketsPagination}
        paginationKey="ticketsPage"
        paginationQuery={{ ...baseQuery, recentPage, ticketsPage, turfPage, tab: "tickets" }}
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
              turfSearch: turfSearchTerm,
              tab: "tickets",
            }}
          />
        }
      />
    </div>
  );

  const allContent = (
    <div className="space-y-6">
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
        paginationQuery={{ ...baseQuery, recentPage, ticketsPage, turfPage, tab: "all" }}
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
              turfSearch: turfSearchTerm,
              tab: "all",
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
        paginationQuery={{ ...baseQuery, recentPage, ticketsPage, turfPage, tab: "all" }}
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
              turfSearchTerm,
              tab: "all",
            }}
          />
        }
      />
    </div>
  );

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#F3F7F5_0%,#FFFFFF_45%,#F7FAFC_100%)] px-4 py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#175C42]">The Waves Admin</p>
            <h1 className="mt-2 text-3xl font-extrabold text-[#101828] md:text-5xl">Booking Dashboard</h1>
            <p className="mt-3 max-w-2xl text-sm text-[#667085] md:text-base">
              Live booking overview for {formatDateRangeLabel(dashboard.referenceDate)}.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        {/* Top Quick Filter Tabs Switcher */}
        <AdminDashboardTabs
          initialTab={currentTab}
          turfCount={dashboard.summary.turfSummary?.totalBookings || 0}
          ticketsCount={dashboard.summary.ticketsGenerated || 0}
          allCount={dashboard.summary.totalOrders || 0}
          turfContent={turfContent}
          ticketsContent={ticketsContent}
          allContent={allContent}
        />
      </div>
    </main>
  );
}
