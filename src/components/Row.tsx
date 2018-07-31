import * as React from 'react';
import styled from './../styled';
import { Moment } from 'moment';
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

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
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

const Content = styled.div`
  /* background-color: cyan; */
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
          <ContentWrapper style={{width: '100%'}}>
            <Content style={{marginLeft: '50%', width: '20%', backgroundColor: 'red'}}>shit</Content>
            <Content style={{marginLeft: '20%', width: '10%', backgroundColor: 'red'}}>shit</Content>
          </ContentWrapper>
        </RowBodyWrapper>
      </RowWrapper>
    );
  }
}
