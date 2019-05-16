export default function dateConverter(dateIso) {
  const date = new Date(dateIso);
  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

export function answerConvertor(level) {
  if (level === null) return level;
  if (level === 'N/A') return 3;
  if (level === 'Y') return 1;
  if (level === 'N') return 2;
}
export function riskLevelConvertor(level) {
  if (level === null) return level;
  if (level === 'N/A') return null;
  if (level === 'L') return 1;
  if (level === 'M') return 2;
  if (level === 'H') return 3;
}
