"use client";

import { useState } from "react";
import PaymentButton from "./PaymentButton";
import { siteInfo } from "../constants/siteInfo";
import {
  getDayTypeForVisitDate,
  getTodayInIndia,
  getVisitDateValidationMessage,
  isSameDayBookingClosed,
} from "../lib/bookingTime";
import { formatShortDate } from "../lib/dateFormat";

function TicketBookingForm() {
  const [visitDate, setVisitDate] = useState(getTodayInIndia);
  const [adultQuantity, setAdultQuantity] = useState(1);
  const [childQuantity, setChildQuantity] = useState(0);
  const [costumesQuantity, setCostumesQuantity] = useState(0);
  const [lockerQuantity, setLockerQuantity] = useState(0);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const dayType = getDayTypeForVisitDate(visitDate);
  const pricing = siteInfo.pricing[dayType];
  const totalAmount =
    pricing.adult * adultQuantity +
    pricing.child * childQuantity +
    costumesQuantity * 50 +
    lockerQuantity * 50;
  const totalTickets = adultQuantity + childQuantity;
  const visitDateError = getVisitDateValidationMessage(visitDate);
  const sameDayClosed = isSameDayBookingClosed(visitDate);
  const isFormComplete =
    customer.name.trim() &&
    customer.email.trim() &&
    customer.phone.trim().length >= 10 &&
    totalTickets > 0 &&
    visitDate &&
    !visitDateError;

  const orderDetails = {
    amount: totalAmount,
    customer_name: customer.name.trim(),
    customer_email: customer.email.trim(),
    customer_phone: customer.phone.trim(),
    day_type: dayType,
    visit_date: visitDate,
    adult_quantity: adultQuantity,
    child_quantity: childQuantity,
    costumes_quantity: costumesQuantity,
    locker_quantity: lockerQuantity,
    ticket_type: adultQuantity > 0 ? "adult" : "child",
    quantity: totalTickets,
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#461AA2]">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleCustomerChange}
            placeholder="Enter your full name"
            className="w-full rounded-2xl border border-[#B8A8E9] bg-[#EEF2FF] px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#5123B6]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#461AA2]">
            Mobile Number
          </label>
          <input
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleCustomerChange}
            placeholder="+91 9876543210"
            className="w-full rounded-2xl border border-[#B8A8E9] bg-[#EEF2FF] px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#5123B6]"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-semibold text-[#461AA2]">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleCustomerChange}
            placeholder="Enter your email address"
            className="w-full rounded-2xl border border-[#B8A8E9] bg-[#EEF2FF] px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#5123B6]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#461AA2]">
            Visit Date
          </label>
          <input
            type="date"
            value={visitDate}
            min={getTodayInIndia()}
            onChange={(event) => setVisitDate(event.target.value)}
            className="w-full rounded-2xl border border-[#D4C7F2] bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#5123B6]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#461AA2]">
            Visit Day
          </label>
          <input
            type="text"
            value={dayType === "sunday" ? "Sunday" : "Regular"}
            readOnly
            className="w-full rounded-2xl border border-[#D4C7F2] bg-[#F8F5FF] px-4 py-3 text-sm font-semibold text-[#461AA2] outline-none"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#461AA2]">
            Adult Tickets
          </label>
          <input
            type="number"
            min="0"
            max="5"
            value={adultQuantity}
            onChange={(event) => {
              const val = Math.max(0, Number(event.target.value) || 0);
              setAdultQuantity(val > 5 ? 5 : val);
            }}
            className="w-full rounded-2xl border border-[#D4C7F2] bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#5123B6]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#461AA2]">
            Child Tickets
          </label>
          <input
            type="number"
            min="0"
            max="3"
            value={childQuantity}
            onChange={(event) => {
              const val = Math.max(0, Number(event.target.value) || 0);
              setChildQuantity(val > 3 ? 3 : val);
            }}
            className="w-full rounded-2xl border border-[#D4C7F2] bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#5123B6]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#461AA2]">
            Costumes (₹50/person)
          </label>
          <input
            type="number"
            min="0"
            max="20"
            value={costumesQuantity}
            onChange={(event) =>
              setCostumesQuantity(Math.max(0, Number(event.target.value) || 0))
            }
            className="w-full rounded-2xl border border-[#D4C7F2] bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#5123B6]"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#461AA2]">
            Lockers (₹50/locker)
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={lockerQuantity}
            onChange={(event) =>
              setLockerQuantity(Math.max(0, Number(event.target.value) || 0))
            }
            className="w-full rounded-2xl border border-[#D4C7F2] bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#5123B6]"
          />
          <p className="mt-1 text-xs text-gray-500">1 locker fits 1 nuclear family</p>
        </div>
      </div>

      {visitDateError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {visitDateError}
        </div>
      ) : null}

      <div className="rounded-[24px] bg-[#F1ECF9] px-4 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 text-sm text-gray-700">
            <p>Visit date: {visitDate ? formatShortDate(visitDate) : "Select a date"}</p>
            <p>Visit day: {dayType === "sunday" ? "Sunday" : "Regular"}</p>
            <p>Adult ticket x {adultQuantity}</p>
            <p>Child ticket x {childQuantity}</p>
            {costumesQuantity > 0 && <p>Costumes x {costumesQuantity}</p>}
            {lockerQuantity > 0 && <p>Locker x {lockerQuantity}</p>}
            <p className="text-xs text-gray-500">
              {dayType === "sunday" ? "Sunday pricing applied automatically" : "Regular pricing applied automatically"}
            </p>
            {sameDayClosed ? (
              <p className="text-xs font-semibold text-red-600">
                Same-day bookings are closed after 5:00 PM.
              </p>
            ) : null}
          </div>
          <p className="text-2xl font-extrabold text-[#5123B6]">
            Rs. {totalAmount}
          </p>
        </div>
      </div>

      <PaymentButton
        orderDetails={orderDetails}
        disabled={!isFormComplete}
        className="w-full rounded-full bg-[#5123B6] px-6 py-3 text-base font-bold text-white transition hover:bg-[#461AA2] disabled:opacity-50"
      >
        Pay Rs. {totalAmount} Now
      </PaymentButton>

      <p className="text-sm text-gray-500">
        Enter your name, phone, email, and visit date to continue to Cashfree checkout.
      </p>
    </div>
  );
}

export default TicketBookingForm;
