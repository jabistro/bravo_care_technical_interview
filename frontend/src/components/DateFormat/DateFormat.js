import "./DateFormat.css";

import React from "react";
import moment from "moment";

const DateFormat = ({ shift_date }) => {
  const date = new Date(shift_date);
  const dateStr = date.toDateString();
  const momento = moment(dateStr).format("YYYY-MM-DD");

  return <p className="date_txt">{momento}</p>;
};

export default DateFormat;
