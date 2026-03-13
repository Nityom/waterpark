const statusMap = {
  verified: {
    label: "Verified",
    wrap: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
  redeemed: {
    label: "Redeemed",
    wrap: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    wrap: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  cancelled: {
    label: "Cancelled",
    wrap: "bg-slate-100 text-slate-700",
    dot: "bg-slate-500",
  },
  failed: {
    label: "Not Verified",
    wrap: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
};

export default function TicketStatusBadge({ status }) {
  const config = statusMap[status] || statusMap.failed;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${config.wrap}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
