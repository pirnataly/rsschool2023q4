const baseAdress = 'http://127.0.0.1:3000';

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
    const response = await fetch(`${baseAdress}/garage`, config);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchUpdateCar(id: number, name: string = '', color: string = '#10100F') {
  const data = { name, color };
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${baseAdress}/garage/${id}`, config);
    if (response.ok) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchDeleteCar(id: number) {
  const config = {
    method: 'DELETE',
  };
  try {
    const response = await fetch(`${baseAdress}/garage/${id}`, config);
    if (response.ok) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchGetCountOfCars() {
  try {
    const response = await fetch(`${baseAdress}/garage/?_limit=7`);
    if (response.ok) {
      return response.headers.get('X-Total-Count');
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchGetArrayOfCars(countOfPage: number) {
  try {
    const response = await fetch(`${baseAdress}/garage/?_page=${countOfPage}&_limit=7`);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    return false;
  }
  return false;
}

// animation
export async function fetchDriveEngine(id: number) {
  const config = {
    method: 'PATCH',
  };
  try {
    const response = await fetch(`${baseAdress}/engine?id=${id}&status=drive`, config);
    if (response.status === 500) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchStartEngine(id: number) {
  const config = {
    method: 'PATCH',
  };
  try {
    const response = await fetch(`${baseAdress}/engine?id=${id}&status=started`, config);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchStopEngine(id: number) {
  const config = {
    method: 'PATCH',
  };
  try {
    const response = await fetch(`${baseAdress}/engine?id=${id}&status=stopped`, config);
    if (response.ok) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}
