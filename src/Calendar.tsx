import * as React from 'react';
import * as moment from 'moment';
import * as types from './types';
import { Provider, defaultContextValues } from './context';

import {
  getStartAndEndDates,
  getColumnStartAndEndDates,
  fillDataWithFakeEvents,
  groupNonConflictingEvents
} from './utils/time';

export default class Calendar<T> extends React.Component<types.ICalendarProps<T>> {
  render() {
    const {
      startDate,
      endDate
    } = getStartAndEndDates({
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      columnDuration: this.props.columnDuration
    });
    const columnStartAndEndDates = getColumnStartAndEndDates({
      startDate,
      endDate,
      columnDuration: this.props.columnDuration
    });
    const rowKeys = Object.keys(this.props.data);
    const rowsData: types.IRowData<T> = {};
    rowKeys.forEach((rowKey) => {
      const rowData = this.props.data[rowKey];
      rowsData[rowKey] = fillDataWithFakeEvents(startDate, endDate, groupNonConflictingEvents(rowData));
    });

    return (
      <Provider value={{
        columnDuration: this.props.columnDuration
      }}>
        {
          this.props.children({
            columnStartAndEndDates,
            rowsData
          })
        }
      </Provider>
    );
  }
  static defaultProps = {
    startDate: moment.utc().startOf(defaultContextValues.columnDuration),
    endDate: moment.utc().startOf(defaultContextValues.columnDuration).add(6, defaultContextValues.columnDuration),
    columnDuration: defaultContextValues.columnDuration
  };
}
