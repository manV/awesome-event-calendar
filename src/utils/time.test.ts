import {
  getNumberOfWeeksBetweenDates,
  getStartAndEndDates
} from './time';

import {
  CalendarDefaultViewEnum
} from './../types';

describe('utils::getNumberOfWeeksBetweenDates', () => {
  test('should return valid number of weeks between dates with one week', () => {
    expect(getNumberOfWeeksBetweenDates('2018-01-01', '2018-01-07')).toBe(1);
  });
  test('should return valid number of weeks between dates with 9 days difference', () => {
    expect(getNumberOfWeeksBetweenDates('2018-01-01', '2018-01-10')).toBe(2);
  });
});

describe('utils::getStartAndEndDates', () => {
  test('should return valid start/end dates in case of month view 1', () => {
    expect(getStartAndEndDates(0, 2018, CalendarDefaultViewEnum.month)).toEqual({
      startDate: '2018-01-01',
      endDate: '2018-02-03'
    });
  });
  test('should return valid start/end dates in case of month view 2', () => {
    expect(getStartAndEndDates(1, 2018, CalendarDefaultViewEnum.month)).toEqual({
      startDate: '2018-02-01',
      endDate: '2018-03-03'
    });
  });
  test('should return valid start/end dates in case of quarter view 1', () => {
    expect(getStartAndEndDates(0, 2018, CalendarDefaultViewEnum.quarter)).toEqual({
      startDate: '2018-01-01',
      endDate: '2018-03-31'
    });
  });
  test('should return valid start/end dates in case of quarter view 2', () => {
    expect(getStartAndEndDates(3, 2018, CalendarDefaultViewEnum.quarter)).toEqual({
      startDate: '2018-04-01',
      endDate: '2018-06-30'
    });
  });
  test('should throw if try to find values for day view', () => {
    expect(() => {
      getStartAndEndDates(3, 2018, CalendarDefaultViewEnum.day);
    }).toThrow();
  });
});
