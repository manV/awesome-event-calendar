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
  ICalendarState,
  ISegmentData,
  ITimeInterval
} from './types';

const defaultRenderSegment = (segmentData: ISegmentData) => (<span>&nbsp;</span>);
const defaultRenderTableHeaderCell = (index: number, cellInterval: ITimeInterval): JSX.Element => {
  if (cellInterval.startDate.isSame(cellInterval.endDate)) {
    return <span>{`${cellInterval.startDate.format('MM/DD')}`}</span>;
  }
  return <span>{`${cellInterval.startDate.format('MM/DD')}-${cellInterval.endDate.format('MM/DD')}`}</span>;
};
const defaultRenderRowHeaderCell = (text: string) => {
  return <span>{text}</span>;
};

export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
  constructor(props: ICalendarProps) {
    super(props);
    const startMonth = (
      this.props.startMonth !== undefined
      && Number.isInteger(this.props.startMonth)
    ) ? this.props.startMonth : (new Date()).getMonth();
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
      weekStartAndEndDates,
      renderSegment: this.props.renderSegment || defaultRenderSegment,
      renderTableHeaderCell: this.props.renderTableHeaderCell || defaultRenderTableHeaderCell,
      renderRowHeaderCell: this.props.renderRowHeaderCell || defaultRenderRowHeaderCell
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
              renderTableHeaderCell={this.state.renderTableHeaderCell}
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
                  renderSegment={this.state.renderSegment}
                  renderRowHeaderCell={this.state.renderRowHeaderCell}
                />;
              })
            }
          </CalendarWrapper>
        </div>
      </Provider>
    );
  }
}
