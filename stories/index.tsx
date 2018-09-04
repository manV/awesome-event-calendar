import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { CalendarWithData } from './CalendarWithData';

storiesOf('Calendar', module)
  .add('day view', () => (
    <CalendarWithData />
  ));
