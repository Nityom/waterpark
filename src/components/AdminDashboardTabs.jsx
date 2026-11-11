"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function AdminDashboardTabs({
  initialTab = "all",
  turfContent,
  ticketsContent,
  allContent,
  turfCount = 0,
  ticketsCount = 0,
  allCount = 0,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && ["turf", "tickets", "all"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    const newUrl = `${pathname}?${params.toString()}`;
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  const tabs = [
    {
      id: "turf",
      label: "🏏 Cricket Turf",
      count: turfCount,
      activeClass: "border-[#175C42] bg-[#175C42] text-white shadow-md ring-2 ring-[#175C42]/20",
    },
    {
      id: "tickets",
      label: "🌊 Waterpark Tickets",
      count: ticketsCount,
      activeClass: "border-[#026AA2] bg-[#026AA2] text-white shadow-md ring-2 ring-[#026AA2]/20",
    },
    {
      id: "all",
      label: "📊 All Bookings Overview",
      count: allCount,
      activeClass: "border-[#344054] bg-[#344054] text-white shadow-md ring-2 ring-[#344054]/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Quick Filter Tabs */}
      <div className="rounded-[28px] border border-[#D0D5DD] bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#667085] mr-1">
              Quick Filter
            </span>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => switchTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all shadow-xs cursor-pointer ${
                    isActive
                      ? `border ${tab.activeClass}`
                      : "border border-[#D0D5DD] bg-white text-[#344054] hover:bg-[#F9FAFB] hover:border-[#98A2B3]"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count !== null ? (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-extrabold ${
                        isActive ? "bg-white/20 text-white" : "bg-[#F2F4F7] text-[#344054]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-[#667085] font-semibold hidden sm:block">
            {activeTab === "turf" && "⚡ Viewing Cricket Turf Arena"}
            {activeTab === "tickets" && "⚡ Viewing Waterpark Visitors"}
            {activeTab === "all" && "⚡ Viewing Complete Dashboard"}
          </div>
        </div>
      </div>

      {/* Render Active View directly at top with 0 scrolling */}
      {activeTab === "turf" && (
        <div className="space-y-6">
          {turfContent}
        </div>
      )}

      {activeTab === "tickets" && (
        <div className="space-y-6">
          {ticketsContent}
        </div>
      )}

      {activeTab === "all" && (
        <div className="space-y-6">
          {allContent}
        </div>
      )}
    </div>
  );
}

