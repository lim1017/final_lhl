const router = require("express").Router();

module.exports = db => {
  router.put("/account/register", (request, response) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    console.log(request.body);

    const { username } = request.body;

    db.query(
      `
      INSERT INTO users (name, riskScore, portfolioReturn, literacy, eduScores, eduIsAnswered, isNew)
      VALUES
      ($1, 0, 1, 0, '{"1":0, "2":0, "3":0, "4":0, "5":0, "6":0}', '{"1":0, "2":0, "3":0, "4":0, "5":0, "6":0}', true)

      `,
      [username]
    )
      .then(x => {
        console.log(x, "after add");
        setTimeout(() => {
          response.status(204).json({ x });
        }, 1000);
      })
      .catch(error => {
        console.log(error, "erring in add");
        response.json({ error });
      });
  });

  router.get("/account/:username", (request, response) => {
    console.log("backend login");
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    console.log(request.params.username);

    db.query(
      `
      SELECT * FROM users
      WHERE name = $1
      `,
      [request.params.username]
    )
      .then(({ rows: user }) => {
        response.json(user);
      })
      .catch(error => console.log(error));
  });

  return router;
};
