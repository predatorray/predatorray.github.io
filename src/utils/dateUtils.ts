export function parseDate(dateStr: string, isEnd: boolean = false): Date {
  if (dateStr === 'Present') {
    const now = new Date();
    if (isEnd) {
      // Last day of the current month
      return new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }
  const parts = dateStr.trim().split(/\s+/);
  let year: number;
  let month: number;
  if (parts.length === 1) {
    // YYYY format
    year = parseInt(parts[0], 10);
    month = 0; // January
  } else {
    // MMM YYYY or Month YYYY format
    const monthMap: { [key: string]: number } = {
      'jan': 0, 'january': 0,
      'feb': 1, 'february': 1,
      'mar': 2, 'march': 2,
      'apr': 3, 'april': 3,
      'may': 4,
      'jun': 5, 'june': 5,
      'jul': 6, 'july': 6,
      'aug': 7, 'august': 7,
      'sep': 8, 'september': 8,
      'oct': 9, 'october': 9,
      'nov': 10, 'november': 10,
      'dec': 11, 'december': 11
    };
    
    month = monthMap[parts[0].toLowerCase()] ?? 0;
    year = parseInt(parts[1], 10);
  }

  if (isEnd) {
    if (parts.length === 1) {
      // For YYYY format, the end is Dec 31
      return new Date(year, 11, 31);
    }
    // For Month YYYY format, the end is the last day of that month
    return new Date(year, month + 1, 0);
  }
  return new Date(year, month, 1);
}

export function calculateTenure(from: string, to: string): { years: number; months: number } {
  const startDate = parseDate(from, false);
  const endDate = parseDate(to, true);

  // Standard calculation using dates.
  // We want to count total months between two dates.
  // For example, Jan 1, 2021 to Feb 28, 2021 is exactly 2 full months.
  // If we just subtract months: (1 - 0) + 1 = 2.
  // Actually, if we use the first day of the start month and the last day of the end month,
  // then the number of months is:
  // (EndYear - StartYear) * 12 + (EndMonth - StartMonth) + 1
  
  let totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
  
  let years = Math.floor(totalMonths / 12);
  let months = totalMonths % 12;

  return { years, months };
}

export function formatTenure(years: number, months: number): string {
  const yearsStr = years > 0 ? `${years} yr${years > 1 ? 's' : ''}` : '';
  const monthsStr = months > 0 ? `${months} mo${months > 1 ? 's' : ''}` : '';

  if (yearsStr && monthsStr) {
    return `${yearsStr} and ${monthsStr}`;
  }
  return yearsStr || monthsStr || '0 mos';
}
