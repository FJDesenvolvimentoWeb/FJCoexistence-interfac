// Teste mínimo de importação da date-fns
import { format } from 'date-fns';

export function testDateFns(): string {
  return format(new Date(), 'yyyy-MM-dd');
}
