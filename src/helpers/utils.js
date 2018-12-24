import { round } from 'lodash';

function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerMonth * 12;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now';
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than a minute ago';
  } else if (elapsed < milliSecondsPerHour) {
    return round(elapsed / milliSecondsPerMinute) + ' min(s) ago';
  } else if (elapsed < milliSecondsPerDay) {
    return round(elapsed / milliSecondsPerHour) + ' hour(s) ago';
  } else if (elapsed < milliSecondsPerMonth) {
    return round(elapsed / milliSecondsPerDay) + ' day(s) ago';
  } else if (elapsed < milliSecondsPerYear) {
    return round(elapsed / milliSecondsPerMonth) + ' month(s) ago';
  } else {
    return round(elapsed / milliSecondsPerYear) + ' year(s) ago';
  }
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();

  return timeDifference(now, updated);
}
