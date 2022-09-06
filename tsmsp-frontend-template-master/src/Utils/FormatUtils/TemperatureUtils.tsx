function isNumber(str: string): boolean {
  if (str.trim() === "") return false;
  return !Number.isNaN(Number(str));
}
export function checkTemperature(str: string): boolean {
  const result = isNumber(str)
    ? parseInt(str) > 30 && parseInt(str) < 50
    : false;
  return result;
}
