import { format } from 'date-fns';

export const formatDate = (date: string) => {
  return format(new Date(date), "EEEE do, MMM yyyy 'at' p").toString();
};

export const getPeriodString = (startDate: string, endDate: string) => {
  return `From ${formatDate(startDate)} to ${formatDate(endDate)}`;
};

export function getMonthLabels(dates: Date[]) {
  return dates.map((d) => format(d, 'LLLL'));
}
