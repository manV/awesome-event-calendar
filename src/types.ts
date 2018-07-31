import { Moment } from 'moment';

export enum CalendarDefaultViewEnum {
  month= 'month',
  quarter= 'quarter',
  day= 'day'
}

interface ITimeInterval {
  startDate: Moment;
  endDate: Moment;
}

export interface ICalendarProps {
  defaultView?: CalendarDefaultViewEnum;
  headerColumnWidth?: number;
  startMonth?: number;
  startYear?: number;
  data: IData;
}

export interface ICalendarState {
  headerColumnWidth: number;
  bodyColumnWidth: number;
  defaultView: CalendarDefaultViewEnum;
  startMonth: number;
  startYear: number;
  startDate: string;
  endDate: string;
  numberOfWeeks: number;
  numberOfDays: number;
  weekStartAndEndDates: ITimeInterval[];
}

export interface IRowProps {
  defaultView: CalendarDefaultViewEnum;
  headerColumnWidth: number;
  bodyColumnWidth: number;
  startDate: string;
  endDate: string;
  weekStartAndEndDates: ITimeInterval[];
  data?: Array<{
    startDate: string;
    endDate: string;
  }>;
  header: string;
}

export interface IData {
  [key: string]: Array<{
    startDate: string;
    endDate: string;
  }>;
}
