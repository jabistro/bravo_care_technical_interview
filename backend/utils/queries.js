const allShiftsData =
  "SELECT question_one_shifts.shift_id, question_one_shifts.facility_id, facilities.facility_name, question_one_shifts.shift_date, question_one_shifts.start_time, question_one_shifts.end_time FROM question_one_shifts INNER JOIN facilities ON question_one_shifts.facility_id=facilities.facility_id";

const q4query =
  "SELECT facility_id, nurse_type_needed, jobs.job_id, (total_number_nurses_needed - A.spots_taken) AS remaining_spots FROM jobs Join(SELECT job_id, COUNT(*) AS spots_taken FROM nurse_hired_jobs GROUP BY job_id) A ON A.job_id = jobs.job_id ORDER BY facility_id ASC, nurse_type_needed";

const q5query =
  "WITH nurse_needed AS(SELECT j.job_id, j.nurse_type_needed, j.total_number_nurses_needed-NH.nurses_hired as nurse_still_needed FROM jobs j LEFT JOIN(SELECT job_id, count(*) nurses_hired FROM nurse_hired_jobs GROUP BY job_id) NH ON j.job_id = NH.job_id WHERE j.total_number_nurses_needed-NH.nurses_hired > 0), job_per_nurse AS(SELECT nn.job_id, n.nurse_id, n.nurse_name FROM nurse_needed nn LEFT JOIN nurses n ON nn.nurse_type_needed = n.nurse_type WHERE NOT EXISTS (SELECT * FROM nurse_hired_jobs nhj WHERE n.nurse_id = nhj.nurse_id AND nn.job_id = nhj.job_id)), job_list as (SELECT nurse_id, nurse_name, count(*) number_of_available_jobs FROM job_per_nurse GROUP BY nurse_id, nurse_name) SELECT n.nurse_id, n.nurse_name, n.nurse_type, COALESCE(jl.number_of_available_jobs, 0) number_of_available_jobs FROM nurses n LEFT JOIN job_list jl ON n.nurse_id = jl.nurse_id ORDER BY nurse_id ASC";

const q6query =
  "SELECT DISTINCT nurse_name AS co_workers FROM jobs j INNER JOIN nurse_hired_jobs nhj ON j.job_id = nhj.job_id INNER JOIN nurses n ON n.nurse_id = nhj.nurse_id INNER JOIN (SELECT j.facility_id FROM nurses n INNER JOIN nurse_hired_jobs nhj ON n.nurse_id = nhj.nurse_id INNER JOIN jobs j ON j.job_id = nhj.job_id WHERE n.nurse_name = 'Anne') x ON x.facility_Id = j.facility_id WHERE n.nurse_id NOT IN (SELECT nurse_id FROM nurses WHERE nurse_name = 'Anne')";

module.exports = { allShiftsData, q4query, q5query, q6query };
