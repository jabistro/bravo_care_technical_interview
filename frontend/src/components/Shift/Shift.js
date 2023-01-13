import "./Shift.css";

import React, { useState } from "react";
import DateFormat from "../DateFormat/DateFormat";
import StartTime from "../ShiftTimes/StartTime/StartTime";
import EndTime from "../ShiftTimes/EndTime/EndTime";

const Shift = ({ shift, setSelectedShifts, selectedShifts }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) {
      setSelectedShifts((prevState) => {
        delete prevState[shift.shift_id];
        return { ...prevState };
      });
      setClicked(false);
    } else if (Object.keys(selectedShifts).length < 2) {
      setSelectedShifts((prevState) => {
        prevState[shift.shift_id] = shift;
        return { ...prevState };
      });
      setClicked(true);
    }
  };

  return (
    <div
      className={clicked ? "shift_wrap_clicked" : "shift_wrap_unclicked"}
      onClick={handleClick}
    >
      <p>{shift.facility_name}</p>
      <DateFormat shift_date={shift.shift_date} />
      <div className="shift_times">
        <StartTime start_time={shift.start_time} />
        &nbsp;-&nbsp;
        <EndTime end_time={shift.end_time} />
      </div>
    </div>
  );
};

export default Shift;
