import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DateFormat from "./components/DateFormat/DateFormat";
import StartTime from "./components/ShiftTimes/StartTime/StartTime";
import EndTime from "./components/ShiftTimes/EndTime/EndTime";

function App() {
  const [shifts, setShifts] = useState([]);
  const [overlapMins, setOverlapMins] = useState("N/A");
  const [maxOverlapThreshold, setMaxOverlapThreshold] = useState("N/A");
  const [doesExceed, setDoesExceed] = useState("N/A");
  const [selected, setSelected] = useState(false);
  const selectedShifts = new Set();

  useEffect(() => {
    const getShifts = async () => {
      const res = await axios.get("http://localhost:3001/");
      setShifts(res.data);
    };
    getShifts();
  }, []);

  return (
    <div className="wrap">
      <div className="info_return">
        <div className="info_return_blurbs">
          <p>Overlap Minutes: {overlapMins}</p>
          <p>Max Overlap Threshold: {maxOverlapThreshold}</p>
          <p>Exceeds Overlap Threshold: {doesExceed}</p>
        </div>
        <button>Submit</button>
      </div>
      <div className="shifts_grid">
        {shifts.map((shift, idx) => {
          return (
            <div key={idx} className="shift_wrap">
              <p>{shift.facility_name}</p>
              <DateFormat shift_date={shift.shift_date} />
              <div className="shift_times">
                <StartTime start_time={shift.start_time} />
                &nbsp;-&nbsp;
                <EndTime end_time={shift.end_time} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
