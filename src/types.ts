import { Moment } from 'moment';

export enum ColumnDurationEnum {
  week = 'week',
  day = 'day'
}

export interface ITimeInterval {
  startDate: Moment;
  endDate: Moment;
}

export interface IRowData {
  [key: string]: ISegmentData[][];
}

export interface ICalendarProps {
  columnDuration: ColumnDurationEnum;
  startDate: Moment;
  endDate: Moment;
  data: IData;
  children: (
    renderProps: {
      columnStartAndEndDates: ITimeInterval[];
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
  columnDuration: ColumnDurationEnum;
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
