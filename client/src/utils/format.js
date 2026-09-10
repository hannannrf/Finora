export const DEFAULT_CURRENCY = 'PKR';

export function formatCurrency(amount, currency = DEFAULT_CURRENCY) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Compact form for chart axes: Rs 5K, Rs 1.2M
export function formatCompactCurrency(amount, currency = DEFAULT_CURRENCY) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}

// Reads a 'YYYY-MM-DD' date as a local calendar date. Returns null if it can't.
export function parseDateOnly(value) {
  if (!value) return null;
  const [y, m, d] = String(value).slice(0, 10).split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function formatDate(value) {
  const date = parseDateOnly(value);
  if (!date) return '';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// A date as 'YYYY-MM-DD' in the user's own timezone, for <input type="date">.
// Don't use toISOString() for this: it's UTC, so in Pakistan it gives
// yesterday's date between midnight and 5 AM.
export function toDateInputValue(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatMonthYear(month, year) {
  const date = new Date(year, month - 1, 1);
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export function getCurrentMonthYear() {
  const now = new Date();
  return { month: now.getMonth() + 1, year: now.getFullYear() };
}

export function budgetStatusColor(status) {
  if (status === 'over') return 'bg-rose-500';
  if (status === 'warning') return 'bg-amber-500';
  return 'bg-blue-500';
}

export function monthStartEnd(month, year) {
  const start = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const end = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
  return { start, end };
}
