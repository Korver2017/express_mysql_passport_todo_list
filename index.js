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

const TodoLists = sequelize.define ('todolists', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  todo_item: Sequelize.STRING,
  done: Sequelize.BOOLEAN,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  // timestamps: false,
  // freezeTableName: true,
});

sequelize
  .authenticate ()
  .then (() => {
    console.log ('Connection has been established successfully.');

    (async () => {

      let todos = await TodoLists.findAll ({
        where: {
          todo_item: 'QWER'
        }
      });

      console.log (`find ${todos.length}:`);

      for (let todo of todos) {
        console.log (JSON.stringify (todo));
      }
    })();
  })
  .catch (err => {
    console.error ('Unable to connect to the database:', err);
  });

app.get ('/', function (req, res) {

  TodoLists.findAll ()
    .then (todos => {

      console.log (`find ${todos.length}:`);

      for (let todo of todos) {
        console.log (JSON.stringify (todos));
      }

      return res.json (todos);
    });
});

// app.post ('/add', function (req, res) {

//   let addedData = req.body;

//   console.log (req.body);

// TodoLists.create ({
//   // id: 11,
//   todo_item: 'qwer',
//   // createdAt: new Date (),
//   // updatedAt: new Date ()
// })
// .then (res => {
//   console.log (res.id);
// })
// });

app.post ('/remove', function (req, res) {

  TodoLists.destroy ({
    where: {
      id: req.body.id
    }
  })
  .then (function (rowDeleted) {

    if (rowDeleted) {
      console.log ('Deleted successfully');
    }

    res.json ({error: false, data: rowDeleted, message: 'Todo items deleted successfully.'});
  });
});

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