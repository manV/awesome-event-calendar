import { Moment } from 'moment';
import styled from './../styled';
import * as React from 'react';

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

export default (props: {
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
