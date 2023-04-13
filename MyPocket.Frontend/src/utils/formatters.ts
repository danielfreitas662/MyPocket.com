export const currencyFormat = (value: number | undefined, locale: string) => {
  if (!value) return Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' }).format(0);
  const formatted = Intl.NumberFormat(locale, { style: 'currency', currency: 'BRL' }).format(value);
  return formatted;
};
export const currencyNormalize = (value: string | undefined) => {
  if (!value) return 0;
  value = value.replace(/\R\$/g, '').replace(/\./g, '').replace(',', '.');
  var result = parseFloat(value);
  return result;
};
