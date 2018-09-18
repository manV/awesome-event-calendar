import * as React from 'react';
import { IContext, ColumnDurationEnum } from './types';

export const defaultContextValues: IContext = {
  columnDuration: ColumnDurationEnum.week
};

export const {
  Provider,
  Consumer
} = React.createContext<IContext>(defaultContextValues);
