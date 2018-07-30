import * as React from 'react';
import Header from './components/Header';
import { getStartAndEndDates } from './utils/time';

import { ICalendarProps, CalendarDefaultViewEnum } from './types'

export default class Calendar extends React.Component<ICalendarProps, {}> {
  state = {
    headerColumnWidth: this.props.headerColumnWidth || 20,
    bodyColumnWidth: 100 - (this.props.headerColumnWidth || 20),
    defaultView: this.props.defaultView || CalendarDefaultViewEnum.month,
    startMonth: this.props.startMonth || (new Date()).getMonth(),
    startYear: this.props.startYear || (new Date()).getFullYear()
  }
  render() {
    const {
      startDate,
      endDate
    } = getStartAndEndDates(this.state.startMonth, this.state.startYear, this.state.defaultView);
    return (
      <div>
        <Header
          headerColumnWidth={this.state.headerColumnWidth}
          bodyColumnWidth={this.state.bodyColumnWidth}
          startDate={startDate}
          endDate={endDate}
          defaultView={this.state.defaultView}
        />
      </div>
    );
  }
}
