import "./StartTime.css";

import React from "react";

const StartTime = ({ start_time }) => {
  start_time = start_time.split(":");
  start_time.pop();

  let hours = Number(start_time[0]);
  let minutes = Number(start_time[1]);

  let timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
  timeValue += hours >= 12 ? " PM" : " AM";

  return <p className="start_time">{timeValue}</p>;
};

export default StartTime;
