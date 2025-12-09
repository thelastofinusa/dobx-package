import { DOBString, DOBInfo } from "./types";
import { MONTHS } from "./utils/monthMap";
import { stripOrdinal } from "./utils/stripOrdinal";

/**
 * Parses various date-of-birth formats into a structured DOBInfo object.
 */
export function parseDOB(dob: DOBString): DOBInfo {
  let cleaned = stripOrdinal(dob.trim().toLowerCase());

  // Replace common date separators with spaces
  cleaned = cleaned
    .replace(/[-\/.,]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const parts = cleaned.split(" ");

  let day: number | null = null;
  let month: number | null = null;
  let year: number | null = null;

  // Identify day, month, year in any supported order
  for (const part of parts) {
    if (/^\d{4}$/.test(part)) {
      year = Number(part);
      continue;
    }

    if (/^\d{1,2}$/.test(part) && Number(part) >= 1 && Number(part) <= 31) {
      if (day === null) day = Number(part);
      continue;
    }

    if (MONTHS[part]) {
      month = MONTHS[part];
      continue;
    }
  }

  // Handle numeric middle-part month: 01 09 2003
  if (!month && /^\d{1,2}$/.test(parts[1])) {
    const tryMonth = Number(parts[1]);
    if (tryMonth >= 1 && tryMonth <= 12) month = tryMonth;
  }

  if (!day || !month || !year) {
    throw new Error(`Invalid date format: "${dob}"`);
  }

  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Could not parse date: "${dob}"`);
  }

  // Age calculation
  const today = new Date();
  const age =
    today.getFullYear() -
    date.getFullYear() -
    (today < new Date(today.getFullYear(), month - 1, day) ? 1 : 0);

  // Leap year check
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

  return {
    day,
    month,
    year,
    date,
    isLeapYear,
    age,
  };
}
