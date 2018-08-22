import * as React from 'react';
import { IContext, CalendarDefaultViewEnum } from './types';

export const defaultContextValues: IContext = {
  view: CalendarDefaultViewEnum.month
};

export const {
  Provider,
  Consumer
} = React.createContext<IContext>(defaultContextValues);
