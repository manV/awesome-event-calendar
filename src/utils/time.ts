import * as moment from 'moment';
import { CalendarDefaultViewEnum } from '../types';

export const dateFormatter = 'YYYY-MM-DD';

export const getNumberOfWeeksBetweenDates = (startDate: string, endDate: string) => {
  const diffInDays = moment.utc(endDate, dateFormatter).diff(moment.utc(startDate, dateFormatter), 'days') + 1;
  return Math.ceil(diffInDays / 7);
};

export const getStartAndEndDates = ({
  view, dayOfMonth, month, year
}: {
  view: CalendarDefaultViewEnum
  dayOfMonth: number
  month: number,
  year: number,
}): {
  startDate: string,
  endDate: string
} => {
  let startDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayOfMonth).padStart(2, '0')}`;
  if (view === CalendarDefaultViewEnum.day) {
    startDate = moment.utc(startDate, dateFormatter).startOf('week').format(dateFormatter);
  }
  const startDateMoment = moment.utc(startDate, dateFormatter);
  let endDate = '';
  if (view === CalendarDefaultViewEnum.month) {
    endDate = startDateMoment.endOf('month').endOf('week').format(dateFormatter);
  } else if (view === CalendarDefaultViewEnum.quarter) {
    endDate = startDateMoment
    .add(2, 'month')
    .endOf('month')
    .endOf('week')
    .format(dateFormatter);
  } else {
    endDate = moment.utc(startDate, dateFormatter).add(6, 'days').format(dateFormatter);
  }
  return {
    startDate: moment.utc(startDate, dateFormatter).startOf('week').format(dateFormatter),
    endDate
  };
};

export const getColumnWeekStartAndEndDates = (startDate: string, numberOfWeeks: number) => {
  const result: Array<{
    startDate: moment.Moment;
    endDate: moment.Moment;
  }> = [];
  let currDate = moment.utc(startDate, dateFormatter).startOf('week');
  for (let i = 0; i < numberOfWeeks; i++) {
    const weekStartDate = currDate.clone();
    currDate = currDate.add(6, 'days');
    const weekEndDate = currDate.clone();
    currDate = currDate.add(1, 'day');
    result.push({
      startDate: weekStartDate,
      endDate: weekEndDate
    });
  }
  return result;
};

export const groupNonConflictingEvents = (data: Array<{
  startDate: string;
  endDate: string;
}>): Array<Array<{
  startDate: moment.Moment
  endDate: moment.Moment
}>> => {
  const sortedData = data.sort((left, right) => {
    return moment.utc(left.startDate, dateFormatter).diff(moment.utc(right.startDate, dateFormatter));
  });
  const result: Array<Array<{
    startDate: moment.Moment
    endDate: moment.Moment
  }>> = [[]];
  sortedData.forEach((event) => {
    const eventStartDate = moment.utc(event.startDate, dateFormatter);
    const eventEndDate = moment.utc(event.endDate, dateFormatter);

    let conflictingCount = 0;

    // find first not conflicting line
    for (const line of result) {
      const hasConflict = line
      .find((re) => eventStartDate.isSameOrBefore(re.endDate) && eventEndDate.isSameOrAfter(re.startDate));
      if (hasConflict) {
        conflictingCount++;
      } else {
        line.push({
          startDate: eventStartDate,
          endDate: eventEndDate
        });
        break;
      }
    }

    if (conflictingCount === result.length) {
      result.push([{
        startDate: eventStartDate,
        endDate: eventEndDate
      }]);
    }
  });
  return result;
};

export const fillDataWithFakeEvents = (
  calendarStartDateStr: string,
  calendarEndDateStr: string,
  data: Array<Array<{
    startDate: moment.Moment
    endDate: moment.Moment
  }>>
): Array<Array<{
  startDate: moment.Moment;
  endDate: moment.Moment;
  width: number;
  isFake: boolean;
  clipRight: boolean;
  clipLeft: boolean;
}>> => {
  const calendarStartDate = moment.utc(calendarStartDateStr, dateFormatter);
  const calendarEndDate = moment.utc(calendarEndDateStr, dateFormatter);
  const dayWidth = 100 / (Math.abs(calendarStartDate.diff(calendarEndDate, 'days')) + 1);
  const result: Array<Array<{
    startDate: moment.Moment;
    endDate: moment.Moment;
    width: number;
    isFake: boolean;
    clipRight: boolean;
    clipLeft: boolean;
  }>> = [];
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    result.push([]);
    for (let j = 0; j < row.length; j++) {
      const event = row[j];
      if (j === 0) {
        // compare with calendar start date if starting after then add fakediv
        const diff = calendarStartDate.diff(event.startDate, 'days');
        const startDateForWidth = event.startDate.isBefore(calendarStartDate) ? calendarStartDate : event.startDate;
        const endDateForWidth = event.endDate.isBefore(calendarEndDate) ? event.endDate : calendarEndDate;
        if (diff < 0) {
          // add fake div
          result[i].push({
            startDate: calendarStartDate,
            endDate: event.startDate,
            width: Math.abs(event.startDate.diff(calendarStartDate, 'days')) * dayWidth,
            isFake: true,
            clipLeft: false,
            clipRight: false
          });
          result[i].push({
            startDate: event.startDate,
            endDate: event.endDate,
            width: (Math.abs(startDateForWidth.diff(endDateForWidth, 'days')) + 1) * dayWidth,
            isFake: false,
            clipLeft: false,
            clipRight: event.endDate.diff(calendarEndDate, 'days') >= 0
          });
        } else {
          result[i].push({
            startDate: event.startDate,
            endDate: event.endDate,
            width: (Math.abs(startDateForWidth.diff(endDateForWidth, 'days')) + 1) * dayWidth,
            isFake: false,
            clipLeft: true,
            clipRight: event.endDate.diff(calendarEndDate, 'days') >= 0
          });
        }
      } else {
        const previousEvent = row[j - 1];
        const diff = previousEvent.startDate.diff(event.startDate);
        const endDateForWidth = event.endDate.isBefore(calendarEndDate) ? event.endDate : calendarEndDate;
        if (diff < 0 && (Math.abs(event.startDate.diff(previousEvent.endDate, 'days')) > 1)) {
          result[i].push({
            startDate: previousEvent.endDate,
            endDate: event.startDate,
            width: (Math.abs(event.startDate.diff(previousEvent.endDate, 'days')) - 1) * dayWidth,
            isFake: true,
            clipLeft: false,
            clipRight: false
          });
        }
        result[i].push({
          startDate: event.startDate,
          endDate: event.endDate,
          width: (Math.abs(event.startDate.diff(endDateForWidth, 'days')) + 1) * dayWidth,
          isFake: false,
          clipLeft: false,
          clipRight: event.endDate.diff(calendarEndDate) >= 0
        });
      }
    }
  }
  return result;
};
