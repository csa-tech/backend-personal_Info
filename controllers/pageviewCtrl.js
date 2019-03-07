const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'mydatabase.c9ukuxyqda4n.us-west-1.rds.amazonaws.com',
  user     : 'CSAUser',
  password : 'Csa666!!',
  port     : '3306',
  database : 'rideshare'
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

Getpersonal = function (req, res, next) { 
  try {
    connection.query(`SELECT * FROM rideshare.user_info WHERE user_id = '${req.query.user_ID}';`, function(err, rows, fields) { //这里写SQL query
      if (err) { throw err; } 
      res.status(200).send(rows);
    });
  } catch(err) {
    res.status(500).send('SERVER ERROR:' + err);
    connection.end();
  }
}
InputPersonal = function(req, res, next){
  try{
    var input = req.query;
    var string = input.user_ID;
    connection.query(`SELECT * FROM rideshare.user_info WHERE user_id = '${string}';`, function(err, rows, fields) {
      if (err) {throw err;}
      var $ = req.body;
      // how to get information from response
      connection.query(`UPDATE rideshare.user_info SET 
                                                    name = '` + $.name + `',
                                                    phoneNum = '` + $.phoneNum + `',
                                                    carType = '` + $.carType + `',
                                                    carLicense = '` + $.carLicense + `',
                                                    carColor = '` + $.carColor + `' 
                                                    WHERE user_ID = '${string}';`, function(err, rows, fields) {
      if(err){throw err;}
      res.status(200).send('Success added name: ' + $.name + '\n',
                           'Success added phoneNum: ' + $.phoneNum + '\n',
                           'Success added carType: ' + $.carType + '\n',
                           'Success added carLicense: ' + $.carLicense + '\n',
                           'Success added carColor: ' + $.carColor + '\n');
      });
    });
  }catch(err){
    res.status(500).send("Server Error: " + err);
    connection.end();
  }
}

module.exports = { Getpersonal, InputPersonal }