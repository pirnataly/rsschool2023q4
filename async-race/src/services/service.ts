import Car from '../components/car/car';
import getDuration from '../utils/animation';

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

export async function fetchGetArrayOfCars(countOfPage: number) {
  try {
    const response = await fetch(`http://127.0.0.1:3000/garage/?_page=${countOfPage}&_limit=7`);
    if (response.ok) {
      return await response.json();
    }
  } catch {
    return false;
  }
  return false;
}

// animation
export async function fetchDriveEngine(car: Car, durationTime: number) {
  setTimeout(
    () => {
      (car.carImage as SVGSVGElement).classList.add('car-img_animated-pause');
    },
    durationTime - durationTime / 100,
  );
  const { id } = car;
  const config = {
    method: 'PATCH',
  };
  try {
    const response = await fetch(`${baseAdress}/engine?id=${id}&status=drive`, config);
    if (response.status === 500) {
      (car.carImage as SVGSVGElement).classList.add('car-img_animated-pause');
    }
  } catch {
    return false;
  }
  return false;
}

export async function fetchStartEngine(car: Car) {
  const { id } = car;
  const config = {
    method: 'PATCH',
  };
  try {
    const response = await fetch(`${baseAdress}/engine?id=${id}&status=started`, config);
    if (response.ok) {
      const spec = await response.json();
      const duration = getDuration(spec);
      car.carImage?.classList.add('car-img_animated');
      const car1 = car;
      (car1.carImage as SVGSVGElement).style.animationDuration = `${Math.trunc(duration)}ms`;
      await fetchDriveEngine(car1, duration);
    }
  } catch {
    return false;
  }
  return false;
}
