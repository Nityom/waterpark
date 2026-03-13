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
import { formatShortDate } from "../lib/dateFormat";

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

export default function AdminCharts({ summary, charts }) {
  const displayLabels = charts.labels.map((label) => formatShortDate(label));

  const paymentBreakdown = {
    labels: ["Success", "Pending", "Failed", "Cancelled"],
    datasets: [
      {
        data: [
          summary.successfulPayments,
          summary.pendingPayments,
          summary.failedPayments,
          summary.cancelledPayments,
        ],
        backgroundColor: ["#175C42", "#F59E0B", "#DC2626", "#64748B"],
        borderWidth: 0,
      },
    ],
  };

  const trendSeries = {
    labels: displayLabels,
    datasets: [
      {
        label: "Orders",
        data: charts.orders,
        borderColor: "#175C42",
        backgroundColor: "rgba(23, 92, 66, 0.14)",
        tension: 0.35,
        fill: true,
      },
      {
        label: "Redeemed",
        data: charts.redeemed,
        borderColor: "#B54708",
        backgroundColor: "rgba(181, 71, 8, 0.10)",
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const revenueSeries = {
    labels: displayLabels,
    datasets: [
      {
        label: "Revenue",
        data: charts.revenue,
        backgroundColor: "#0F766E",
        borderRadius: 12,
      },
    ],
  };

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#344054",
          font: {
            size: 12,
            weight: "600",
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#667085" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#667085" },
        grid: { color: "rgba(208, 213, 221, 0.5)" },
      },
    },
  };

  return (
    <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[32px] border border-[#D0D5DD] bg-white p-6 shadow-[0_24px_70px_rgba(16,24,40,0.06)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-[#101828]">Order Trends</h2>
            <p className="mt-1 text-sm text-[#667085]">Orders and redeemed tickets across the selected period.</p>
          </div>
        </div>
        <div className="mt-6 h-[320px]">
          <Line data={trendSeries} options={baseOptions} />
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[32px] border border-[#D0D5DD] bg-white p-6 shadow-[0_24px_70px_rgba(16,24,40,0.06)]">
          <h2 className="text-xl font-extrabold text-[#101828]">Payment Mix</h2>
          <p className="mt-1 text-sm text-[#667085]">Interactive status breakdown from Convex data.</p>
          <div className="mt-6 h-[260px]">
            <Doughnut
              data={paymentBreakdown}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#344054",
                      font: { size: 12, weight: "600" },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="rounded-[32px] border border-[#D0D5DD] bg-white p-6 shadow-[0_24px_70px_rgba(16,24,40,0.06)]">
          <h2 className="text-xl font-extrabold text-[#101828]">Revenue View</h2>
          <p className="mt-1 text-sm text-[#667085]">Revenue by time bucket in the selected range.</p>
          <div className="mt-6 h-[240px]">
            <Bar data={revenueSeries} options={baseOptions} />
          </div>
        </div>
      </div>
    </section>
  );
}
