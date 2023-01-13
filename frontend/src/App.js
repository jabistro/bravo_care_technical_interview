import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Shift from "./components/Shift/Shift";

function App() {
  const [allShifts, setAllShifts] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState({});
  const [overlapMins, setOverlapMins] = useState("N/A");
  const [maxOverlapThreshold, setMaxOverlapThreshold] = useState("N/A");
  const [doesExceed, setDoesExceed] = useState("N/A");

  useEffect(() => {
    const getAllShifts = async () => {
      const res = await axios.get("http://localhost:3001/");
      setAllShifts(res.data);
    };
    getAllShifts();
  }, []);

  console.log(selectedShifts);

  const handleSubmit = () => {
    const selectedShiftsArr = Object.values(selectedShifts);
    console.log(selectedShiftsArr);
    if (
      selectedShiftsArr[0].facility_name !== selectedShiftsArr[1].facility_name
    ) {
      setOverlapMins(0);
      setMaxOverlapThreshold(0);
      setDoesExceed("False");
    }
  };

  const handleReset = () => {
    setOverlapMins("N/A");
    setMaxOverlapThreshold("N/A");
    setDoesExceed("N/A");
  };

  return (
    <div className="wrap">
      <div className="info_return">
        <div className="info_return_blurbs">
          <p>Overlap Minutes: {overlapMins}</p>
          <p>Max Overlap Threshold: {maxOverlapThreshold}</p>
          <p>Exceeds Overlap Threshold: {doesExceed}</p>
        </div>
        <div className="buttons">
          <button
            className="submit_btn"
            onClick={handleSubmit}
            disabled={Object.keys(selectedShifts).length !== 2}
          >
            Submit
          </button>
          <button onClick={handleReset} className="reset_btn">
            Reset
          </button>
        </div>
      </div>
      <div className="shifts_grid">
        {allShifts.map((shift, idx) => {
          return (
            <div key={idx}>
              <Shift
                selectedShifts={selectedShifts}
                setSelectedShifts={setSelectedShifts}
                shift={shift}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
