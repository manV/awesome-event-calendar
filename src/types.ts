import { Moment } from 'moment';

export enum CalendarDefaultViewEnum {
  month= 'month',
  quarter= 'quarter',
  day= 'day'
}

export interface ITimeInterval {
  startDate: Moment;
  endDate: Moment;
}

export interface IRowData {
  [key: string]: ISegmentData[][];
}

export interface ICalendarProps {
  view: CalendarDefaultViewEnum;
  headerColumnWidth: number;
  startMonth: number;
  startYear: number;
  startDayOfMonth: number;
  data: IData;
  children: (
    renderProps: {
      weekStartAndEndDates: ITimeInterval[];
      rowsData: IRowData
    }
  ) => JSX.Element;
}

export interface IData {
  [key: string]: Array<{
    startDate: string;
    endDate: string;
    metadata: any;
  }>;
}

export interface IContext {
  view: CalendarDefaultViewEnum;
}

export interface ISegmentData {
  startDate: Moment;
  endDate: Moment;
  width: number;
  metadata: any;
  isFake: boolean;
  clipRight: boolean;
  clipLeft: boolean;
}
