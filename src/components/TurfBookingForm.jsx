"use client";

import { useState, useEffect } from "react";
import PaymentButton from "./PaymentButton";
import { siteInfo } from "../constants/siteInfo";
import {
  getTodayInIndia,
  getTurfVisitDateValidationMessage,
} from "../lib/bookingTime";
import { calculateConvenienceCharge } from "../lib/convenienceCharge";
import { formatTime, isTurfSlotOverlapping } from "../lib/turfSlots";

const ALL_SLOTS = [
  { startHour: 9, label: "09:00 AM - 10:00 AM", period: "morning" },
  { startHour: 10, label: "10:00 AM - 11:00 AM", period: "morning" },
  { startHour: 11, label: "11:00 AM - 12:00 PM", period: "morning" },
  { startHour: 12, label: "12:00 PM - 01:00 PM", period: "afternoon" },
  { startHour: 13, label: "01:00 PM - 02:00 PM", period: "afternoon" },
  { startHour: 14, label: "02:00 PM - 03:00 PM", period: "afternoon" },
  { startHour: 15, label: "03:00 PM - 04:00 PM", period: "afternoon" },
  { startHour: 16, label: "04:00 PM - 05:00 PM", period: "afternoon" },
  { startHour: 17, label: "05:00 PM - 06:00 PM", period: "evening", floodlight: true },
  { startHour: 18, label: "06:00 PM - 07:00 PM", period: "night", floodlight: true },
  { startHour: 19, label: "07:00 PM - 08:00 PM", period: "night", floodlight: true },
  { startHour: 20, label: "08:00 PM - 09:00 PM", period: "night", floodlight: true },
  { startHour: 21, label: "09:00 PM - 10:00 PM", period: "night", floodlight: true },
  { startHour: 22, label: "10:00 PM - 11:00 PM", period: "night", floodlight: true },
];

export default function TurfBookingForm({ compact = false }) {
  const today = getTodayInIndia();
  const [visitDate, setVisitDate] = useState(today);
  const [durationHours, setDurationHours] = useState(1);
  const [selectedStartHour, setSelectedStartHour] = useState(18); // Default 6:00 PM (popular night slot)
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Calculate India's current hour
  const now = new Date();
  const indiaTimeParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const currentIndiaHour = Number(
    indiaTimeParts.find((p) => p.type === "hour")?.value || 0
  );

  // Fetch booked slots for the selected date
  useEffect(() => {
    let isCancelled = false;
    async function fetchBooked() {
      try {
        setLoadingSlots(true);
        const res = await fetch(`/api/turf-booked-slots?date=${visitDate}`);
        const data = await res.json();
        if (!isCancelled && data.bookedSlots) {
          setBookedSlots(data.bookedSlots);
        }
      } catch (err) {
        console.error("Failed to load booked slots", err);
      } finally {
        if (!isCancelled) setLoadingSlots(false);
      }
    }

    if (visitDate) {
      fetchBooked();
    }

    return () => {
      isCancelled = true;
    };
  }, [visitDate]);

  const pricePerHour = siteInfo.turf?.pricePerHour || 499;
  const subtotalAmount = pricePerHour * durationHours;
  const chargeInfo = calculateConvenienceCharge(subtotalAmount);
  const totalAmount = chargeInfo.totalAmount;

  // Build slot string
  const endHour = selectedStartHour + durationHours;
  const slotDisplayLabel = `${formatTime(selectedStartHour)} - ${formatTime(endHour)} (${durationHours} hr${durationHours > 1 ? "s" : ""})`;

  // Validation
  const visitDateError = getTurfVisitDateValidationMessage(visitDate);
  const isToday = visitDate === today;

  // Check if slot has passed
  const isSlotPast = (startHour) => {
    if (!isToday) return false;
    return startHour <= currentIndiaHour;
  };

  // Check if any hour in the duration range overlaps with existing bookings
  const isSlotBooked = (startHour) => {
    return isTurfSlotOverlapping(startHour, durationHours, bookedSlots);
  };

  // Automatically select the first available unbooked slot when duration or date changes
  useEffect(() => {
    const validSlots = ALL_SLOTS.filter((s) => s.startHour + durationHours <= 23);
    const isCurrentValid =
      !isSlotPast(selectedStartHour) &&
      !isTurfSlotOverlapping(selectedStartHour, durationHours, bookedSlots);

    if (!isCurrentValid) {
      const firstAvailable = validSlots.find(
        (s) =>
          !isSlotPast(s.startHour) &&
          !isTurfSlotOverlapping(s.startHour, durationHours, bookedSlots)
      );
      if (firstAvailable) {
        setSelectedStartHour(firstAvailable.startHour);
      }
    }
  }, [bookedSlots, durationHours, visitDate, currentIndiaHour]);

  const isFormComplete =
    customer.name.trim() &&
    customer.email.trim() &&
    customer.phone.trim().length >= 10 &&
    visitDate &&
    !visitDateError &&
    !isSlotPast(selectedStartHour) &&
    !isSlotBooked(selectedStartHour);

  const orderDetails = {
    booking_type: "turf",
    amount: subtotalAmount,
    customer_name: customer.name.trim(),
    customer_email: customer.email.trim(),
    customer_phone: customer.phone.trim(),
    visit_date: visitDate,
    turf_slot: slotDisplayLabel,
    turf_hours: durationHours,
    ticket_type: "turf",
    quantity: durationHours,
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Date & Duration Selection */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#461AA2]">
            1. Select Match Date
          </label>
          <input
            type="date"
            value={visitDate}
            min={today}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full rounded-2xl border border-[#B8A8E9] bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm outline-none focus:border-[#461AA2] focus:ring-2 focus:ring-[#461AA2]/20"
          />
          {visitDateError ? (
            <p className="mt-1 text-xs text-red-500">{visitDateError}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#461AA2]">
            2. Match Duration
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((hrs) => (
              <button
                key={hrs}
                type="button"
                onClick={() => setDurationHours(hrs)}
                className={`rounded-2xl py-3 text-sm font-bold transition-all ${durationHours === hrs
                    ? "bg-[#461AA2] text-white shadow-md scale-[1.02]"
                    : "border border-[#D4C7F2] bg-white text-gray-700 hover:border-[#461AA2]"
                  }`}
              >
                {hrs} hr{hrs > 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Time Slot Picker */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#461AA2]">
            3. Choose Starting Time Slot
          </label>
          {loadingSlots ? (
            <span className="text-xs text-gray-500 animate-pulse">Checking availability...</span>
          ) : (
            <span className="text-xs text-gray-500">
              Operating: 9:00 AM – 11:00 PM
            </span>
          )}
        </div>

        {/* Slot Selection Grid */}
        <div className="max-h-[260px] overflow-y-auto rounded-2xl border border-[#E9E4F5] bg-[#FBF9FF] p-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {ALL_SLOTS.filter((s) => s.startHour + durationHours <= 23).map((slot) => {
              const isPast = isSlotPast(slot.startHour);
              const isBooked = isSlotBooked(slot.startHour);
              const isSelected = selectedStartHour === slot.startHour;
              const disabled = isPast || isBooked;

              return (
                <button
                  key={slot.startHour}
                  type="button"
                  disabled={disabled}
                  onClick={() => setSelectedStartHour(slot.startHour)}
                  className={`group relative flex flex-col items-center justify-center rounded-xl p-2.5 text-xs font-semibold transition-all ${
                    isBooked
                      ? "cursor-not-allowed bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA] opacity-80"
                      : isPast
                      ? "cursor-not-allowed bg-gray-100 text-gray-400 opacity-60 border border-gray-200"
                      : isSelected
                      ? "bg-[#461AA2] text-white shadow-lg ring-2 ring-[#C5FA19] scale-[1.03]"
                      : "border border-[#DCD3F5] bg-white text-gray-800 hover:border-[#461AA2] hover:bg-[#F3EEFF]"
                  }`}
                >
                  <span className={`font-bold ${isBooked ? "line-through text-red-500" : ""}`}>{formatTime(slot.startHour)}</span>
                  <span
                    className={`text-[10px] mt-0.5 font-bold ${
                      isBooked
                        ? "text-[#B42318]"
                        : isPast
                        ? "text-gray-400"
                        : isSelected
                        ? "text-[#C5FA19]"
                        : "text-gray-500"
                    }`}
                  >
                    {isBooked ? "🔒 Booked" : isPast ? "Passed" : slot.floodlight ? "💡 Night" : "☀️ Day"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Slot Confirmation Bar */}
        {isSlotBooked(selectedStartHour) ? (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#FEF3F2] border border-[#FECDCA] p-3 text-sm text-[#B42318]">
            <span className="text-lg">⚠️</span>
            <span>
              <strong>Slot Unavailable:</strong> The slot <strong>{slotDisplayLabel}</strong> overlaps with an already booked match on {visitDate}. Please choose another starting time.
            </span>
          </div>
        ) : (
          <div className="mt-3 flex items-center justify-between rounded-xl bg-[#E8F8ED] border border-[#A6F4C5] p-3 text-sm text-[#125B36]">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏏</span>
              <span>
                <strong>Slot:</strong> {slotDisplayLabel}
              </span>
            </div>
            <span className="font-bold text-[#461AA2] bg-white px-3 py-1 rounded-full text-xs shadow-sm">
              ₹{pricePerHour}/hr
            </span>
          </div>
        )}
      </div>

      {/* Customer Contact Details */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#461AA2]">
          4. Contact & Player Details
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleCustomerChange}
              placeholder="Full Name (Captain / Booking Name)"
              className="w-full rounded-2xl border border-[#B8A8E9] bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#461AA2]"
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={customer.phone}
              onChange={handleCustomerChange}
              placeholder="Mobile Number (10 digits)"
              className="w-full rounded-2xl border border-[#B8A8E9] bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#461AA2]"
            />
          </div>

          <div className="sm:col-span-2">
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleCustomerChange}
              placeholder="Email Address (Ticket & Receipt will be sent here)"
              className="w-full rounded-2xl border border-[#B8A8E9] bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#461AA2]"
            />
          </div>
        </div>
      </div>

      {/* Pricing Breakdown & Checkout */}
      <div className="rounded-2xl border border-[#E4DEF6] bg-[#FAF8FF] p-4 text-sm space-y-2">
        <div className="flex justify-between text-gray-700">
          <span>Turf Rate ({durationHours} hr × ₹{pricePerHour})</span>
          <span className="font-semibold">₹{subtotalAmount}</span>
        </div>
        <div className="flex justify-between text-gray-600 text-xs">
          <span>Convenience Charge (2.3% gateway)</span>
          <span>₹{chargeInfo.chargeAmount}</span>
        </div>
        <div className="border-t border-[#DED7F5] pt-2 flex justify-between items-center text-base font-extrabold text-[#461AA2]">
          <span>Total Payable</span>
          <span className="text-xl">₹{totalAmount}</span>
        </div>
      </div>

      {/* Payment Button */}
      <div>
        <PaymentButton
          orderDetails={orderDetails}
          disabled={!isFormComplete}
          className="w-full rounded-full bg-[#461AA2] px-6 py-4 text-center font-bold text-white shadow-xl hover:bg-[#5a2db3] transition-all disabled:opacity-50 text-base"
        >
          Pay ₹{totalAmount}
        </PaymentButton>

        {!isFormComplete && (
          <p className="mt-2 text-center text-xs text-gray-500">
            Please fill in your name, mobile number, email, and choose an available slot to proceed with Cashfree payment.
          </p>
        )}
      </div>
    </div>
  );
}

