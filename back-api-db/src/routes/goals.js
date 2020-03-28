const router = require("express").Router();

module.exports = db => {
  router.get("/goals/:userid", (request, response) => {
    db.query(
      `
      SELECT *, to_char( date, 'DD-MON-YYYY') as date FROM goals WHERE user_id = $1::integer
      `,
      [request.params.userid]
    ).then(({ rows: goals }) => {
      response.json(goals);
    });
  });



  router.put("/goals/:id", (request, response) => {

    const { name, user_id, type, amount, description, date } = request.body.goal;


    var score = 0

    if (request.body.scoreUp){
      score = 15;
    } 

    db.query(
      `
      SELECT *, to_char( date, 'DD-MON-YYYY') as date FROM goals WHERE id = $1::integer
     `,
     [request.params.id]
    ).then(({ rows: result }) => {
      if (result.length !== 0) {

        db.query(
          `
          UPDATE goals SET 
          name = $1::text,
          user_id = $2::integer,
          type = $3::text,
          amount = $4::integer,
          description = $5::text,
          date = $6::date 
          WHERE id = $7::integer
          `,
          [name, user_id, type, amount, description, date, request.params.id]
        ).then(() => {
          response.json(`database:goal ${request.params.id} updated`);
        }).catch(error => console.log(error));
      } else {
        db.query(
          `
          INSERT INTO goals (name, user_id, type, amount, description, date)
            VALUES ($1::text, $2::integer, $3::text, $4::integer, $5::text, $6::date)
          `,
          [name, user_id, type, amount, description, date]
        ).then(() => {
          response.json(`database:goal ${request.params.id} updated`);

          db.query(
            `
            UPDATE users
            SET literacy = literacy + $1 
            WHERE id = $2
            `,
            [score, user_id]
          ).then(x => {
            response.status(200)
          })

          




        }).catch(error => console.log(error));  
      }
    })
  });

  router.delete("/goals/:id", (request, response) => {

    db.query(`DELETE FROM goals WHERE id = $1::integer`,
    [request.params.id]
    ).then(() => {
        response.json(`database:goal ${request.params.id} updated`);
    }).catch(error => console.log(error));
  });

  return router;
};
