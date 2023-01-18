import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Shift from "./components/Shift/Shift";

function App() {
  const [allShifts, setAllShifts] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState({});
  const [overlapMins, setOverlapMins] = useState("");
  const [maxOverlapThreshold, setMaxOverlapThreshold] = useState("");
  const [doesExceed, setDoesExceed] = useState("");
  const [queryFour, setQueryFour] = useState([]);
  const [queryFive, setQueryFive] = useState([]);
  const [querySix, setQuerySix] = useState([]);

  useEffect(() => {
    const getAllShifts = async () => {
      const res = await axios.get("http://localhost:3001/");
      setAllShifts(res.data);
    };
    getAllShifts();

    const getQueryFour = async () => {
      const res = await axios.get("http://localhost:3001/q4");
      setQueryFour(res.data);
    };
    getQueryFour();

    const getQueryFive = async () => {
      const res = await axios.get("http://localhost:3001/q5");
      setQueryFive(res.data);
    };
    getQueryFive();

    const getQuerySix = async () => {
      const res = await axios.get("http://localhost:3001/q6");
      setQuerySix(res.data);
    };
    getQuerySix();
  }, []);

  const handleSubmit = () => {
    const dateSort = (a, b) => {
      if (a.shift_date < b.shift_date) {
        return -1;
      } else if (a.shift_date > b.shift_date) {
        return 1;
      } else {
        if (a.start_time < b.start_time) {
          return -1;
        } else if (a.start_time > b.start_time) {
          return 1;
        }
        return 0;
      }
    };

    const selectedShiftsArr = Object.values(selectedShifts).sort(dateSort);

    if (
      selectedShiftsArr[0].facility_name ===
        selectedShiftsArr[1].facility_name &&
      selectedShiftsArr[0].shift_date === selectedShiftsArr[1].shift_date
    ) {
      const endTimeArr1 = selectedShiftsArr[0].end_time.split(":");
      const endHoursToMins1 = parseInt(endTimeArr1[0]) * 60;
      const endTimeInMins1 = endHoursToMins1 + parseInt(endTimeArr1[1]);

      const startTimeArr2 = selectedShiftsArr[1].start_time.split(":");
      const startHoursToMins2 = parseInt(startTimeArr2[0]) * 60;
      const startTimeInMins2 = startHoursToMins2 + parseInt(startTimeArr2[1]);

      setOverlapMins(
        endTimeInMins1 > startTimeInMins2
          ? endTimeInMins1 - startTimeInMins2
          : 0
      );
      setMaxOverlapThreshold(30);
      setDoesExceed(endTimeInMins1 - startTimeInMins2 > 30 ? "True" : "False");
    } else if (
      selectedShiftsArr[0].facility_name !==
        selectedShiftsArr[1].facility_name &&
      selectedShiftsArr[0].shift_date === selectedShiftsArr[1].shift_date
    ) {
      const endTimeArr1 = selectedShiftsArr[0].end_time.split(":");
      const endHoursToMins1 = parseInt(endTimeArr1[0]) * 60;
      const endTimeInMins1 = endHoursToMins1 + parseInt(endTimeArr1[1]);

      const startTimeArr2 = selectedShiftsArr[1].start_time.split(":");
      const startHoursToMins2 = parseInt(startTimeArr2[0]) * 60;
      const startTimeInMins2 = startHoursToMins2 + parseInt(startTimeArr2[1]);

      setOverlapMins(
        endTimeInMins1 > startTimeInMins2
          ? endTimeInMins1 - startTimeInMins2
          : 0
      );
      setMaxOverlapThreshold(0);
      setDoesExceed(endTimeInMins1 - startTimeInMins2 > 0 ? "True" : "False");
    } else {
      if (
        parseInt(selectedShiftsArr[0].start_time.split(":")[0]) > 11 &&
        parseInt(selectedShiftsArr[0].end_time.split(":")[0]) < 12
      ) {
        const firstDate = selectedShiftsArr[0].shift_date.split("T");
        firstDate.pop();
        const firstDateArr = firstDate[0].split("-");

        const secondDate = selectedShiftsArr[1].shift_date.split("T");
        secondDate.pop();
        const secondDateArr = secondDate[0].split("-");

        if (
          firstDateArr[0] !== secondDateArr[0] ||
          firstDateArr[1] !== secondDateArr[1]
        ) {
          setOverlapMins(0);
          setMaxOverlapThreshold(0);
          setDoesExceed("False");
        } else {
          if (parseInt(firstDateArr[2]) + 1 === parseInt(secondDateArr[2])) {
            const endTimeArr1 = selectedShiftsArr[0].end_time.split(":");
            const endHoursToMins1 = parseInt(endTimeArr1[0]) * 60;
            const endTimeInMins1 = endHoursToMins1 + parseInt(endTimeArr1[1]);

            const startTimeArr2 = selectedShiftsArr[1].start_time.split(":");
            const startHoursToMins2 = parseInt(startTimeArr2[0]) * 60;
            const startTimeInMins2 =
              startHoursToMins2 + parseInt(startTimeArr2[1]);

            setOverlapMins(
              endTimeInMins1 > startTimeInMins2
                ? endTimeInMins1 - startTimeInMins2
                : 0
            );
            setMaxOverlapThreshold(0);
            setDoesExceed(
              endTimeInMins1 - startTimeInMins2 > 0 ? "True" : "False"
            );
          }
        }
      } else {
        setOverlapMins(0);
        setMaxOverlapThreshold(0);
        setDoesExceed("False");
      }
    }
  };

  // const handleReset = () => {
  //   setOverlapMins("N/A");
  //   setMaxOverlapThreshold("N/A");
  //   setDoesExceed("N/A");
  //   setSelectedShifts({});

  //   const selectedDivs = document.getElementsByClassName("shift_wrap_clicked");
  //   selectedDivs[0].className = "shift_wrap_unclicked";
  //   selectedDivs[1].className = "shift_wrap_unclicked";
  // };

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
          {/* <button onClick={handleReset} className="reset_btn">
            Reset
          </button> */}
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
      <div className="query_btns">
        <button onClick={() => console.table(queryFour)}>
          Execute Q4 Query
        </button>
        <button onClick={() => console.table(queryFive)}>
          Execute Q5 Query
        </button>
        <button onClick={() => console.table(querySix)}>Execute Q6 Query</button>
      </div>
    </div>
  );
}

export default App;
