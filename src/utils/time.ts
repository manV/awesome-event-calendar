import * as moment from 'moment';
import { ColumnDurationEnum } from '../types';

export const dateFormatter = 'YYYY-MM-DD';

export const getNumberOfWeeksBetweenDates = (startDate: moment.Moment, endDate: moment.Moment) => {
  const diffInDays = endDate.diff(startDate, 'days') + 1;
  return Math.ceil(diffInDays / 7);
};

export const getStartAndEndDates = ({
  startDate,
  endDate,
  columnDuration
}: {
  startDate: moment.Moment;
  endDate: moment.Moment;
  columnDuration: ColumnDurationEnum
}): {
  startDate: moment.Moment;
  endDate: moment.Moment;
} => ({
  startDate: moment.utc(startDate).startOf(columnDuration),
  endDate: moment.utc(endDate).endOf(columnDuration).startOf('day')
});

export const getColumnStartAndEndDates = ({
  startDate,
  endDate,
  columnDuration
}: {
  startDate: moment.Moment;
  endDate: moment.Moment;
  columnDuration: ColumnDurationEnum;
}) => {
  const result: Array<{
    startDate: moment.Moment;
    endDate: moment.Moment;
  }> = [];
  if (columnDuration === ColumnDurationEnum.day) {
    let currDate = startDate.clone();
    const diff = endDate.diff(startDate, 'days') + 1;
    for (let i = 0; i < diff; i++) {
      const columnStartDate = currDate.clone();
      const columnEndDate = currDate.clone();
      currDate = currDate.add(1, 'day');
      result.push({
        startDate: columnStartDate,
        endDate: columnEndDate
      });
    }
  } else {
    let currDate = startDate.clone();
    const numberOfWeeks = getNumberOfWeeksBetweenDates(startDate, endDate);
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
  }
  return result;
};

export const groupNonConflictingEvents = <T>(data: Array<{
  startDate: string;
  endDate: string;
  metadata: T;
}>): Array<Array<{
  startDate: moment.Moment;
  endDate: moment.Moment;
  metadata: T;
}>> => {
  const sortedData = data.sort((left, right) => {
    return moment.utc(left.startDate, dateFormatter).diff(moment.utc(right.startDate, dateFormatter));
  });
  const result: Array<Array<{
    startDate: moment.Moment;
    endDate: moment.Moment;
    metadata: T;
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
          endDate: eventEndDate,
          metadata: event.metadata
        });
        break;
      }
    }

    if (conflictingCount === result.length) {
      result.push([{
        startDate: eventStartDate,
        endDate: eventEndDate,
        metadata: event.metadata
      }]);
    }
  });
  return result;
};

const filterEventsOutsideCalendarRange = <T>(
  row: Array<{
    startDate: moment.Moment;
    endDate: moment.Moment;
    metadata: T;
  }>,
  calendarStartDate: moment.Moment,
  calendarEndDate: moment.Moment) => {
  return row.filter((event) => {
    return (calendarStartDate.isSameOrBefore(event.endDate) && calendarEndDate.isSameOrAfter(event.startDate));
  });
};

export const fillDataWithFakeEvents = <T>(
  calendarStartDate: moment.Moment,
  calendarEndDate: moment.Moment,
  data: Array<Array<{
    startDate: moment.Moment;
    endDate: moment.Moment;
    metadata: T;
  }>>
): Array<Array<{
  startDate: moment.Moment;
  endDate: moment.Moment;
  width: number;
  metadata: T;
  isFake: boolean;
  clipRight: boolean;
  clipLeft: boolean;
}>> => {
  const dayWidth = 100 / (Math.abs(calendarStartDate.diff(calendarEndDate, 'days')) + 1);
  const result: Array<Array<{
    startDate: moment.Moment;
    endDate: moment.Moment;
    width: number;
    isFake: boolean;
    clipRight: boolean;
    clipLeft: boolean;
    metadata: T;
  }>> = [];
  for (let i = 0; i < data.length; i++) {
    const row = filterEventsOutsideCalendarRange(data[i], calendarStartDate, calendarEndDate);
    result.push([]);
    for (let j = 0; j < row.length; j++) {
      const event = row[j];
      if (j === 0) {
        // compare with calendar start date if starting after then add fakediv
        const diff = calendarStartDate.diff(event.startDate, 'days');
        const startDateForWidth = event.startDate.isBefore(calendarStartDate) ? calendarStartDate : event.startDate;
        const endDateForWidth = event.endDate.isBefore(calendarEndDate) ? event.endDate : calendarEndDate;
        if (diff <= 0) {
          if(diff < 0) {
            // add fake div
            result[i].push({
              startDate: calendarStartDate,
              endDate: event.startDate,
              width: Math.abs(event.startDate.diff(calendarStartDate, 'days')) * dayWidth,
              isFake: true,
              clipLeft: false,
              clipRight: false,
              metadata: event.metadata
            });
          }
          result[i].push({
            startDate: event.startDate,
            endDate: event.endDate,
            width: (Math.abs(startDateForWidth.diff(endDateForWidth, 'days')) + 1) * dayWidth,
            isFake: false,
            clipLeft: false,
            clipRight: event.endDate.diff(calendarEndDate, 'days') > 0,
            metadata: event.metadata
          });
        } else {
          result[i].push({
            startDate: event.startDate,
            endDate: event.endDate,
            width: (Math.abs(startDateForWidth.diff(endDateForWidth, 'days')) + 1) * dayWidth,
            isFake: false,
            clipLeft: true,
            clipRight: event.endDate.diff(calendarEndDate, 'days') > 0,
            metadata: event.metadata
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
            clipRight: false,
            metadata: event.metadata
          });
        }
        result[i].push({
          startDate: event.startDate,
          endDate: event.endDate,
          width: (Math.abs(event.startDate.diff(endDateForWidth, 'days')) + 1) * dayWidth,
          isFake: false,
          clipLeft: false,
          clipRight: event.endDate.diff(calendarEndDate) > 0,
          metadata: event.metadata
        });
      }
    }
  }
  return result;
};
