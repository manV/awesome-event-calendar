import * as moment from 'moment';
import { CalendarDefaultViewEnum } from './../types';

export const dateFormatter = 'YYYY-MM-DD';

export const getNumberOfWeeksBetweenDates = (startDate:string, endDate:string) => {
  const diffInDays = moment(endDate, dateFormatter).diff(moment(startDate, dateFormatter), 'days') + 1;
 return Math.ceil(diffInDays / 7);
}

export const getStartAndEndDates = (month: number, year: number, defaultView: CalendarDefaultViewEnum): {
  startDate: string,
  endDate: string
} => {
  const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
  let endDate = '';
  if (defaultView === CalendarDefaultViewEnum.month) {
    endDate = moment(startDate, dateFormatter).endOf('month').endOf('week').format(dateFormatter);
  } else if (defaultView === CalendarDefaultViewEnum.quarter) {
    endDate = moment(startDate, dateFormatter).add(2, 'month').endOf('month').endOf('week').format(dateFormatter);
  } else {
    throw new Error('This should never have happened.');
  }
  return {
    startDate,
    endDate
  }
};