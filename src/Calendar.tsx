import * as React from 'react';
import { Provider, defaultContextValues } from './context';

import {
  getStartAndEndDates,
  getNumberOfWeeksBetweenDates,
  getColumnWeekStartAndEndDates,
  fillDataWithFakeEvents,
  groupNonConflictingEvents
} from './utils/time';

import {
  ICalendarProps, IRowData
} from './types';

export default class Calendar extends React.Component<ICalendarProps> {
  render() {
    const {
      startDate,
      endDate
    } = getStartAndEndDates({
      view: this.props.view,
      dayOfMonth: this.props.startDayOfMonth,
      month: this.props.startMonth,
      year: this.props.startYear
    });
    const numberOfWeeks = getNumberOfWeeksBetweenDates(startDate, endDate);
    const weekStartAndEndDates = getColumnWeekStartAndEndDates({startDate, numberOfWeeks});
    const rowKeys = Object.keys(this.props.data);
    const rowsData: IRowData = {};
    rowKeys.forEach((rowKey) => {
      const rowData = this.props.data[rowKey];
      rowsData[rowKey] = fillDataWithFakeEvents(startDate, endDate, groupNonConflictingEvents(rowData));
    });

    return (
      <Provider value={{
        view: this.props.view
      }}>
        {
          this.props.children({
            weekStartAndEndDates,
            rowsData
          })
        }
      </Provider>
    );
  }
  static defaultProps = {
    startYear: (new Date()).getFullYear(),
    startMonth: (new Date()).getMonth(),
    view: defaultContextValues.view,
    headerColumnWidth: 20,
    startDayOfMonth: 1
  };
}
