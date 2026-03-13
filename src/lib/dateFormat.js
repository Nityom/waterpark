function pad(value) {
  return String(value).padStart(2, "0");
}

function parseInputDate(value) {
  if (!value) {
    return null;
  }

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatShortDate(value) {
  const date = parseInputDate(value);

  if (!date) {
    return "-";
  }

  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1);
  const year = String(date.getUTCFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
}

export function formatDateTimeShort(value) {
  if (!value) {
    return "-";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value])
  );

  return `${values.day}-${values.month}-${values.year} ${values.hour}:${values.minute}`;
}

export function formatDateRangeLabel(label) {
  if (!label) {
    return "-";
  }

  if (!String(label).includes(" to ")) {
    return formatShortDate(label);
  }

  const [from, to] = String(label).split(" to ");
  return `${formatShortDate(from)} to ${formatShortDate(to)}`;
}
