import * as React from 'react';
import Row from './components/Row';
import styled from './styled';
import { Provider, defaultContextValues } from './context';

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
  ICalendarState
} from './types';

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
  constructor(props: ICalendarProps) {
    super(props);
    const startMonth = this.props.startMonth || (new Date()).getMonth();
    const startYear = this.props.startYear || (new Date()).getFullYear();
    const view = this.props.view || defaultContextValues.view;
    const {
      startDate,
      endDate
    } = getStartAndEndDates({
      view,
      dayOfMonth: this.props.startDayOfMonth || 1,
      month: startMonth,
      year: startYear
    });
    const numberOfWeeks = getNumberOfWeeksBetweenDates(startDate, endDate);
    const weekStartAndEndDates = getColumnWeekStartAndEndDates({startDate, numberOfWeeks});
    this.state = {
      headerColumnWidth: this.props.headerColumnWidth || 20,
      bodyColumnWidth: 100 - (this.props.headerColumnWidth || 20),
      view,
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
      <Provider value={{
        view: this.state.view
      }}>
        <div className="awesome-calendar">
          <CalendarWrapper>
            {/* header */}
            <Row
              headerColumnText={this.props.headerColumnText}
              headerColumnWidth={this.state.headerColumnWidth}
              bodyColumnWidth={this.state.bodyColumnWidth}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              weekStartAndEndDates={this.state.weekStartAndEndDates}
              isHeader={true}
            />
            {/* body */}
            {
              Object.keys(this.props.data).map((key) => {
                return <Row
                  isHeader={false}
                  headerColumnText={key}
                  headerColumnWidth={this.state.headerColumnWidth}
                  bodyColumnWidth={this.state.bodyColumnWidth}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  weekStartAndEndDates={this.state.weekStartAndEndDates}
                  data={this.props.data[key]}
                  key={key}
                />;
              })
            }
          </CalendarWrapper>
        </div>
      </Provider>
    );
  }
}
