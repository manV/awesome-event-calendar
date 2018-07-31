import * as React from 'react';

import {
  IHeaderProps
} from '../types';
import { getNumberOfWeeksBetweenDates } from '../utils/time';

const HeaderCell = (props: {
  index: number,
  numberOfWeeks: number
}) => {
  const width = 100 / props.numberOfWeeks;
  return (
    <div style={{width: `${width}%`}}>
      {props.index}
    </div>
  );
};

export default class Header extends React.Component<IHeaderProps, any> {
  state = {
    numberOfWeeks: getNumberOfWeeksBetweenDates(this.props.startDate, this.props.endDate)
  };
  render() {
    const weekNumArray: number[] = [];
    for (let i = 1; i <= this.state.numberOfWeeks; i++) {
      weekNumArray.push(i);
    }
    return (
      <div>
        {
          weekNumArray.map((_, index) => {
            return <HeaderCell index={index} numberOfWeeks={this.state.numberOfWeeks} />;
          })
        }
      </div>
    );
  }
}
