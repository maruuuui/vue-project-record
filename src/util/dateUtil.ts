// DateをYYYY-MM-DD形式にフォーマットする
export function dateToString(d: Date): string {
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1).toString()).slice(-2);
  const day = ("0" + d.getDate().toString()).slice(-2);
  const formatted = `${year}-${month}-${day}`;
  return formatted;
}

// YYYY-MM-DD形式の文字列をDateにフォーマットする
export function stringToDate(s: string) {
  const epoc = Date.parse(s);
  const date = new Date(epoc);
  return date;
}
