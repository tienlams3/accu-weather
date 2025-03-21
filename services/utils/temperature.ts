export function formatTemperature(value: number, decimal: number = 2) {
  return `${value.toFixed(decimal)}°C`;
}

export function format2Temperature(
  value1: number,
  value2: number,
  decimal: number = 2
) {
  return `${value1.toFixed(decimal)}/${value2.toFixed(decimal)}°C`;
}
