const router = require("express").Router();

module.exports = db => {
  router.get("/expenses", (request, response) => {
    db.query(
      `
      SELECT * FROM expenses
    `
    ).then(({ rows: expenses }) => {
      response.json(expenses);
    });
  });



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

  return router;
};
