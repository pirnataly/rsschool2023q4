import { Specification } from '../interfaces';

export default function getDuration(specification: Specification): number {
  const duration = specification.distance / specification.velocity;
  return duration;
}
