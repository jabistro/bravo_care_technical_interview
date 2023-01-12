const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

const getShifts = () => {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT question_one_shifts.shift_id, question_one_shifts.facility_id, facilities.facility_name, question_one_shifts.shift_date, question_one_shifts.start_time, question_one_shifts.end_time FROM question_one_shifts INNER JOIN facilities ON question_one_shifts.facility_id=facilities.facility_id;SELECT question_one_shifts.shift_id, question_one_shifts.facility_id, facilities.facility_name, question_one_shifts.shift_date, question_one_shifts.start_time, question_one_shifts.end_time FROM question_one_shifts INNER JOIN facilities ON question_one_shifts.facility_id=facilities.facility_id', (error, results) => {
        if (error) {
            reject(error)
        }
        resolve(results.rows);
    });
  });
};

module.exports = getShifts;
