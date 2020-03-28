INSERT INTO users (name, riskScore, portfolioReturn, literacy, eduScores, eduIsAnswered, isNew)
VALUES
    ('bob', 0, 1, 0, '{"1":0, "2":0, "3":0, "4":0, "5":0, "6":0}', '{"1":0, "2":0, "3":0, "4":0, "5":0, "6":0}', false),
    ('joe', 0, 1, 0, '{"1":0, "2":0, "3":0, "4":0, "5":0, "6":0}', '{"1":0, "2":0, "3":0, "4":0, "5":0, "6":0}', false);


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
    ('Home Insurance', 1, 150, 'Home', '01/3/2020'),
    -- ('Hydro', 1, 200, 'home', '01/11/2020'),
    -- ('Gas', 1, 50, 'home', '01/20/2020'),
    -- ('Auto Insurance', 1, 200, 'transporation', '01/5/2020'),
    ('Hydro', 1, 250, 'Utilities', '01/5/2020'),
    -- ('Movies', 1, 550, 'Entertainment', '01/11/2020'),
    -- ('Viagara', 1, 1000, 'Medical', '01/5/2020'),
    -- ('Debt', 1, 666, 'Debt', '01/5/2020'),
    -- ('Flying Pony', 1, 1250, 'Misc', '01/5/2020'),



    ('Auto Lease', 1, 320, 'Transportation', '01/5/2020'),
    ('Coffee', 1, 2, 'Food', '02/03/2020'),
    ('Burger King', 1, 10, 'Food', '02/05/2020'),
    ('Groceries', 1, 28, 'Food', '02/6/2020'),
    ('Rotti King', 1, 15, 'Food', '02/8/2020'),
    ('Sushi', 1, 20, 'Food', '02/11/2020'),
    ('Coffee', 1, 2, 'Food', '02/12/2020'),
    ('Groceries', 1, 35, 'Food', '02/16/2020'),
    ('Coffee', 1, 2, 'Food', '02/16/2020'),
    ('Mcdonalds', 1, 12, 'Food', '02/18/2020'),
    ('Coffee', 1, 2, 'Food', '02/19/2020'),
    ('Coffee', 1, 2, 'Food', '02/20/2020'),
    ('Groceries', 1, 50, 'Food', '02/20/2020'),
    ('Coffee', 1, 2, 'Food', '02/21/2020'),
    ('Groceries', 1, 30.5, 'Food', '02/25/2020'),
    ('Rent', 1, 1500, 'Home', '02/1/2020'),
    ('Home Insurance', 1, 150, 'Home', '02/3/2020'),
    ('Hydro', 1, 300, 'Home', '02/11/2020'),
    ('Gas', 1, 80, 'Home', '02/20/2020'),
    ('Auto Insurance', 1, 200, 'Transportation', '02/5/2020'),
    ('Auto Lease', 1, 320, 'Transportation', '02/5/2020'),
    ('Fancy Sushi', 1, 500, 'Food', '02/11/2020'),('Hydro', 1, 250, 'Utilities', '02/5/2020'),
    ('Movies', 1, 550, 'Entertainment', '02/11/2020'),
    ('Viagara', 1, 1000, 'Medical', '02/5/2020'),
    ('Debt', 1, 666, 'Debt', '02/5/2020'),
    ('Flying Pony', 1, 1250, 'Misc', '02/5/2020');



INSERT INTO budget (user_id, base, income, c_hous, c_tran, c_food, c_util, c_entr, c_medi, c_Debt, c_misc)
VALUES (1, 100000, 5000, 2000, 200, 800, 400, 200, 100, 100, 300);
  
INSERT INTO goals (name, user_id, type, amount, description, date)
VALUES
    ('goal01 save for purchase', 1, 'SFP', 200000, 'description', '01/5/2027')
    