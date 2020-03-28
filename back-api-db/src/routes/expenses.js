const router = require("express").Router();
var multer = require('multer')


// to handle uploaded file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})

var upload = multer({ storage: storage }).single('file')

//

// create a function on the client side that'll break it into an array of []
// "Coffee,33,2,1\nFood,2,2,2,"
// ["Coffee,33,2,1", "Food,2,2,2," ]

function addExpenseToDB(expense) {
  // adds to db
  // call fn inside expenses/add
  // call insided expenses/file (looping through each expense)
}

function formatExpenses(data){
  finalOP=[]

  arr=data.textData.split('\n')
  arr.shift()
  arr.pop()

  arr.forEach(element => {
    x=element.split(',')
    finalOP.push(x)
  });


  return finalOP
}


module.exports = db => {

  router.put("/expenses/add/", (request, response) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    const { amount, name, type, userId } = request.body.expenseObj;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');

  var score = 0
  if (request.body.scoreUp){
    score = 15;
  } 


  datez = request.body.expenseObj.date.year + '/' + request.body.expenseObj.date.month + '/' + dd;
  

    db.query(
      `
      INSERT INTO expenses (name, user_id, amount, type, date)
      VALUES
      ($1, $2, $3, $4, $5)

      `,
      [name, userId, amount, type, datez]
    )
      .then(x => {
       
        db.query(
          `
          UPDATE users
          SET literacy = literacy + $1 
          WHERE id = $2
          `,
          [score, parseInt(userId)]
        ) .then(x => {
              response.status(200).send(x)
              
        })
        .catch(error => console.log(error));



      })
      .catch(error => console.log(error));
  });


  router.post('/expenses/file/',function(req, res) {  

    var score = 0
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
     
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
      } else if (err) {
          return res.status(500).json(err)
      }


      if (req.body.scoreUp){
        score = 15;
      } 
      datez = req.body.date.year + '/' + req.body.date.month + '/' + dd;
  
      return Promise.all(formatExpenses(req.body).map(element =>{
        return db.query(
          `
          INSERT INTO expenses (name, user_id, amount, type, date)
          VALUES
          ($1, $2, $3, $4, $5)
    
          `,
          [element[0], req.body.userId, element[1], element[2], datez]
          //name/userid/amount/type
        )
          
      })).then(x => {
        // res.status(200)
        db.query(
          `
          UPDATE users
          SET literacy = literacy + $1 
          WHERE id = $2
          `,
          [score, parseInt(req.body.userId)]
        ) .then(x => {
              res.status(200).send(req.file)
              
        })
        .catch(error => console.log(error));
        
      })
      .catch(error => console.log(error));
    });
    })

  router.get("/expenses/:date", (req, response) => {

    
    date= req.params.date.split('+')
    console.log(date, 'date from expenses')

  db.query(
    `
    Select *, to_char( date, 'DD-MON-YYYY') as date from expenses 
    WHERE user_id=$3 AND
    extract(month from date)=$1 AND extract(year from date)=$2;  
    `,
    [date[0], date[1], date[2]]
  ).then(({ rows: expenses }) => {
    response.json(expenses);
  });
  
  });



router.get("/expensestotal/:date", (req, response) => {
  date= req.params.date.split('+')

  db.query(
    `
    SELECT type, Sum(amount) FROM expenses 
    WHERE user_id=$3 AND extract(month from date)=$1 and extract(year from date)=$2
    GROUP BY type;
  `,
  [date[0], date[1], date[2]]
  ).then(({ rows: totalExpense }) => {
    response.json(totalExpense);
  });
});


  return router;
};
