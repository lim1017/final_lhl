-- WITH days(day) AS (
--   VALUES ( 'Monday' ), ( 'Tuesday' ), ( 'Wednesday' ), ( 'Thursday' ), ( 'Friday' )
-- )
-- INSERT INTO days (name)
-- SELECT day FROM days;

-- WITH times(time) AS (
-- 	VALUES ('12pm'), ('1pm'), ('2pm'), ('3pm'), ('4pm')
-- )
-- INSERT INTO appointments (time, day_id)
-- SELECT time, id as day_id FROM days, times ORDER BY day_id, time;

-- INSERT INTO interviewers (name, avatar)
-- VALUES
--   ('Sylvia Palmer', 'https://i.imgur.com/LpaY82x.png'),
--   ('Tori Malcolm', 'https://i.imgur.com/Nmx0Qxo.png'),
--   ('Mildred Nazir', 'https://i.imgur.com/T2WwVfS.png'),
--   ('Cohana Roy', 'https://i.imgur.com/FK8V841.jpg'),
--   ('Sven Jones', 'https://i.imgur.com/twYrpay.jpg'),
--   ('Susan Reynolds', 'https://i.imgur.com/TdOAdde.jpg'),
--   ('Alec Quon', 'https://i.imgur.com/3tVgsra.jpg'),
--   ('Viktor Jain', 'https://i.imgur.com/iHq8K8Z.jpg'),
--   ('Lindsay Chu', 'https://i.imgur.com/nPywAp1.jpg'),
--   ('Samantha Stanic', 'https://i.imgur.com/okB9WKC.jpg');

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 1 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 2 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 3 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 4 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- INSERT INTO available_interviewers (day_id, interviewer_id)
-- SELECT 5 as day_id, interviewers.interviewer_id FROM ( SELECT id AS interviewer_id FROM interviewers ORDER BY RANDOM() LIMIT 5 ) interviewers;

-- WITH
-- appointments AS (
--   SELECT id as appointment_id, day_id FROM appointments ORDER BY RANDOM() LIMIT 10
-- ),
-- students(name) AS(
--   VALUES
--     ('Liam Martinez'),
--     ('Richard Wong'),
--     ('Lydia Miller-Jones'),
--     ('Archie Cohen'),
--     ('Chad Takahashi'),
--     ('Leopold Silvers'),
--     ('Maria Boucher'),
--     ('Jamal Jordan'),
--     ('Michael Chan-Montoya'),
--     ('Yuko Smith')
-- )
-- INSERT INTO interviews (student, appointment_id, interviewer_id)
-- SELECT
--   DISTINCT ON 
--   (s.name) name,
--   a.appointment_id AS appointment_id,
--   available_interviewers.interviewer_id AS interviewer_id
-- FROM (
--   SELECT
--     *, row_number() OVER(ORDER BY appointment_id) AS rnum
--   FROM appointments
-- ) AS a
-- JOIN (
--   SELECT
--     *, row_number() OVER(ORDER BY name) AS rnum
--   FROM students
-- ) AS s
-- ON a.rnum = s.rnum
-- JOIN available_interviewers
-- ON a.day_id = available_interviewers.day_id;

INSERT INTO users (name, riskScore, portfolioReturn)
VALUES
    ('Yuko Shimada', 0, 0.01);

SET datestyle = "ISO, MDY";

INSERT INTO expenses (name, user_id, amount, type, date)
VALUES
    -- ('Coffee', 1, 333, 'food', '2020-01-28'),
    -- ('Burger King', 1, 10, 'food', '01/05/2020'),
    -- ('Groceries', 1, 28, 'food', '01/6/2020'),
    -- ('Rotti King', 1, 15, 'food', '01/8/2020'),
    -- ('Sushi', 1, 20, 'food', '01/11/2020'),
    -- ('Coffee', 1, 2, 'food', '01/12/2020'),
    -- ('Groceries', 1, 35, 'food', '01/16/2020'),
    -- ('Coffee', 1, 2, 'food', '01/16/2020'),
    -- ('Mcdonalds', 1, 12, 'food', '01/18/2020'),
    -- ('Coffee', 1, 2, 'food', '01/19/2020'),
    -- ('Coffee', 1, 2, 'food', '01/20/2020'),
    -- ('Groceries', 1, 50, 'food', '01/20/2020'),
    -- ('Coffee', 1, 2, 'food', '01/21/2020'),
    -- ('Groceries', 1, 30.5, 'food', '01/25/2020'),
    -- ('Rent', 1, 1200, 'home', '01/1/2020'),
    ('Home Insurance', 1, 150, 'home', '01/3/2020'),
    -- ('Hydro', 1, 200, 'home', '01/11/2020'),
    -- ('Gas', 1, 50, 'home', '01/20/2020'),
    -- ('Auto Insurance', 1, 200, 'transporation', '01/5/2020'),
    ('Hydro', 1, 250, 'utilities', '01/5/2020'),
    -- ('Movies', 1, 550, 'entertainment', '01/11/2020'),
    -- ('Viagara', 1, 1000, 'medical', '01/5/2020'),
    -- ('Debt', 1, 666, 'debt', '01/5/2020'),
    -- ('Flying Pony', 1, 1250, 'misc', '01/5/2020'),



    ('Auto Lease', 1, 320, 'transporation', '01/5/2020'),
    ('Coffee', 1, 2, 'food', '02/03/2020'),
    ('Burger King', 1, 10, 'food', '02/05/2020'),
    ('Groceries', 1, 28, 'food', '02/6/2020'),
    ('Rotti King', 1, 15, 'food', '02/8/2020'),
    ('Sushi', 1, 20, 'food', '02/11/2020'),
    ('Coffee', 1, 2, 'food', '02/12/2020'),
    ('Groceries', 1, 35, 'food', '02/16/2020'),
    ('Coffee', 1, 2, 'food', '02/16/2020'),
    ('Mcdonalds', 1, 12, 'food', '02/18/2020'),
    ('Coffee', 1, 2, 'food', '02/19/2020'),
    ('Coffee', 1, 2, 'food', '02/20/2020'),
    ('Groceries', 1, 50, 'food', '02/20/2020'),
    ('Coffee', 1, 2, 'food', '02/21/2020'),
    ('Groceries', 1, 30.5, 'food', '02/25/2020'),
    ('Rent', 1, 1500, 'home', '02/1/2020'),
    ('Home Insurance', 1, 150, 'home', '02/3/2020'),
    ('Hydro', 1, 300, 'home', '02/11/2020'),
    ('Gas', 1, 80, 'home', '02/20/2020'),
    ('Auto Insurance', 1, 200, 'transporation', '02/5/2020'),
    ('Auto Lease', 1, 320, 'transporation', '02/5/2020'),
    ('Fancy Sushi', 1, 500, 'food', '02/11/2020'),('Hydro', 1, 250, 'utilities', '02/5/2020'),
    ('Movies', 1, 550, 'entertainment', '02/11/2020'),
    ('Viagara', 1, 1000, 'medical', '02/5/2020'),
    ('Debt', 1, 666, 'debt', '02/5/2020'),
    ('Flying Pony', 1, 1250, 'misc', '02/5/2020'),
    ('Auto Lease', 1, 1, 'transporation', '03/5/2020'),
    ('Fancy Sushi', 1, 500, 'food', '03/11/2020'),('Hydro', 1, 1, 'utilities', '03/5/2020'),
    ('Movies', 1, 1, 'entertainment', '03/11/2020'),
    ('Viagara', 1, 1, 'medical', '03/5/2020'),
    ('Debt', 1, 1, 'debt', '03/5/2020'),
    ('Flying Pony', 1, 1, 'misc', '03/5/2020'),
    ('home', 1, 1, 'home', '03/5/2020');



INSERT INTO budget (user_id, base, income, c_hous, c_tran, c_food, c_util, c_entr, c_medi, c_debt, c_misc)
VALUES (1, 100000, 1000, 10, 20, 30, 40, 50, 60, 70, 80);
  
INSERT INTO goals (name, user_id, type, amount, description, date)
VALUES
    ('goal01', 1, 'SFP', 5000, 'description', '01/5/2020'),
    ('goal02 long name -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------',
    1, 'SPM', 500,
    'description description description description description description description description description description description description description description description description description description description description description description description description description description description',
    '01/5/2020');

  -- id SERIAL PRIMARY KEY NOT NULL,
  -- name VARCHAR(255) NOT NULL,
  -- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  -- amount INTEGER NOT NULL,
  -- type VARCHAR(255) NOT NULL,
  -- date DATE NOT NULL