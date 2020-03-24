const router = require("express").Router();

module.exports = db => {
  router.get("/users/:id", (request, response) => {
    console.log('selecting user')

    console.log('id route')
    console.log("get", request.params);
    db.query(
      `
      SELECT * FROM users 
      WHERE id = $1
    `,
      [request.params.id]
    ).then(({ rows: days }) => {
      response.json(days);
    });
  });

  router.put("/users/updateedu", (request, response) => {

    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    const { eduscores , userId } = request.body;

    db.query(
      `
      UPDATE users
      SET eduScores = $1 
      WHERE id = $2
      `,
      [eduscores, parseInt(userId)]
    )
      .then(x => {
        setTimeout(() => {
          response.status(204).json({});
        }, 1000);
      })
      .catch(error => console.log(error));
  });

  router.put("/users/update/newuser", (request, response) => {

    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    const { userId } = request.body;
    console.log('updaing newuser status to false')
    console.log(request.body, 'the user id is')

    db.query(
      `
      UPDATE users
      SET isNew = false 
      WHERE id = $1
      `,
      [parseInt(userId)]
    )
      .then(x => {
        setTimeout(() => {
          response.status(204).json({});
        }, 1000);
      })
      .catch(error => console.log(error));
  });

  // router.put("/users/add", (request, response) => {
  //   if (process.env.TEST_ERROR) {
  //     setTimeout(() => response.status(500).json({}), 1000);
  //     return;
  //   }

  //   console.log(request.body)

  //   const { username } = request.body;

  //   db.query(
  //     `
  //     INSERT INTO users (name, riskScore, portfolioReturn)
  //     VALUES
  //     ($1, 1, 1)

  //     `,
  //     [username]
  //   )
  //     .then(x => {
  //       console.log(x, 'after add')
  //       setTimeout(() => {
  //         response.status(204).json({x});
  //       }, 1000);
  //     })
  //     .catch(error =>{
  //       console.log(error, 'erring in add');
  //       response.json({error});
  //     })

  // });

  router.put("/users/update", (request, response) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }
    const { user, riskScore, portfolioReturn } = request.body;

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

  router.get("/users/:username", (request, response) => {
    console.log('backend login')
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    console.log(request.params.username)

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
