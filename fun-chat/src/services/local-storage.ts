export default function setLocalStorage(str: string, nodeElement: string) {
  const node = nodeElement;
  localStorage.setItem(str, node);
}
