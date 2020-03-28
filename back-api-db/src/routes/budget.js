const router = require("express").Router();

module.exports = db => {
  router.get("/budget/:id", (request, response) => {
    db.query(
      `
      SELECT * FROM budget WHERE user_id = $1::integer
      `,
      [request.params.id]
    ).then(({ rows: budget }) => {
      response.json(budget);
    });
  });

  router.put("/budget/:id", (request, response) => {

    const { user_id, base, income, c_hous, c_tran, c_food, c_util, c_entr, c_medi, c_debt, c_misc } = request.body;

    db.query(
      `
      SELECT * FROM budget WHERE user_id = $1::integer
     `,
     [request.params.id]
    )
    .then(({ rows: result }) => {
      if (result.length !== 0) {
        db.query(
          `
          UPDATE budget SET 
          base = $1::integer,
          income = $2::integer,
          c_hous = $3::integer,
          c_tran = $4::integer,
          c_food = $5::integer,
          c_util = $6::integer,
          c_entr = $7::integer,
          c_medi = $8::integer,
          c_debt = $9::integer,
          c_misc = $10::integer
          WHERE user_id = $11::integer
          `,
          [base, income, c_hous, c_tran, c_food, c_util, c_entr, c_medi, c_debt, c_misc, request.params.id]
        ).then(() => {
          response.json(`database: budget for user ${user_id} updated`);
        }).catch(error => console.log(error));
      } else {
        db.query(
          `
          INSERT INTO budget (base, income, c_hous, c_tran, c_food, c_util, c_entr, c_medi, c_debt, c_misc, user_id)
            VALUES ($1::integer, $2::integer, $3::integer, $4::integer, $5::integer, $6::integer, $7::integer, $8::integer, $9::integer, $10::integer, $11::integer)
          `,
          [base, income, c_hous, c_tran, c_food, c_util, c_entr, c_medi, c_debt, c_misc, request.params.id]
        ).then(() => {
          response.json(`database: budget for user ${user_id} inserted`);
        }).catch(error => console.log(error));  
      }
    })
  });

  return router;
};