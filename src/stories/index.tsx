import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from '..';
import { CalendarDefaultViewEnum } from '../types';

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
  ))
  .add('day view', () => (
    <Calendar view={CalendarDefaultViewEnum.day} startMonth={0} startDayOfMonth={1} startYear={2018} data={{
      'test': [{
        startDate: '2017-12-25',
        endDate: '2018-01-01'
      }, {
        startDate: '2018-01-01',
        endDate: '2018-01-05'
      }, {
        startDate: '2018-01-03',
        endDate: '2018-01-07'
      }],
    'test 1': [{
        startDate: '2017-12-25',
        endDate: '2018-01-01'
      }, {
        startDate: '2018-01-01',
        endDate: '2018-01-05'
      }, {
        startDate: '2018-01-03',
        endDate: '2018-01-07'
      }]
    }} />
  ));
