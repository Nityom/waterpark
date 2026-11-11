export function formatTime(hour) {
  const h12 = hour % 12 || 12;
  const ampm = hour < 12 ? "AM" : "PM";
  return `${String(h12).padStart(2, "0")}:00 ${ampm}`;
}

export function parseSlotRange(slotText, hoursFallback = 1) {
  if (!slotText) return null;

  const str = String(slotText);

  // Match e.g. "06:00 PM - 08:00 PM" or "6:00 PM - 8:00 PM" or "6 PM - 8 PM"
  const rangeRegex = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i;
  const rangeMatch = str.match(rangeRegex);

  if (rangeMatch) {
    let startH = parseInt(rangeMatch[1], 10);
    const startM = parseInt(rangeMatch[2] || "0", 10);
    const startAmPm = rangeMatch[3].toUpperCase();

    let endH = parseInt(rangeMatch[4], 10);
    const endM = parseInt(rangeMatch[5] || "0", 10);
    const endAmPm = rangeMatch[6].toUpperCase();

    if (startAmPm === "PM" && startH < 12) startH += 12;
    if (startAmPm === "AM" && startH === 12) startH = 0;

    if (endAmPm === "PM" && endH < 12) endH += 12;
    if (endAmPm === "AM" && endH === 12) endH = 0;

    return {
      startHour: startH + startM / 60,
      endHour: endH + endM / 60,
      raw: str,
    };
  }

  // Fallback: match starting time and apply hoursFallback
  const singleRegex = /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i;
  const singleMatch = str.match(singleRegex);
  if (singleMatch) {
    let startH = parseInt(singleMatch[1], 10);
    const startM = parseInt(singleMatch[2] || "0", 10);
    const startAmPm = singleMatch[3].toUpperCase();

    if (startAmPm === "PM" && startH < 12) startH += 12;
    if (startAmPm === "AM" && startH === 12) startH = 0;

    const start = startH + startM / 60;
    return {
      startHour: start,
      endHour: start + Number(hoursFallback || 1),
      raw: str,
    };
  }

  return null;
}

/**
 * Checks if a proposed slot [startHour, startHour + durationHours)
 * overlaps with any already booked slots on the same date.
 */
export function getSlotBookingStatus(startHour, durationHours, bookedSlots = []) {
  const proposedStart = Number(startHour);
  const proposedEnd = proposedStart + Number(durationHours);

  for (const booked of bookedSlots) {
    const text = booked.turf_slot || booked.order_note || "";
    const hours = booked.turf_hours || booked.quantity || 1;
    const range = parseSlotRange(text, hours);

    if (range) {
      // Overlap condition: proposedStart < range.endHour AND proposedEnd > range.startHour
      if (proposedStart < range.endHour && proposedEnd > range.startHour) {
        return {
          isBooked: true,
          conflictingSlot: text,
          range,
        };
      }
    }
  }

  return { isBooked: false, conflictingSlot: null, range: null };
}

export function isTurfSlotOverlapping(startHour, durationHours, bookedSlots = []) {
  return getSlotBookingStatus(startHour, durationHours, bookedSlots).isBooked;
}

