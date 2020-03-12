const router = require("express").Router();

module.exports = db => {
  router.get("/goals", (request, response) => {
    db.query(
      `
      SELECT * FROM goals
    `
    ).then(({ rows: goals }) => {
      response.json(goals);
    });
  });

  router.put("/goals/add", (request, response) => {

    const { name, user_id, type, amount, description, date } = request.body.goal;

    db.query(
      `
      INSERT INTO interviews (name, user_id, type, amount, description, date) VALUES ($1::text, $2::integer, $3::text, $4::integer, $5::text, $6::date)
    `,
      [name, user_id, type, amount, description, date]
    )
      .then(() => {
        setTimeout(() => {
          response.status(204).json({});
          // updateAppointment(Number(request.params.id), request.body.interview);
        }, 1000);
      })
      .catch(error => console.log(error));
  });

  ('goal01', 1, 'SFP', 5000, 'description', '01/5/2020');

  return router;
};
