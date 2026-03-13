"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/admin/logout", { method: "POST" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-full border border-[#D0D5DD] px-4 py-2 text-sm font-bold text-[#344054] transition hover:bg-[#F9FAFB] disabled:opacity-60"
    >
      {loading ? "Signing out..." : "Logout"}
    </button>
  );
}
