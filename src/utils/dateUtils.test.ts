import { calculateTenure, formatTenure, parseDate } from './dateUtils';

describe('dateUtils', () => {
  test('parseDate should handle "Present"', () => {
    const now = new Date();
    const start = parseDate('Present', false);
    expect(start.getFullYear()).toBe(now.getFullYear());
    expect(start.getMonth()).toBe(now.getMonth());
    expect(start.getDate()).toBe(1);

    const end = parseDate('Present', true);
    expect(end.getFullYear()).toBe(now.getFullYear());
    expect(end.getMonth()).toBe(now.getMonth());
    // Last day of the month
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    expect(end.getDate()).toBe(lastDay);
  });

  test('parseDate should handle Month YYYY', () => {
    const start = parseDate('May 2019', false);
    expect(start.getFullYear()).toBe(2019);
    expect(start.getMonth()).toBe(4); // May is 4
    expect(start.getDate()).toBe(1);

    const end = parseDate('May 2019', true);
    expect(end.getFullYear()).toBe(2019);
    expect(end.getMonth()).toBe(4);
    expect(end.getDate()).toBe(31);
  });

  test('parseDate should handle YYYY', () => {
    const start = parseDate('2010', false);
    expect(start.getFullYear()).toBe(2010);
    expect(start.getMonth()).toBe(0);
    expect(start.getDate()).toBe(1);

    const end = parseDate('2010', true);
    expect(end.getFullYear()).toBe(2010);
    expect(end.getMonth()).toBe(11);
    expect(end.getDate()).toBe(31);
  });

  test('calculateTenure should add inclusive month', () => {
    // Jan 2021 to Feb 2021 should be 2 months
    const { years, months } = calculateTenure('Jan 2021', 'Feb 2021');
    expect(years).toBe(0);
    expect(months).toBe(2);
  });

  test('calculateTenure should handle exactly 1 year', () => {
    // Jan 2021 to Dec 2021 should be 1 year (12 months)
    const { years, months } = calculateTenure('Jan 2021', 'Dec 2021');
    expect(years).toBe(1);
    expect(months).toBe(0);
  });

  test('formatTenure should pluralize and use "and"', () => {
    expect(formatTenure(3, 3)).toBe('3 yrs and 3 mos');
    expect(formatTenure(1, 1)).toBe('1 yr and 1 mo');
    expect(formatTenure(5, 0)).toBe('5 yrs');
    expect(formatTenure(0, 1)).toBe('1 mo');
    expect(formatTenure(0, 10)).toBe('10 mos');
  });

  test('eBay tenure should be 3 yrs and 3 mos', () => {
    const { years, months } = calculateTenure('May 2019', 'Jul 2022');
    expect(formatTenure(years, months)).toBe('3 yrs and 3 mos');
  });

  test('Baidu tenure should be 5 yrs', () => {
    // Jun 2014 to May 2019
    const { years, months } = calculateTenure('Jun 2014', 'May 2019');
    expect(formatTenure(years, months)).toBe('5 yrs');
  });

  test('Baidu Intern tenure should be 1 yr', () => {
    // Jul 2013 to Jun 2014
    const { years, months } = calculateTenure('Jul 2013', 'Jun 2014');
    expect(formatTenure(years, months)).toBe('1 yr');
  });
});
