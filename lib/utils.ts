import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEmptyObject = (obj: Record<string, unknown>) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
