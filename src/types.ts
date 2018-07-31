
export enum CalendarDefaultViewEnum {
  month= 'month',
  quarter= 'quarter',
  day= 'day'
}

export interface ICalendarProps {
  defaultView?: CalendarDefaultViewEnum;
  headerColumnWidth?: number;
  startMonth?: number;
  startYear?: number;
}

export interface IHeaderProps {
  defaultView: CalendarDefaultViewEnum;
  headerColumnWidth: number;
  bodyColumnWidth: number;
  startDate: string;
  endDate: string;
}
