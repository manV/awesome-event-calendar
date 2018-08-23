import * as moment from 'moment';
import styled from './../styled';
import * as React from 'react';
import { ITimeInterval } from '../types';

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

const defaultOnCellClick = (
  startDate: moment.Moment,
  endDate: moment.Moment,
  index: number,
  isHeader: boolean
) => {
  alert(`${startDate.format('MM/DD')}-${endDate.format('MM/DD')}`);
};

export default (props: {
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  width: number;
  index: number;
  isHeader: boolean;
  headerColumnText?: string;
  renderRowHeaderCell?: (text: string) => JSX.Element
  renderTableHeaderCell?: (index: number, cellInterval: ITimeInterval) => JSX.Element
  onCellClick?: (startDate: moment.Moment, endDate: moment.Moment, index: number, isHeader: boolean) => never;
}) => {
  const onCellClick = props.onCellClick || defaultOnCellClick;
  if (props.isHeader) {
    return (
      <CellWrapper
        style={{
          width: `${props.width}%`
        }}
        onClick={
          () => onCellClick(props.startDate || moment(), props.endDate || moment(), props.index, props.isHeader)
        }
      >
        {
          props.index === -1
            ? (
              props.headerColumnText || 'DEFAULT TITLE'
            ) : (
              props.renderTableHeaderCell
              ? props.renderTableHeaderCell(props.index, {
                startDate: props.startDate || moment(),
                endDate: props.endDate || moment()
              }) : ' '
            )
        }
      </CellWrapper>
    );
  }
  return (
    <CellWrapper style={{
      width: `${props.width}%`
    }}>
      {
        props.index === -1 ? (
          props.renderRowHeaderCell
          ? props.renderRowHeaderCell(props.headerColumnText || ' ') : ' '
        ) : ''
      }
    </CellWrapper>
  );
};
