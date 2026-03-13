"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
);

/* ── Slightly deeper premium palette ── */
const COLORS = {
  success:   "#4FAF82",   // deeper sage green
  pending:   "#E8A94A",   // deeper warm amber
  failed:    "#E06B6B",   // deeper dusty rose
  cancelled: "#8F8D85",   // deeper warm gray
  dropped:   "#5A91C8",   // deeper periwinkle

  orders:    "#4FAF82",
  redeemed:  "#5A91C8",
  revenue:   "#4FAF82",
};

const TOOLTIP = {
  backgroundColor: "rgba(255,255,255,0.97)",
  titleColor: "#1D2939",
  bodyColor: "#475467",
  borderColor: "rgba(160,158,150,0.3)",
  borderWidth: 1,
  cornerRadius: 10,
  padding: 12,
};

export default function AdminCharts({ summary, charts }) {

  /* ── Payment Mix ── */
  const paymentBreakdown = {
    labels: ["Success", "Pending", "Failed", "Cancelled", "User Dropped"],
    datasets: [
      {
        data: [
          summary.successfulPayments,
          summary.pendingPayments,
          summary.failedPayments,
          summary.cancelledPayments,
          summary.userDroppedPayments || 0,
        ],
        backgroundColor: [
          COLORS.success,
          COLORS.pending,
          COLORS.failed,
          COLORS.cancelled,
          COLORS.dropped,
        ],
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };

  /* ── Order Trend ── */
  const trendSeries = {
    labels: charts.labels,
    datasets: [
      {
        label: "Orders",
        data: charts.orders,
        borderColor: COLORS.orders,
        backgroundColor: "rgba(79,175,130,0.10)",
        tension: 0.45,
        fill: true,
        pointRadius: 3.5,
        pointBackgroundColor: COLORS.orders,
        borderWidth: 2.5,
      },
      {
        label: "Redeemed",
        data: charts.redeemed,
        borderColor: COLORS.redeemed,
        backgroundColor: "rgba(90,145,200,0.10)",
        tension: 0.45,
        fill: true,
        pointRadius: 3.5,
        pointBackgroundColor: COLORS.redeemed,
        borderWidth: 2.5,
      },
    ],
  };

  /* ── Revenue ── */
  const revenueSeries = {
    labels: charts.labels,
    datasets: [
      {
        label: "Revenue",
        data: charts.revenue,
        backgroundColor: "rgba(79,175,130,0.28)",
        hoverBackgroundColor: "rgba(79,175,130,0.52)",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  /* ── Shared axis/tooltip options ── */
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: TOOLTIP,
    },
    scales: {
      x: {
        ticks: { color: "#7A7F8A", font: { size: 11 } },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: { color: "#7A7F8A", font: { size: 11 } },
        grid: { color: "rgba(150,148,140,0.18)" },
        border: { display: false },
      },
    },
  };

  const LegendDot = ({ color, label }) => (
    <span className="flex items-center gap-1.5 text-[11px] text-[#7A7F8A]">
      <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
      {label}
    </span>
  );

  const DonutRow = ({ color, label }) => (
    <span className="flex items-center gap-1.5 text-[11px] text-[#7A7F8A]">
      <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
      {label}
    </span>
  );

  return (
    <section className="grid gap-3.5 xl:grid-cols-[1.1fr_0.9fr]">

      {/* ── ORDER TREND ── */}
      <div className="rounded-[20px] border border-[#E0E3EA] bg-white p-6 shadow-[0_2px_20px_rgba(16,24,40,0.07)]">
        <h2 className="text-[15px] font-medium text-[#101828]">Order trends</h2>
        <p className="mt-0.5 text-[12px] text-[#7A7F8A]">
          Orders and redeemed tickets across the selected period.
        </p>

        <div className="mt-3 flex gap-4">
          <LegendDot color={COLORS.orders}   label="Orders"   />
          <LegendDot color={COLORS.redeemed} label="Redeemed" />
        </div>

        <div className="mt-3 h-[280px]">
          <Line data={trendSeries} options={baseOptions} />
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="grid gap-3.5">

        {/* PAYMENT MIX */}
        <div className="rounded-[20px] border border-[#E0E3EA] bg-white p-6 shadow-[0_2px_20px_rgba(16,24,40,0.07)]">
          <h2 className="text-[15px] font-medium text-[#101828]">Payment mix</h2>
          <p className="mt-0.5 mb-4 text-[12px] text-[#7A7F8A]">
            Status breakdown from transaction data.
          </p>

          <div className="flex items-center gap-6">
            <div className="relative h-[130px] w-[130px] flex-shrink-0">
              <Doughnut
                data={paymentBreakdown}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "72%",
                  plugins: { legend: { display: false }, tooltip: TOOLTIP },
                }}
              />
            </div>

            <div className="flex flex-col gap-[7px]">
              <DonutRow color={COLORS.success}   label="Success"      />
              <DonutRow color={COLORS.pending}   label="Pending"      />
              <DonutRow color={COLORS.failed}    label="Failed"       />
              <DonutRow color={COLORS.cancelled} label="Cancelled"    />
              <DonutRow color={COLORS.dropped}   label="User dropped" />
            </div>
          </div>
        </div>

        {/* REVENUE */}
        <div className="rounded-[20px] border border-[#E0E3EA] bg-white p-6 shadow-[0_2px_20px_rgba(16,24,40,0.07)]">
          <h2 className="text-[15px] font-medium text-[#101828]">Revenue view</h2>
          <p className="mt-0.5 text-[12px] text-[#7A7F8A]">
            Revenue by time bucket in the selected range.
          </p>

          <div className="mt-3 h-[160px]">
            <Bar data={revenueSeries} options={baseOptions} />
          </div>
        </div>

      </div>
    </section>
  );
}