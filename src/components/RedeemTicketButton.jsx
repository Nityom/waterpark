"use client";

import { useState } from "react";

export default function RedeemTicketButton({ orderId }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRedeem = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/redeem-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await response.json();

      if (response.status === 409 && data.alreadyRedeemed) {
        setMessage("Ticket has already been redeemed.");
        window.location.reload();
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Could not redeem ticket");
      }

      setMessage("Ticket redeemed successfully.");
      window.location.reload();
    } catch (error) {
      setMessage(error.message || "Could not redeem ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleRedeem}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full bg-[#16A34A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#15803D] disabled:opacity-50"
      >
        {loading ? "Redeeming..." : "Mark As Redeemed"}
      </button>
      {message ? <p className="mt-3 text-sm text-gray-600">{message}</p> : null}
    </div>
  );
}
