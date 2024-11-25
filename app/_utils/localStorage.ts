export function getItem(key: string) {
  try {
    const domain = localStorage.getItem(key);
    return domain ? JSON.parse(domain) : undefined;
  } catch {}
}

export function setItem(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
