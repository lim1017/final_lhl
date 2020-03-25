const router = require("express").Router();

module.exports = db => {

  router.get("/users/:id", (request, response) => {
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

  router.put("/users/updateliteracy", (request, response) => {

    console.log('answering question!')

    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    const { userId } = request.body;

    db.query(
      `
      UPDATE users
      SET literacy = literacy + 5 
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
    const { user, riskScore, portfolioReturn } = request.body.userPortfolio;

    console.log(request.body, 'from user update!!')

    if (request.body.scoreUp){
      score = 15;
    } 

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
      
        db.query(
          `
          UPDATE users
          SET literacy = literacy + $1 
          WHERE id = $2
          `,
          [score, user]
        ) .then(x => {
              response.status(200).send(request.file)
              
              console.log(x, 'done updating literacy in user/update')
        })
        .catch(error => console.log(error));


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
