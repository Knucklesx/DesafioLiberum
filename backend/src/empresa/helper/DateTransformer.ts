import { format } from 'date-fns';
import { ValueTransformer } from 'typeorm';

export class DateTransformer implements ValueTransformer {
  to(value: Date): string {
    return format(value, 'dd/MM/yyyy');
  }
  from(value: string): Date {
    const [day, month, year] = value.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
}

export function isValidDateFormat(date: string): boolean {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(date);
}
