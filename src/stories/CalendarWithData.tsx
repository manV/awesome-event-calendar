import * as React from 'react';
import Calendar from './../Calendar';
import { CalendarDefaultViewEnum, ITimeInterval, ISegmentData } from '../types';
import styled from './../styled';

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

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const CellWrapper = styled.div`
  height: auto;
  padding: 0.5rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-weight: 600;
  &:not(:first-child) {
    border-left: 1px solid #ddd;
  }
  &:first-child {
    border-right: 1px solid #ddd;
  }
  border-bottom: 1px solid #ddd;
`;

const RowBodyWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const BgWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const RowContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5px 0;
`;

const RowSegment = styled.div`
  background-color: red;
  padding: 8px 0;
  word-wrap: break-word;
  display: flex;
`;

export class CalendarWithData extends React.Component {
  state = {
    headerColumnWidth: 20,
    bodyColumnsWidth: 80
  };
  getColumnWidth = (bodyColumnCount: number) => {
    return this.state.bodyColumnsWidth / bodyColumnCount;
  }
  data = {
    'test': [{
      startDate: '2017-12-25',
      endDate: '2018-01-01',
      metadata: {
        name: 'blah blah blah lorem ipsum'
      }
    }, {
      startDate: '2018-01-01',
      endDate: '2018-01-05',
      metadata: {
        name: 'blah blah blah lorem ipsum'
      }
    }, {
      startDate: '2018-01-03',
      endDate: '2018-01-07',
      metadata: {
        name: 'blah blah blah lorem ipsum'
      }
    }],
    'test 1': [{
      startDate: '2017-12-25',
      endDate: '2018-01-01',
      metadata: {
        name: 'blah blah blah lorem ipsum'
      }
    }, {
      startDate: '2018-01-01',
      endDate: '2018-01-05',
      metadata: {
        name: 'blah blah blah lorem ipsum'
      }
    }, {
      startDate: '2018-01-03',
      endDate: '2018-01-07',
      metadata: {
        name: 'blah blah blah lorem ipsum'
      }
    }]
  };
  renderHeader = (weekStartAndEndDates: ITimeInterval[]): JSX.Element => {
    const bodyColumnWidth = this.getColumnWidth(weekStartAndEndDates.length);
    return (
      <RowWrapper>
        <CellWrapper style={{
          width: `${this.state.headerColumnWidth}%`
        }}>Header Stuff</CellWrapper>
        {
          weekStartAndEndDates.map((headerColData) => {
            return <CellWrapper style={{
              width: `${bodyColumnWidth}%`
            }}>{headerColData.startDate.format('YYYY-MM-DD')}</CellWrapper>;
          })
        }
      </RowWrapper>
    );
  }
  renderRow = ({
    key,
    rowData,
    rowIndex,
    weekStartAndEndDates
  }: {
    key: string;
    rowData: ISegmentData[][];
    rowIndex: number;
    weekStartAndEndDates: ITimeInterval[]
  }): JSX.Element => {
    const bodyColumnWidth = 100 / weekStartAndEndDates.length;
    return (
      <RowWrapper>
        <CellWrapper style={{
          width: `${this.state.headerColumnWidth}%`
        }}>{key}</CellWrapper>
        <RowBodyWrapper style={{
          width: `${this.state.bodyColumnsWidth}%`
        }}>
          <BgWrapper>
            {
              weekStartAndEndDates.map(() => {
                return <CellWrapper style={{
                  width: `${bodyColumnWidth}%`
                }}>{' '}</CellWrapper>;
              })
            }
          </BgWrapper>
          <RowContent style={{ width: '100%' }}>
            {
              rowData.map((subRowData, index) => this.renderSubRow({
                subRowData,
                subRowIndex: index
              }))
            }
          </RowContent>
        </RowBodyWrapper>
      </RowWrapper>
    );
  }
  renderSubRow = ({
    subRowData,
    subRowIndex
  }: {
    subRowData: ISegmentData[];
    subRowIndex: number;
  }) => {
    return (
      <Row>
        {
          subRowData.map((segmentData, index) => this.renderSegment({
            segmentData, index
          }))
        }
      </Row>
    );
  }
  renderSegment = ({
    segmentData,
    index
  }: {
    segmentData: ISegmentData;
    index: number;
  }): JSX.Element => {
    return <RowSegment style={{
      flexBasis: `${segmentData.width}%`,
      maxWidth: `${segmentData.width}%`,
      backgroundColor: `${segmentData.isFake ? 'transparent' : '#3174ad'}`,
      borderTopLeftRadius: `${segmentData.clipLeft ? '0' : '10px'}`,
      borderBottomLeftRadius: `${segmentData.clipLeft ? '0' : '10px'}`,
      borderTopRightRadius: `${segmentData.clipRight ? '0px' : '10px'}`,
      borderBottomRightRadius: `${segmentData.clipRight ? '0px' : '10px'}`,
    }}>
      {segmentData.isFake ? '' : segmentData.metadata.name}
    </RowSegment>;
  }
  render() {
    return (
      <Calendar
        view={CalendarDefaultViewEnum.day}
        startMonth={0}
        startDayOfMonth={1}
        startYear={2018}
        data={this.data}
      >
        {({ rowsData, weekStartAndEndDates }) => {
          return (
            <CalendarWrapper>
              { this.renderHeader(weekStartAndEndDates) }
              {
                Object
                  .keys(rowsData)
                  .map((key, index) => {
                    return this
                      .renderRow({
                        key,
                        rowData: rowsData[key],
                        rowIndex: index,
                        weekStartAndEndDates
                      });
                  })
              }
            </CalendarWrapper>
          );
        }}
      </Calendar>
    );
  }
}
