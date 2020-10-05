let express = require ('express');
let app = express ();
let mysql = require ('mysql');
let Sequelize = require ('sequelize');
let cors = require ('cors');
let config = require ('./config');

app.use (cors ());

app.listen (3000, function () {
  console.log ('Example app listening on port 3000!');
});

app.use (express.json ());

const sequelize = new Sequelize (config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    },
});

sequelize
  .authenticate ()
  .then (() => {
    console.log ('Connection has been established successfully.');
  })
  .catch (err => {
    console.error ('Unable to connect to the database:', err);
  });

const TodoList = sequelize.define ('todo_list', {
  todo_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  todo_item: Sequelize.STRING (150),
  date: Sequelize.STRING (128),
  todo_done: Sequelize.STRING (254),
}, {
  timestamps: false,
  freezeTableName: true,
});

(async () => {

  let todoList = await TodoList.findAll ({
    where: {
      todo_id: 30
    }
  });

  console.log(`find ${todoList.length}:`);

  for (let todo of todoList) {
    console.log (JSON.stringify (todo));
  }
})();

// let con = mysql.createConnection ({

//   typeCast: function (field, next) {
//     if (field.type === 'TINY' && field.length === 1) {
//       return (field.string () === '1');
//     } else {
//       return next ();
//     }
//   },

// 	host: 'localhost',
// 	user: 'root',
// 	password: 'password',
// 	database: 'todo_list',
// 	port: 3306
// });

// con.connect (function (err) {

//   if (err) {
// 		console.log ('connecting error');
// 		console.log (err);
//     return;
//   }

//   console.log ('connecting success');
// });

// app.get ('/', function (req, res) {

//   con.query (`SELECT * FROM todo_list`, (err, rows) => {

//     if (err)
//       throw err;

//     console.log ('Data received from Db:');
//     console.log (rows);

//     return res.send (rows);
//   });
// });

// app.post ('/add', function (req, res) {

//   let addedData = req.body;
  
//   console.log (req.body);

//   con.query ('INSERT INTO todo_list SET ?', addedData, function (error, results, fields) {

//     if (error)
//       throw error;

//     return res.json ({error: false, data: results, message: 'Todo items added.'});
//   });
// });

// app.put ('/update', function (req, res) {

//     let updatedData = req.body
//       , id = req.body.todo_id
//       ;

//     console.log (req.body);

//     con.query ('UPDATE todo_list SET ? WHERE todo_id = ?', [updatedData, id], function (error, results, fields) {

//       if (error)
//         throw error;

//       return res.json ({error: false, data: results, message: 'Todo items updated successfully.'});
//     });
// });

// app.post ('/remove', function (req, res) {

//   console.log (req.body.todo_id);

//   let id = req.body.todo_id;

//   con.query ('DELETE FROM todo_list WHERE todo_id = ?', id, function (error, results, fields) {

//     if (error)
//       throw error;

//     else 
//       res.json ({error: false, data: results, message: 'Todo items deleted successfully.'});
//   });
// });

console.log ('End');