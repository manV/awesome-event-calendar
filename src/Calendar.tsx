import * as React from 'react';
import Row from './components/Row';
import styled from './styled';

const CalendarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 0 0px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  &:first-child {
    border-top: 1px solid #ddd;
  }
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
`;

import {
  getStartAndEndDates,
  getNumberOfWeeksBetweenDates,
  getColumnWeekStartAndEndDates
} from './utils/time';

import {
  ICalendarProps,
  ICalendarState,
  CalendarDefaultViewEnum
} from './types';

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
  constructor(props: ICalendarProps) {
    super(props);
    const startMonth = this.props.startMonth || (new Date()).getMonth();
    const startYear = this.props.startYear || (new Date()).getFullYear();
    const defaultView = this.props.defaultView || CalendarDefaultViewEnum.month;
    const {
      startDate,
      endDate
    } = getStartAndEndDates(startMonth, startYear, defaultView);
    const numberOfWeeks = getNumberOfWeeksBetweenDates(startDate, endDate);
    const weekStartAndEndDates = getColumnWeekStartAndEndDates(startDate, numberOfWeeks);
    this.state = {
      headerColumnWidth: this.props.headerColumnWidth || 20,
      bodyColumnWidth: 100 - (this.props.headerColumnWidth || 20),
      defaultView,
      startMonth,
      startYear,
      startDate,
      endDate,
      numberOfWeeks,
      numberOfDays: numberOfWeeks * 7,
      weekStartAndEndDates
    };
  }
  render() {
    return (
      <div className="awesome-calendar">
        <CalendarWrapper>
          {/* header */}
          <Row
            headerColumnWidth={this.state.headerColumnWidth}
            bodyColumnWidth={this.state.bodyColumnWidth}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            defaultView={this.state.defaultView}
            weekStartAndEndDates={this.state.weekStartAndEndDates}
            header="TEST HEADER"
          />
          {/* body */}
          {
            Object.keys(this.props.data).map((key) => {
              return <Row
                headerColumnWidth={this.state.headerColumnWidth}
                bodyColumnWidth={this.state.bodyColumnWidth}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                defaultView={this.state.defaultView}
                weekStartAndEndDates={this.state.weekStartAndEndDates}
                data={this.props.data[key]}
                header={key}
                key={key}
              />;
            })
          }
        </CalendarWrapper>
      </div>
    );
  }
}
