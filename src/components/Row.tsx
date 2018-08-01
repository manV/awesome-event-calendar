import * as React from 'react';
import styled from './../styled';
import { Moment } from 'moment';
import { groupNonConflictingEvents, fillDataWithFakeEvents } from '../utils/time';
import {
  IRowProps
} from '../types';

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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
`;

const RowContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CellWrapper = styled.div`
  height: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: center;
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

const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const RowSegment = styled.div`
  background-color: red;
`;

const Cell = (props: {
  startDate?: Moment;
  endDate?: Moment;
  width: number;
  index?: number;
  content?: string;
}) => {
  return (
    <CellWrapper style={{
      width: `${props.width}%`
    }}>
      {
        props.content || `${
          props.startDate ? props.startDate.format('MM-DD') : ''
        }<>${
          props.endDate ? props.endDate.format('MM-DD') : ''
        }`
      }
    </CellWrapper>
  );
};

export default class Header extends React.Component<IRowProps, {
  headerCellWidth: number;
  cellWidth: number;
}> {
  constructor(props: IRowProps) {
    super(props);
    const headerCellWidth = this.props.headerColumnWidth;
    const cellWidth = 100 / this.props.weekStartAndEndDates.length;
    this.state = {
      headerCellWidth,
      cellWidth
    };
  }
  render() {
    return (
      <RowWrapper>
        <Cell
          width={this.state.headerCellWidth}
          content={this.props.header}
        />
        <RowBodyWrapper style={{width: `${100 - this.state.headerCellWidth}%`}}>
          <BgWrapper>
            {
              this.props.weekStartAndEndDates.map(({ startDate, endDate }, index) => {
                return <Cell
                  index={index}
                  width={this.state.cellWidth}
                  startDate={startDate}
                  endDate={endDate}
                />;
              })
            }
          </BgWrapper>
          <RowContent style={{width: '100%'}}>
            {
              this.props.data ? fillDataWithFakeEvents(
                this.props.startDate,
                this.props.endDate,
                groupNonConflictingEvents(this.props.data)
              ).map((rowData) => {
                return (
                  <Row>
                    {
                      rowData.map((segmentData) => {
                        return (
                          <RowSegment style={{
                            flexBasis: `${segmentData.width}%`,
                            maxWidth: `${segmentData.width}%`,
                            backgroundColor: `${segmentData.isFake ? 'green' : 'red'}`
                          }}>{
                            segmentData.isFake ?
                              'test' :
                              `${
                                segmentData.startDate.format('MM-DD')
                              }<>${
                                segmentData.endDate.format('MM-DD')
                              }`}
                          </RowSegment>
                        );
                      })
                    }
                  </Row>
                );
              })
              : null
            }
          </RowContent>
        </RowBodyWrapper>
      </RowWrapper>
    );
  }
}
