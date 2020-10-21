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

    app.get ('/', async (req, res) => {

      try {

        let todos = await TodoLists.findAll ();
        console.log (`find ${todos.length}`);
        
        return res.json (todos);
      }
      catch (err) {
        console.log (err.message);
      };
    });

    app.post ('/add', async (req, res) => {

      try {
        
        let addedTodo = req.body.todo_item;

        await TodoLists.create ({
          todo_item: addedTodo,
          createdAt: new Date (),
          updatedAt: new Date ()
        });

        return res.json ({error: false, data: addedTodo, message: 'Todo items added successfully.'});
      }
      catch (err) {
        console.log (err.message);
      };
    });
  })
  .catch (err => {
    console.error ('Unable to connect to the database:', err);
  });

app.post ('/remove', async (req, res) => {

  try {
    TodoLists.destroy ({
      where: {
        id: req.body.id
      }
    })
    .then (() => res.json ({error: false, message: 'Todo items deleted successfully.'}));
  }
  catch (err) {
    console.log (err.message);
  };
});

app.put ('/update', async (req, res) => {

  try {

    console.log (req.body);

    await TodoLists.update ({todo_item: req.body.todo_item}, {

      where: {
        id: req.body.id
      }
    });

    return res.json ({error: false, data: req.body.todo_item, message: 'Todo items updated successfully.'});
  }
  catch (err) {
    console.log (err.message);
  }
});
