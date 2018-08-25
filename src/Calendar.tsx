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
    const headerColumnWidth = this.props.headerColumnWidth || 20;
    const bodyColumnWidth = 100 - (this.props.headerColumnWidth || 20);
    return (
      <Provider value={{
        view: this.props.view
      }}>
        <div className="awesome-calendar">
          <CalendarWrapper>
            {/* header */}
            <Row
              headerColumnText={this.props.headerColumnText}
              headerColumnWidth={headerColumnWidth}
              bodyColumnWidth={bodyColumnWidth}
              startDate={startDate}
              endDate={endDate}
              weekStartAndEndDates={weekStartAndEndDates}
              isHeader={true}
              renderTableHeaderCell={this.props.renderTableHeaderCell}
            />
            {/* body */}
            {
              Object.keys(this.props.data).map((key) => {
                return <Row
                  isHeader={false}
                  headerColumnText={key}
                  headerColumnWidth={headerColumnWidth}
                  bodyColumnWidth={bodyColumnWidth}
                  startDate={startDate}
                  endDate={endDate}
                  weekStartAndEndDates={weekStartAndEndDates}
                  data={this.props.data[key]}
                  key={key}
                  renderSegment={this.props.renderSegment}
                  renderRowHeaderCell={this.props.renderRowHeaderCell}
                />;
              })
            }
          </CalendarWrapper>
        </div>
      </Provider>
    );
  }
  static defaultProps = {
    startYear: (new Date()).getFullYear(),
    startMonth: (new Date()).getMonth(),
    view: defaultContextValues.view,
    renderSegment: defaultRenderSegment,
    renderTableHeaderCell: defaultRenderTableHeaderCell,
    renderRowHeaderCell: defaultRenderRowHeaderCell,
    headerColumnWidth: 20,
    startDayOfMonth: 1,
    headerColumnText: ''
  };
}
