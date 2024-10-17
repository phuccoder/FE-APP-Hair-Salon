export function formatPrice(value: number) {
  if (isNaN(value)) return 'Invalid number';

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0, // No decimals for VND
  }).format(value);
}
