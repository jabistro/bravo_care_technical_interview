import "./EndTime.css";

import React from "react";

const EndTime = ({ end_time }) => {
  end_time = end_time.split(":");
  end_time.pop();

  let hours = Number(end_time[0]);
  let minutes = Number(end_time[1]);

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

  return <p className="end_time">{timeValue}</p>;
};

export default EndTime;
