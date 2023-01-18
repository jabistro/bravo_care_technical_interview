# bravo_care_technical_interview

1. Implement an endpoint which will be used to fetch all shift records from the
   question_one_shifts table. The results of this fetch will be used in Question #3.
   a. You will need to fetch all of the shift records from the question_one_shifts table
   and also include the facility names in the returned data as you will need this for
   Question #3
2. You will need to implement an endpoint which will be used to determine if two selected
   shifts exceed the maximum overlap threshold. The maximum overlap threshold is the
   maximum number of minutes that the end time of one shift can overlap with the start
   time of another shift. You will need to implement the following logic:
   a. You will need to calculate the total number of minutes that two shifts overlap. This
   will be used to compare against the maximum overlap thresholds defined below.
   b. If the two shifts have different facility_id, then the maximum overlap threshold is 0
   (zero) minutes.
   c. If the two shifts have the same facility_id, then the maximum overlap threshold is
   30 (thirty) minutes
   d. Your response should include the total number of overlap minutes, the maximum
   overlap threshold, and whether or not the two shifts exceed overlap threshold
   e. Example 1:
   i. Shift A:
   {
   "facility_id" : 100,
   "shift_date" : "2022-10-01",
   "start_time" : "07:00:00",
   "end_time" : "15:00:00"
   }
   ii. Shift B:
   {
   "facility_id" : 101,
   "shift_date" : "2022-10-01",
   "start_time" : "15:00:00",
   "end_time" : "23:00:00"
   }
   iii. Overlap Minutes = 0
   iv. Maximum Overlap Threshold = 0
   v. Exceeds Overlap Threshold = FALSE
3. You will need to implement a front-end interface that will allow a user to select two shift
   boxes and click a button to compare the two shifts and then display information on the
   total overlapping minutes, the maximum overlap threshold for those shifts, and whether
   or not the two shifts exceed the overlap threshold.
   a. You will fetch all of the shifts records by using the endpoint you implemented in
   Question #1.
   b. You will need to render each of the shifts in its own box which will have the
   Facility Name, Shift Date, and Start Time and End Time.
   i. Start and End Times must be represented in 12-hour format (see example
   below)
   ii. When a user clicks on a box, that box should become highlighted to
   indicate that the shift has been selected
   iii. When the user clicks on a box that is already highlighted, it should
   deselect that shift and should no longer be highlighted
   iv. Maximum of 2 boxes can be selected at the same time
   v. The shift data should be centered in each of the boxes
   c. You will need to add a button which will be used to submit a request to compare
   whether or not the two selected shifts exceed the maximum overlap threshold
   using the endpoint you implemented in Question #2 and display the returned
   data as shown in the example below.
   i. Must have 2 boxes selected in order to submit a comparison request
   d. In your video recording, please show the results of comparing the following shift
   pairs:
   i. 1st Comparison:
   ● [ Facility A, 2022-10-01, 7:00 AM - 3:30 PM ]
   ● [ Facility A, 2022-10-01, 3:00 PM - 11:00 PM ]
   ii. 2nd Comparison:
   ● [ Facility A, 2022-10-03, 3:00 PM - 11:00 PM ]
   ● [ Facility A, 2022-10-03, 7:00 AM - 7:00 PM ]
   iii. 3rd Comparison:
   ● [ Facility B, 2022-10-02, 11:00 PM - 7:30 AM ]
   ● [ Facility A, 2022-10-03, 7:00 AM - 7:00 PM ]
   iv. 4th Comparison:
   ● [ Facility B, 2022-10-02, 11:00 PM - 7:30 AM ]
   ● [ Facility C, 2022-10-03, 3:00 PM - 11:30 PM ]

For Questions #4, #5, and #6 (found after the tables below) you will need to write a query
that will fetch the requested information from the below tables. You should have already created
and populated these tables in your local database. You will need to add three buttons [
“Execute Q4 Query”, “Execute Q5 Query”, “Execute Q6 Query” ] which will each be
responsible for executing one of those queries and the results of the query should be logged
into the console. Please show the returned results for each of these queries in your video
recording.

4. Using the provided tables, write a query that will return the number of remaining spots
   that each facility has for each job type. The number of remaining spots is going to be the
   total number of nurses needed for each nurse type, minus the total number of nurses
   already hired for each nurse type. Order your results by ascending facility_id, and
   ascending nurse_type

5. Using the same tables, write a query that will return the nurse’s ID, nurse’s name, the
   nurse type, and the total number of jobs that each nurse can still get hired for. Each
   nurse can only be hired one time for each matching job and a job should only be
   counted towards the total if the nurse has not already been hired for that job and only if
   the job still has remaining spots. Order the results by the nurse_id in ascending order.

6. Using the same tables, write a query that will return the names of a target nurse’s
   co-workers. A nurse’s co-workers is defined as any nurse who is hired at any of the
   same facility_ids as the target nurse_id. In your recording, please show the results of
   searching for Anne’s co-workers.
