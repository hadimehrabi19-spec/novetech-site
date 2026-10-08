/**
 * Utilities for Persian numbers, Tomans formatting, and dates
 */

// Convert English digits to Persian digits
export function toPersianDigits(num: number | string): string {
  if (num === null || num === undefined) return '';
  const str = String(num);
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (w) => persianDigits[+w]);
}

// Convert Persian digits to English digits
export function toEnglishDigits(str: string): string {
  if (!str) return '';
  const persianDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  let res = str;
  for (let i = 0; i < 10; i++) {
    res = res.replace(persianDigits[i], String(i));
  }
  return res;
}

// Format price with 3-digit comma separation and Persian digits
export function formatToman(amount: number): string {
  if (isNaN(amount)) return '۰';
  const formattedWithCommas = Math.round(amount).toLocaleString('en-US');
  return toPersianDigits(formattedWithCommas);
}

// Format discount percentage
export function formatPercent(percent: number): string {
  return `${toPersianDigits(percent)}٪-`;
}

// Format rating (e.g. 4.9 to ۴.۹)
export function formatRating(rating: number): string {
  return toPersianDigits(rating.toFixed(1));
}
