import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from '..';


storiesOf('Calendar', module)
  .add('default', () => (
    <Calendar />
  ));
