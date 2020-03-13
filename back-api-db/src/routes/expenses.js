const router = require("express").Router();

module.exports = db => {
  router.get("/expenses/:date", (req, response) => {

      date= req.params.date.split('+')
    db.query(
      `
      Select * from expenses 
      where extract(month from date)=$1 and extract(year from date)=$2;  
      `,
      [date[0], date[1]]
    ).then(({ rows: expenses }) => {
      response.json(expenses);
    });
    
  });

  // router.get("/expenses", (request, response) => {
  //   db.query(
  //     `
  //     SELECT * FROM expenses
  //   `
  //   ).then(({ rows: expenses }) => {
  //     response.json(expenses);
  //   });
  // });

  router.get("/expensestotal", (request, response) => {
    db.query(
      `
      SELECT type, Sum(amount) 
      FROM expenses
      GROUP BY type
    `
    ).then(({ rows: totalExpense }) => {
      response.json(totalExpense);
    });
  });

  router.put("/expenses/add/", (request, response) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    const { amount, name, type } = request.body;

    db.query(
      `
      INSERT INTO expenses (name, user_id, amount, type, date)
      VALUES
      ($1, 1, $2, $3, current_date)

      `,
      [name, amount, type]
    )
      .then((x) => {
        setTimeout(() => {
          response.status(204).json({});
        }, 1000);
        console.log(x, 'xxxxxxxxxxxxxx')
        console.log(response, 'responseee')

      })
      .catch(error => console.log(error));
  });





 

  return router;
};
