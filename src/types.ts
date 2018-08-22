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
  view?: CalendarDefaultViewEnum;
  headerColumnWidth?: number;
  startMonth?: number;
  startYear?: number;
  data: IData;
  headerColumnText?: string;
}

export interface ICalendarState {
  headerColumnWidth: number;
  bodyColumnWidth: number;
  view: CalendarDefaultViewEnum;
  startMonth: number;
  startYear: number;
  startDate: string;
  endDate: string;
  numberOfWeeks: number;
  numberOfDays: number;
  weekStartAndEndDates: ITimeInterval[];
}

export interface IRowProps {
  view: CalendarDefaultViewEnum;
  headerColumnWidth: number;
  bodyColumnWidth: number;
  startDate: string;
  endDate: string;
  weekStartAndEndDates: ITimeInterval[];
  data?: Array<{
    startDate: string;
    endDate: string;
  }>;
  headerColumnText?: string;
  isHeader: boolean;
}

export interface IData {
  [key: string]: Array<{
    startDate: string;
    endDate: string;
  }>;
}

export interface IContext {
  view: CalendarDefaultViewEnum;
  headerColumnWidth: number;
  startMonth: number;
  startYear: number;
  data: IData;
  headerColumnText: string;
}
