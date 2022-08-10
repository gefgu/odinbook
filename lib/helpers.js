import { DateTime, Interval } from "luxon";

function getSinceDateUntilNow(ISODate) {
  const interval = Interval.fromDateTimes(
    DateTime.fromISO(ISODate),
    DateTime.now()
  ).toDuration(["years", "months", "days", "hours", "minutes"]);

  let intervalValues = {};
  Object.keys(interval.values).forEach((key, index) => {
    intervalValues[key] = Math.floor(+interval.values[key]);
  });

  let intervalFormated = "";

  if (intervalValues?.years) {
    intervalFormated = `${intervalValues.years}y ${intervalFormated}`;
  } else if (intervalValues?.months) {
    intervalFormated = `${intervalValues.months}m ${intervalFormated}`;
  } else if (intervalValues?.days) {
    intervalFormated = `${intervalValues.days}d ${intervalFormated}`;
  } else if (intervalValues?.hours) {
    intervalFormated = `${intervalValues.hours}h ${intervalFormated}`;
  } else if (intervalValues?.minutes) {
    intervalFormated = `${intervalValues.minutes}m ${intervalFormated}`;
  }

  return intervalFormated;
}

export { getSinceDateUntilNow };
