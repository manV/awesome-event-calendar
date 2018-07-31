import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from '..';

storiesOf('Calendar', module)
  .add('default', () => (
    <Calendar data={{}}/>
  ))
  .add('with some data', () => (
    <Calendar data={{
      test: [{
        startDate: '2018-07-01',
        endDate: '2018-07-06'
      }, {
        startDate: '2018-07-09',
        endDate: '2018-07-16'
      }],
      test2: [{
        startDate: '2018-07-01',
        endDate: '2018-07-06'
      }]
    }} />
  ));
