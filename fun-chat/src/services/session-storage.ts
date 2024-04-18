export function setSessionStorage(str: string, nodeElement: string) {
  const node = nodeElement;
  sessionStorage.setItem(str, node);
}

export function getSessionStorage(key: string) {
  let value;
  if (sessionStorage.has(key)) {
    value = sessionStorage.getItem(key);
  }
  return value;
}
