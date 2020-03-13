const router = require("express").Router();

module.exports = db => {
  router.get("/users", (request, response) => {
    db.query(
      `
      SELECT * FROM users
    `
    ).then(({ rows: days }) => {
      response.json(days);
    });
  });

  router.put("/users/add", (request, response) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }
    const { user, riskScore, portfolioReturn } = request.body;
    console.log("TEST", portfolioReturn);
    console.log("TEST2", request.body);

    db.query(
      `
      UPDATE users
      SET riskscore = $2::integer, 
      portfolioreturn = $3::real
      WHERE id = $1::integer
      `,
      [user, riskScore, portfolioReturn]
    )
      .then(x => {
        setTimeout(() => {
          response.status(204).json({});
        }, 1000);
      })
      .catch(error => console.log(error));
  });

  return router;
};
