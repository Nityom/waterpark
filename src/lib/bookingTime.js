const BOOKING_TIME_ZONE = "Asia/Kolkata";
const SAME_DAY_CUTOFF_HOUR = 17;

function getTimeParts(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );

  return {
    today: `${values.year}-${values.month}-${values.day}`,
    hour: Number(values.hour),
    minute: Number(values.minute),
  };
}

function getVisitWeekday(visitDate) {
  const [year, month, day] = visitDate.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

export function getTodayInIndia(now = new Date()) {
  return getTimeParts(now).today;
}

export function getDayTypeForVisitDate(visitDate) {
  if (!visitDate) {
    return "regular";
  }

  const visitDay = getVisitWeekday(visitDate);
  return visitDay === 0 ? "sunday" : "regular";
}

export function isPastVisitDate(visitDate, now = new Date()) {
  if (!visitDate) {
    return false;
  }

  return visitDate < getTodayInIndia(now);
}

export function isSameDayBookingClosed(visitDate, now = new Date()) {
  if (!visitDate) {
    return false;
  }

  const { today, hour, minute } = getTimeParts(now);

  if (visitDate !== today) {
    return false;
  }

  return hour > SAME_DAY_CUTOFF_HOUR || (hour === SAME_DAY_CUTOFF_HOUR && minute >= 0);
}

export function getVisitDateValidationMessage(visitDate, now = new Date()) {
  if (!visitDate) {
    return "Please select your visit date.";
  }

  if (isPastVisitDate(visitDate, now)) {
    return "Visit date cannot be in the past.";
  }

  if (isSameDayBookingClosed(visitDate, now)) {
    return "Same-day booking closes at 5:00 PM.";
  }

  return "";
}
