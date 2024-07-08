export function calculateReservationValue(value_per_day: number, start_date: Date, end_date: Date): number {
    const diffTime = Math.abs(end_date.getTime() - start_date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * value_per_day;
  }
  