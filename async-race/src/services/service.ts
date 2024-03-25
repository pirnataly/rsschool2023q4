export async function fetchCreateCar(name: string = '', color: string = '#10100F') {
  const data = { name, color };
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

export async function fetchGetCountOfCars() {
  try {
    const response = await fetch('http://127.0.0.1:3000/garage/?_limit=7');
    if (response.ok) {
      return response.headers.get('X-Total-Count');
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchGetArrayOfCars(pageNumber: number = 1) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/garage/?page=${pageNumber}&_limit=7`);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    return false;
  }
  return false;
}
