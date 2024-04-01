import { Car, Limits, Params, ResultRow, Winner } from '../interfaces';

const baseAddress = 'http://127.0.0.1:3000';

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
    const response = await fetch(`${baseAddress}/garage`, config);
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
    const response = await fetch(`${baseAddress}/garage/${id}`, config);
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
    const response = await fetch(`${baseAddress}/garage/${id}`, config);
    if (response.ok) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchDeleteWinner(id: number) {
  const config = {
    method: 'DELETE',
  };
  try {
    const response = await fetch(`${baseAddress}/winners/${id}`, config);
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
    const response = await fetch(`${baseAddress}/garage/?_limit=7`);
    if (response.ok) {
      return response.headers.get('X-Total-Count');
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchGetCar(id: number) {
  try {
    const response = await fetch(`${baseAddress}/garage/${id}`);
    if (response.ok) {
      const answer = await response.json();
      return answer;
    }
  } catch {
    return false;
  }
  return false;
}

export function glue(arr: Winner[], data: Car[], newArray: ResultRow) {
  arr.forEach((item: Winner, index: number) => {
    const newObj = Object.assign(item, data[index]);
    newArray.push(newObj);
  });
  return newArray;
}

export async function createWinnerRow(arr: Winner[], newArr: ResultRow) {
  const data = [];
  for (let i = 0; i < arr.length; i += 1) {
    data.push(fetchGetCar(arr[i].id));
  }
  const gluedArray = glue(arr, await Promise.all(data), newArr);
  return gluedArray;
}

export async function fetchGetArrayOfCars(countOfPage: number) {
  try {
    const response = await fetch(`${baseAddress}/garage/?_page=${countOfPage}&_limit=7`);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchDriveEngine(id: number) {
  const config = {
    method: 'PATCH',
  };
  try {
    const response = await fetch(`${baseAddress}/engine?id=${id}&status=drive`, config);

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
    const response = await fetch(`${baseAddress}/engine?id=${id}&status=started`, config);
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
    const response = await fetch(`${baseAddress}/engine?id=${id}&status=stopped`, config);
    if (response.ok) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchCreateWinner(id: number, wins: number, time: number) {
  const data = { id, wins, time };
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(`${baseAddress}/winners`, config);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchUpdateWinner(responseObj: Winner, newTime: number) {
  let { wins, time } = responseObj;
  const { id } = responseObj;
  wins += 1;
  time = newTime < time ? newTime : time;
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wins, time }),
  };
  try {
    const response = await fetch(`${baseAddress}/winners/${id}`, config);
    if (response.ok) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchGetWinner(id: number, time: number, wins: number = 1) {
  try {
    const response = await fetch(`${baseAddress}/winners/${id}`);
    if (response.ok) {
      const answer: Winner = await response.json();
      fetchUpdateWinner(answer, time);
      return await response.json();
    }
  } catch {
    return false;
  }

  await fetchCreateWinner(id, wins, time);
  return true;
}

export async function fetchGetArrayOfWinners(params: Params) {
  const p: { [key: string]: string } = {
    _page: String(params.page),
    _limit: String(Limits.pageWinners),
  };
  const p1: { [key: string]: string } = {};
  if (params.sort) {
    Object.defineProperties(p1, {
      _sort: {
        value: params.sort,
        enumerable: true,
      },
    });
  }
  if (params.order) {
    Object.defineProperties(p1, {
      _order: {
        value: params.order,
        enumerable: true,
      },
    });
  }
  try {
    const url = new URL(`${baseAddress}/winners/`);
    const query = new URLSearchParams({ ...p, ...p1 }).toString();
    url.search = query;
    const response = await fetch(url.toString());
    if (response.ok) {
      return await response.json();
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchGetCountOfWinners() {
  try {
    const response = await fetch(`${baseAddress}/winners/?_limit=10`);
    if (response.ok) {
      return response.headers.get('X-Total-Count');
    }
  } catch {
    return false;
  }
  return false;
}
