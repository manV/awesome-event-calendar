import {
  getNumberOfWeeksBetweenDates,
  getStartAndEndDates,
  getColumnWeekStartAndEndDates,
  groupNonConflictingEvents,
  fillDataWithFakeEvents
} from './time';

import * as moment from 'moment';

import {
  CalendarDefaultViewEnum
} from '../types';

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

describe('utils::getColumnWeekStartAndEndDates', () => {
  test('should return correct value', () => {
    expect(getColumnWeekStartAndEndDates('2018-01-01', 5).map((r) => ({
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString()
    }))).toEqual([
      {
        endDate: '2018-01-06T00:00:00.000Z',
        startDate: '2017-12-31T00:00:00.000Z'
      }, {
        endDate: '2018-01-13T00:00:00.000Z',
        startDate: '2018-01-07T00:00:00.000Z'
      }, {
        endDate: '2018-01-20T00:00:00.000Z',
        startDate: '2018-01-14T00:00:00.000Z'
      }, {
        endDate: '2018-01-27T00:00:00.000Z',
        startDate: '2018-01-21T00:00:00.000Z'
      }, {
        endDate: '2018-02-03T00:00:00.000Z',
        startDate: '2018-01-28T00:00:00.000Z'
      }]
    );
  });
});

describe('utils::groupNonConflictingEvents', () => {
  // TODO add more tests
  const convertResultToString = (result: any) => {
    return result.map((lineArray: any) => {
      return lineArray.map((event: any) => {
        return {
          startDate: event.startDate.toISOString(),
          endDate: event.endDate.toISOString()
        };
      });
    });
  };
  test('should return correct value in case of just one line', () => {
    expect(convertResultToString(groupNonConflictingEvents([{
      startDate: '2018-01-08',
      endDate: '2018-01-12'
    }, {
      startDate: '2018-01-01',
      endDate: '2018-01-07'
    }]))).toEqual([
      [
        {endDate: '2018-01-07T00:00:00.000Z', startDate: '2018-01-01T00:00:00.000Z'},
        {endDate: '2018-01-12T00:00:00.000Z', startDate: '2018-01-08T00:00:00.000Z'}
      ]
    ]);
  });
  test('should return correct value in case of just two line', () => {
    expect(convertResultToString(groupNonConflictingEvents([{
      startDate: '2018-01-01',
      endDate: '2018-01-07'
    }, {
      startDate: '2018-01-07',
      endDate: '2018-01-12'
    }]))).toEqual([
      [
        {endDate: '2018-01-07T00:00:00.000Z', startDate: '2018-01-01T00:00:00.000Z'}
      ], [
        {endDate: '2018-01-12T00:00:00.000Z', startDate: '2018-01-07T00:00:00.000Z'}
      ]
    ]);
  });
});

describe('utils::fillDataWithFakeEvents', () => {
  it('should work when there is only one event starting at calendar start date', () => {
    expect(fillDataWithFakeEvents(
      moment.utc('2018-07-01', 'YYYY-MM-DD'),
      moment.utc('2018-09-06', 'YYYY-MM-DD'),
      [
        [{
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-07-07', 'YYYY-MM-DD')
        }]
      ]
    )).toEqual([
      [
        {
          clipLeft: true, clipRight: false,
          endDate: moment.utc('2018-07-07', 'YYYY-MM-DD'),
          isFake: false, startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          width: 8.955223880597016
        }
      ]
    ]);
  });
  it('should work when there is only one event starting at calendar ' +
  'start date and ending at calendar end date', () => {
    expect(fillDataWithFakeEvents(
      moment.utc('2018-07-01', 'YYYY-MM-DD'),
      moment.utc('2018-09-06', 'YYYY-MM-DD'),
      [
        [{
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD')
        }]
      ]
    )).toEqual([
      [
        {
          clipLeft: true, clipRight: true,
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD'),
          isFake: false, startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          width: 100
        }
      ]
    ]);
  });
  it('should work when there is only one event starting before calendar ' +
  'start date and ending at calendar end date', () => {
    expect(fillDataWithFakeEvents(
      moment.utc('2018-07-01', 'YYYY-MM-DD'),
      moment.utc('2018-09-06', 'YYYY-MM-DD'),
      [
        [{
          startDate: moment.utc('2018-06-25', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD')
        }]
      ]
    )).toEqual([
      [
        {
          clipLeft: true, clipRight: true,
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD'),
          isFake: false, startDate: moment.utc('2018-06-25', 'YYYY-MM-DD'),
          width: 100
        }
      ]
    ]);
  });
  it('should work when there is only one event starting at calendar ' +
  'start date and ending after calendar end date', () => {
    expect(fillDataWithFakeEvents(
      moment.utc('2018-07-01', 'YYYY-MM-DD'),
      moment.utc('2018-09-06', 'YYYY-MM-DD'),
      [
        [{
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-09-16', 'YYYY-MM-DD')
        }]
      ]
    )).toEqual([
      [
        {
          clipLeft: true, clipRight: true,
          endDate: moment.utc('2018-09-16', 'YYYY-MM-DD'),
          isFake: false, startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          width: 100
        }
      ]
    ]);
  });
  it('should fill rows with fake events correctly', () => {
    expect(fillDataWithFakeEvents(
      moment.utc('2018-07-01', 'YYYY-MM-DD'),
      moment.utc('2018-09-06', 'YYYY-MM-DD'),
      [
        [{
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-07-16', 'YYYY-MM-DD')
        }, {
          startDate: moment.utc('2018-07-25', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-08-16', 'YYYY-MM-DD')
        }, {
          startDate: moment.utc('2018-08-17', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD')
        }],
        [{
          startDate: moment.utc('2018-07-02', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-07-20', 'YYYY-MM-DD')
        }, {
          startDate: moment.utc('2018-07-23', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-08-20', 'YYYY-MM-DD')
        }]
      ]
    )).toEqual([
      [
        {
          clipLeft: true,
          clipRight: false,
          endDate: moment.utc('2018-07-16', 'YYYY-MM-DD'),
          isFake: false,
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          width: 22.388059701492537
        },
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-07-25', 'YYYY-MM-DD'),
          isFake: true,
          startDate: moment.utc('2018-07-16', 'YYYY-MM-DD'),
          width: 13.432835820895523
        },
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-08-16', 'YYYY-MM-DD'),
          isFake: false,
          startDate: moment.utc('2018-07-25', 'YYYY-MM-DD'),
          width: 32.83582089552239
        },
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-08-17', 'YYYY-MM-DD'),
          isFake: true,
          startDate: moment.utc('2018-08-16', 'YYYY-MM-DD'),
          width: 1.492537313432836
        },
        {
          clipLeft: false,
          clipRight: true,
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD'),
          isFake: false,
          startDate: moment.utc('2018-08-17', 'YYYY-MM-DD'),
          width: 29.850746268656717
        }
      ],
      [
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-07-02', 'YYYY-MM-DD'),
          isFake: true,
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          width: 1.492537313432836
        },
        {
          clipLeft: false,
          clipRight: true,
          endDate: moment.utc('2018-07-20', 'YYYY-MM-DD'),
          isFake: false,
          startDate: moment.utc('2018-07-02', 'YYYY-MM-DD'),
          width: 26.865671641791046
        },
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-07-23', 'YYYY-MM-DD'),
          isFake: true,
          startDate: moment.utc('2018-07-20', 'YYYY-MM-DD'),
          width: 4.477611940298508
        },
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-08-20', 'YYYY-MM-DD'),
          isFake: false,
          startDate: moment.utc('2018-07-23', 'YYYY-MM-DD'),
          width: 41.791044776119406
        }
      ]
    ]);
  });
});
