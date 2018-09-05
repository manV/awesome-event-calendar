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
    expect(getStartAndEndDates({
      dayOfMonth: 1,
      month: 0,
      year: 2018,
      view: CalendarDefaultViewEnum.month
    })).toEqual({
      endDate: '2018-02-03',
      startDate: '2017-12-31'
    });
  });
  test('should return valid start/end dates in case of month view 2', () => {
    expect(getStartAndEndDates({
      dayOfMonth: 1,
      month: 1,
      year: 2018,
      view: CalendarDefaultViewEnum.month
    })).toEqual({
      startDate: '2018-01-28',
      endDate: '2018-03-03'
    });
  });
  test('should return valid start/end dates in case of quarter view 1', () => {
    expect(getStartAndEndDates({
      dayOfMonth: 1,
      month: 0,
      year: 2018,
      view: CalendarDefaultViewEnum.quarter
    })).toEqual({
      startDate: '2017-12-31',
      endDate: '2018-03-31'
    });
  });
  test('should return valid start/end dates in case of quarter view 2', () => {
    expect(getStartAndEndDates({
      dayOfMonth: 1,
      month: 3,
      year: 2018,
      view: CalendarDefaultViewEnum.quarter
    })).toEqual({
      startDate: '2018-04-01',
      endDate: '2018-06-30'
    });
  });
  test('should return valid start/end dates in case of day view 1', () => {
    expect(getStartAndEndDates({
      dayOfMonth: 1,
      month: 0,
      year: 2018,
      view: CalendarDefaultViewEnum.day
    })).toEqual({
      startDate: '2017-12-31',
      endDate: '2018-01-06'
    });
  });
  test('should return valid start/end dates in case of day view 2', () => {
    expect(getStartAndEndDates({
      dayOfMonth: 30,
      month: 0,
      year: 2018,
      view: CalendarDefaultViewEnum.day
    })).toEqual({
      startDate: '2018-01-28',
      endDate: '2018-02-03'
    });
  });
});

describe('utils::getColumnWeekStartAndEndDates', () => {
  test('should return correct value in case of multiple weeks', () => {
    expect(getColumnWeekStartAndEndDates({
      numberOfWeeks: 5,
      startDate: '2018-01-01'
    }).map((r) => ({
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
  test('should return correct value in case of single week', () => {
    expect(getColumnWeekStartAndEndDates({
      numberOfWeeks: 1,
      startDate: '2018-01-01'
    }).map((r) => ({
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString()
    }))).toEqual([
      {
        endDate: '2017-12-31T00:00:00.000Z',
        startDate: '2017-12-31T00:00:00.000Z'
      }, {
        endDate: '2018-01-01T00:00:00.000Z',
        startDate: '2018-01-01T00:00:00.000Z'
      }, {
        endDate: '2018-01-02T00:00:00.000Z',
        startDate: '2018-01-02T00:00:00.000Z'
      }, {
        endDate: '2018-01-03T00:00:00.000Z',
        startDate: '2018-01-03T00:00:00.000Z'
      }, {
        endDate: '2018-01-04T00:00:00.000Z',
        startDate: '2018-01-04T00:00:00.000Z'
      }, {
        endDate: '2018-01-05T00:00:00.000Z',
        startDate: '2018-01-05T00:00:00.000Z'
      }, {
        endDate: '2018-01-06T00:00:00.000Z',
        startDate: '2018-01-06T00:00:00.000Z'
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
          endDate: event.endDate.toISOString(),
          metadata: event.metadata
        };
      });
    });
  };
  test('should return correct value in case of just one line', () => {
    expect(convertResultToString(groupNonConflictingEvents([{
      startDate: '2018-01-08',
      endDate: '2018-01-12',
      metadata: {}
    }, {
      startDate: '2018-01-01',
      endDate: '2018-01-07',
      metadata: {}
    }]))).toEqual([
      [
        {endDate: '2018-01-07T00:00:00.000Z', startDate: '2018-01-01T00:00:00.000Z', metadata: {}},
        {endDate: '2018-01-12T00:00:00.000Z', startDate: '2018-01-08T00:00:00.000Z', metadata: {}}
      ]
    ]);
  });
  test('should return correct value in case of just two line', () => {
    expect(convertResultToString(groupNonConflictingEvents([{
      startDate: '2018-01-01',
      endDate: '2018-01-07',
      metadata: {}
    }, {
      startDate: '2018-01-07',
      endDate: '2018-01-12',
      metadata: {}
    }]))).toEqual([
      [
        {endDate: '2018-01-07T00:00:00.000Z', startDate: '2018-01-01T00:00:00.000Z', metadata: {}}
      ], [
        {endDate: '2018-01-12T00:00:00.000Z', startDate: '2018-01-07T00:00:00.000Z', metadata: {}}
      ]
    ]);
  });
});

describe('utils::fillDataWithFakeEvents', () => {
  it('should work when there is only one event starting at calendar start date', () => {
    expect(fillDataWithFakeEvents(
      '2018-07-01',
      '2018-09-06',
      [
        [{
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-07-07', 'YYYY-MM-DD'),
          metadata: {}
        }]
      ]
    )).toEqual([
      [
        {
          clipLeft: true, clipRight: false,
          endDate: moment.utc('2018-07-07', 'YYYY-MM-DD'),
          isFake: false, startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          width: 10.294117647058824,
          metadata: {}
        }
      ]
    ]);
  });
  it('should work when there is only one event starting at calendar ' +
  'start date and ending at calendar end date', () => {
    expect(fillDataWithFakeEvents(
      '2018-07-01',
      '2018-09-06',
      [
        [{
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD'),
          metadata: {}
        }]
      ]
    )).toEqual([
      [
        {
          clipLeft: true, clipRight: false,
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD'),
          isFake: false, startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          width: 100,
          metadata: {}
        }
      ]
    ]);
  });
  it('should work when there is only one event starting before calendar ' +
  'start date and ending at calendar end date', () => {
    expect(fillDataWithFakeEvents(
      '2018-07-01',
      '2018-09-06',
      [
        [{
          startDate: moment.utc('2018-06-25', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD'),
          metadata: {}
        }]
      ]
    )).toEqual([
      [
        {
          clipLeft: true, clipRight: false,
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD'),
          isFake: false, startDate: moment.utc('2018-06-25', 'YYYY-MM-DD'),
          width: 100,
          metadata: {}
        }
      ]
    ]);
  });
  it('should work when there is only one event starting at calendar ' +
  'start date and ending after calendar end date', () => {
    expect(fillDataWithFakeEvents(
      '2018-07-01',
      '2018-09-06',
      [
        [{
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-09-16', 'YYYY-MM-DD'),
          metadata: {}
        }]
      ]
    )).toEqual([
      [
        {
          clipLeft: true, clipRight: true,
          endDate: moment.utc('2018-09-16', 'YYYY-MM-DD'),
          isFake: false, startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          width: 100,
          metadata: {}
        }
      ]
    ]);
  });
  it('should fill rows with fake events correctly', () => {
    expect(fillDataWithFakeEvents(
      '2018-07-01',
      '2018-09-06',
      [
        [{
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-07-16', 'YYYY-MM-DD'),
          metadata: {}
        }, {
          startDate: moment.utc('2018-07-25', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-08-16', 'YYYY-MM-DD'),
          metadata: {}
        }, {
          startDate: moment.utc('2018-08-17', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD'),
          metadata: {}
        }],
        [{
          startDate: moment.utc('2018-07-02', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-07-20', 'YYYY-MM-DD'),
          metadata: {}
        }, {
          startDate: moment.utc('2018-07-23', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-08-20', 'YYYY-MM-DD'),
          metadata: {}
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
          width: 23.529411764705884,
          metadata: {}
        },
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-07-25', 'YYYY-MM-DD'),
          isFake: true,
          startDate: moment.utc('2018-07-16', 'YYYY-MM-DD'),
          width: 11.764705882352942,
          metadata: {}
        },
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-08-16', 'YYYY-MM-DD'),
          isFake: false,
          startDate: moment.utc('2018-07-25', 'YYYY-MM-DD'),
          width: 33.82352941176471,
          metadata: {}
        },
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-09-06', 'YYYY-MM-DD'),
          isFake: false,
          startDate: moment.utc('2018-08-17', 'YYYY-MM-DD'),
          width: 30.88235294117647,
          metadata: {}
        }
      ],
      [
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-07-02', 'YYYY-MM-DD'),
          isFake: true,
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          width: 1.4705882352941178,
          metadata: {}
        },
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-07-20', 'YYYY-MM-DD'),
          isFake: false,
          startDate: moment.utc('2018-07-02', 'YYYY-MM-DD'),
          width: 27.94117647058824,
          metadata: {}
        },
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-07-23', 'YYYY-MM-DD'),
          isFake: true,
          startDate: moment.utc('2018-07-20', 'YYYY-MM-DD'),
          width: 2.9411764705882355,
          metadata: {}
        },
        {
          clipLeft: false,
          clipRight: false,
          endDate: moment.utc('2018-08-20', 'YYYY-MM-DD'),
          isFake: false,
          startDate: moment.utc('2018-07-23', 'YYYY-MM-DD'),
          width: 42.64705882352941,
          metadata: {}
        }
      ]
    ]);
  });
  it('should ignore if event is outside of calendar range', () => {
    expect(fillDataWithFakeEvents(
      '2018-07-01',
      '2018-09-06',
      [
        [{
          startDate: moment.utc('2017-11-01', 'YYYY-MM-DD'),
          endDate: moment.utc('2017-11-07', 'YYYY-MM-DD'),
          metadata: {}
        }, {
          startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-07-07', 'YYYY-MM-DD'),
          metadata: {}
        }, {
          startDate: moment.utc('2018-11-01', 'YYYY-MM-DD'),
          endDate: moment.utc('2018-11-07', 'YYYY-MM-DD'),
          metadata: {}
        }]
      ]
    )).toEqual([
      [
        {
          clipLeft: true, clipRight: false,
          endDate: moment.utc('2018-07-07', 'YYYY-MM-DD'),
          isFake: false, startDate: moment.utc('2018-07-01', 'YYYY-MM-DD'),
          width: 10.294117647058824,
          metadata: {}
        }
      ]
    ]);
  });
});
