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
    intervalFormated = `${intervalValues.months} months ${intervalFormated}`;
  } else if (intervalValues?.days) {
    intervalFormated = `${intervalValues.days}d ${intervalFormated}`;
  } else if (intervalValues?.hours) {
    intervalFormated = `${intervalValues.hours}h ${intervalFormated}`;
  } else if (intervalValues?.minutes) {
    intervalFormated = `${intervalValues.minutes}m ${intervalFormated}`;
  } else if (intervalValues?.seconds) {
    intervalFormated = `${intervalValues.seconds}s ${intervalFormated}`;
  } else {
    intervalFormated = "1m";
  }

  return intervalFormated;
}

const makeFriendshipRequest = async (userId, update) => {
  const data = { userToRequest: userId };

  const JSONdata = JSON.stringify(data);

  const endpoint = `/api/users/friendshipRequests`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };

  const response = await fetch(endpoint, options);

  const result = await response.json();
  update();
};

const removeFriendshipRequest = async (userId, update) => {
  const data = { userToRequest: userId };

  const JSONdata = JSON.stringify(data);

  const endpoint = `/api/users/friendshipRequests`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };

  const response = await fetch(endpoint, options);

  const result = await response.json();
  update();
};

const acceptFriendshipRequest = async (userId, update) => {
  const data = { userToBeFriend: userId };

  const JSONdata = JSON.stringify(data);

  const endpoint = `/api/users/friends`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };

  const response = await fetch(endpoint, options);

  const result = await response.json();
  update();
};

export {
  getSinceDateUntilNow,
  makeFriendshipRequest,
  removeFriendshipRequest,
  acceptFriendshipRequest,
};
