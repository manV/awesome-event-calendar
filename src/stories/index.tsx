import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from '..';

storiesOf('Calendar', module)
  .add('default', () => (
    <Calendar data={{}}/>
  ))
  .add('with some data', () => (
    <Calendar startMonth={11} startYear={2017} data={{
      'test': [{
        startDate: '2017-12-01',
        endDate: '2018-10-06'
      }, {
        startDate: '2017-02-17',
        endDate: '2017-12-31'
      }, {
        startDate: '2017-12-10',
        endDate: '2017-12-15'
      }, {
        startDate: '2017-12-17',
        endDate: '2017-12-20'
      }, {
        startDate: '2017-12-21',
        endDate: '2017-12-23'
      }],
    'test 1': [{
        startDate: '2017-12-01',
        endDate: '2018-10-06'
      }, {
        startDate: '2017-12-10',
        endDate: '2017-12-15'
      }, {
        startDate: '2017-12-17',
        endDate: '2017-12-20'
      }, {
        startDate: '2017-12-21',
        endDate: '2017-12-23'
      }]
    }} />
  ));
