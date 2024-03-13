export function setLocalStorage(str: string, nodeElement: string) {
  const node = nodeElement;
  localStorage.setItem(str, node);
}

export function isLocalStorageGetItem() {
  return localStorage.getItem('firstname') && localStorage.getItem('surname');
}

export function clearLocalStorage() {
  if (localStorage.getItem('firstname')) {
    localStorage.removeItem('firstname');
  }
  if (localStorage.getItem('surname')) {
    localStorage.removeItem('surname');
  }
}
