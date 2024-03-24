export default async function fetchCreateCar(name: string = '', color: string = '#10100F') {
  const data = { name, color };
  console.log(JSON.stringify(data));
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch('http://127.0.0.1:3000/garage', config);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    return false;
  }
  return false;
}
