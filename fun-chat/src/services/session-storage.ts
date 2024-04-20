import { CurrentUser } from '../utils/current-user';

export function setSessionStorage(obj: CurrentUser) {
  const keyValueArray = Object.entries(obj);
  keyValueArray.forEach(([key, value]) => {
    if (key !== 'password') {
      sessionStorage.setItem(key, String(value));
    }
  });
}

export function getSessionStorage(key: string) {
  let value;
  if (sessionStorage.has(key)) {
    value = sessionStorage.getItem(key);
  }
  return value;
}
