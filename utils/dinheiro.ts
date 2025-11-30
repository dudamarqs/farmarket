export const tranformarMoeda = (value: string): number => {
  if (!value) return 0;

  const onlyNumbersAndComma = value.replace(/[^\d,]/g, '');
  const validFloatString = onlyNumbersAndComma.replace(',', '.');
  return parseFloat(validFloatString);
};