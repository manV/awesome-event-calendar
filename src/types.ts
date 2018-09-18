import { Moment } from 'moment';

export enum ColumnDurationEnum {
  week = 'week',
  day = 'day'
}

export interface ITimeInterval {
  startDate: Moment;
  endDate: Moment;
}

export interface IRowData<T> {
  [key: string]: Array<Array<ISegmentData<T>>>;
}

export interface ICalendarProps<T> {
  columnDuration: ColumnDurationEnum;
  startDate: Moment;
  endDate: Moment;
  data: IData<T>;
  children: (
    renderProps: {
      columnStartAndEndDates: ITimeInterval[];
      rowsData: IRowData<T>
    }
  ) => JSX.Element;
}

export interface IData<T> {
  [key: string]: Array<{
    startDate: string;
    endDate: string;
    metadata: T;
  }>;
}

export interface IContext {
  columnDuration: ColumnDurationEnum;
}

export interface ISegmentData<T> {
  startDate: Moment;
  endDate: Moment;
  width: number;
  metadata: T;
  isFake: boolean;
  clipRight: boolean;
  clipLeft: boolean;
}
