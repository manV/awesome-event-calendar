import * as React from 'react';
import styled from './../styled';
import { groupNonConflictingEvents, fillDataWithFakeEvents } from '../utils/time';
import {
  IRowProps
} from '../types';
import Cell from './Cell';

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
`;

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
          index={-1}
          headerColumnText={this.props.headerColumnText}
          isHeader={this.props.isHeader}
        />
        <RowBodyWrapper style={{width: `${100 - this.state.headerCellWidth}%`}}>
          <BgWrapper>
            {
              this.props.weekStartAndEndDates.map(({ startDate, endDate }, index) => {
                return <Cell
                  index={index}
                  width={this.state.cellWidth}
                  isHeader={this.props.isHeader}
                  startDate={startDate}
                  endDate={endDate}
                  key={index}
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
              ).map((rowData, index) => {
                return (
                  <Row key={index}>
                    {
                      rowData.map((segmentData, i) => {
                        return (
                          <RowSegment key={i} style={{
                            flexBasis: `${segmentData.width}%`,
                            maxWidth: `${segmentData.width}%`,
                            backgroundColor: `${segmentData.isFake ? 'transparent' : '#3174ad'}`,
                            borderTopLeftRadius: `${segmentData.clipLeft ? '0' : '10px'}`,
                            borderBottomLeftRadius: `${segmentData.clipLeft ? '0' : '10px'}`,
                            borderTopRightRadius: `${segmentData.clipRight ? '0px' : '10px'}`,
                            borderBottomRightRadius: `${segmentData.clipRight ? '0px' : '10px'}`,
                          }}>{
                            segmentData.isFake ?
                              ' ' :
                              `${
                                segmentData.startDate.format('DD')
                              }<>${
                                segmentData.endDate.format('DD')
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
