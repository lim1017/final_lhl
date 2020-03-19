const router = require("express").Router();

module.exports = db => {
  router.get("/goals", (request, response) => {
    db.query(
      `
      SELECT *, to_char( date, 'DD-MON-YYYY') as date FROM goals ORDER BY id
      `
    ).then(({ rows: goals }) => {
      response.json(goals);
    });
  });

  router.put("/goals/:id", (request, response) => {

    // console.log('receiving goal: ', request.params.id, request.body)
    const { name, user_id, type, amount, description, date } = request.body;
    console.log('current id: ', request.params.id)

    db.query(
      `
      SELECT *, to_char( date, 'DD-MON-YYYY') as date FROM goals WHERE id = $1::integer
     `,
     [request.params.id]
    ).then(({ rows: result }) => {
      console.log(result)
      if (result.length !== 0) {
        console.log('running if')
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
        console.log('running else')
        db.query(
          `
          INSERT INTO goals (name, user_id, type, amount, description, date)
            VALUES ($1::text, $2::integer, $3::text, $4::integer, $5::text, $6::date)
          `,
          [name, user_id, type, amount, description, date]
        ).then(() => {
          response.json(`database:goal ${request.params.id} updated`);
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
