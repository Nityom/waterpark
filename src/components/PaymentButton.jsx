"use client";

import { useState } from "react";
import Script from "next/script";

export default function PaymentButton({
  orderDetails,
  className,
  children,
  disabled = false,
}) {
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async () => {
    try {
      setErrorMessage("");

      if (disabled) {
        return;
      }

      if (!sdkReady) {
        alert("Payment system is still loading. Please try again.");
        return;
      }

      setLoading(true);

      // Create order
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (!response.ok || !data.payment_session_id) {
        const details = [data.error, data.code].filter(Boolean).join(" ");
        throw new Error(details || "Order creation failed");
      }

      const cashfree = window.Cashfree({
        mode: data.mode || "sandbox",
      });

      const checkoutResult = await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      });

      if (checkoutResult?.error) {
        const details = [
          checkoutResult.error.message,
          checkoutResult.error.code,
          checkoutResult.error.type,
        ]
          .filter(Boolean)
          .join(" ");

        throw new Error(details || "Cashfree checkout failed");
      }

    } catch (error) {
      console.error("Payment error:", error);
      const message = error?.message || "Payment failed. Please try again.";
      setErrorMessage(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Load Cashfree SDK */}
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
      />

      <button
        onClick={handlePayment}
        disabled={disabled || loading || !sdkReady}
        className={
          className ||
          "px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        }
      >
        {loading ? "Processing..." : children || "Buy Your Day Pass"}
      </button>

      {errorMessage ? (
        <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </>
  );
}
