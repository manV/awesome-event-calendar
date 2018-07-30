import React from 'react';
import { storiesOf } from '@storybook/react';
import Index from '../index';

storiesOf('Calendar', module)
  .add('default', () => (
    <Index color="red" />
  ));
