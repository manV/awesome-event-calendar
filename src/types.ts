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

export interface ICalendarProps {
  view?: CalendarDefaultViewEnum;
  headerColumnWidth?: number;
  startMonth?: number;
  startYear?: number;
  startDayOfMonth?: number;
  data: IData;
  headerColumnText?: string;
  renderSegment?(segmentData: ISegmentData, eventInterval: ITimeInterval): JSX.Element;
  renderRowHeaderCell?(text: string): JSX.Element;
  renderTableHeaderCell?(index: number, cellInterval: ITimeInterval): JSX.Element;
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
  renderSegment(segmentData: ISegmentData, eventInterval: ITimeInterval): JSX.Element;
  renderRowHeaderCell(text: string): JSX.Element;
  renderTableHeaderCell(index: number, cellInterval: ITimeInterval): JSX.Element;
}

export interface IRowProps {
  headerColumnWidth: number;
  bodyColumnWidth: number;
  startDate: string;
  endDate: string;
  weekStartAndEndDates: ITimeInterval[];
  data?: Array<{
    startDate: string;
    endDate: string;
    metadata: any;
  }>;
  headerColumnText?: string;
  isHeader: boolean;
  renderSegment?(segmentData: ISegmentData, eventInterval: ITimeInterval): JSX.Element;
  renderRowHeaderCell?(text: string): JSX.Element;
  renderTableHeaderCell?(index: number, cellInterval: ITimeInterval): JSX.Element;
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
