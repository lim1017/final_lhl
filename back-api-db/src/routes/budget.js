const router = require("express").Router();

module.exports = db => {
  router.get("/budget", (request, response) => {
    db.query(
      `
      SELECT * FROM budget
    `
    ).then(({ rows: budget }) => {
      response.json(budget);
    });
  });

  return router;
};
