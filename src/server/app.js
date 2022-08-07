var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//import our database here
const connectToMongoose = require('./database/connect');
const Todo = require('./database/model');
// connect to database
connectToMongoose();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const verifyDataInBody = (req, type) => {
  if (type === 'del' || type === 'mod') {
    return req.body && req.body.index >= 0 && req.body.index < todos.length;
  }

  return req.body && req.body.content && req.body.isCompleted !== undefined;
};

//let's define/implement a get api here
app.get('/allTodos', async (req, res) => {
  const todosFromDB = await Todo.find({}).exec();
  console.log(todosFromDB);
  const todosSendToFE = todosFromDB.map(({ _id, content, isCompleted }) => {
    return {
      content,
      isCompleted,
      id: _id,
    };
  });

  res.json(todosSendToFE);
});

//1. add a todo
// example => body => {content: "Fdfafa", isCompleted: false}
app.post('/addTodo', async (req, res) => {
  //if the data is valid
  if (req.body && req.body.content && req.body.isCompleted !== undefined) {
    const todo = new Todo({
      content: req.body.content,
      isCompleted: req.body.isCompleted,
    });

    const newTodo = await todo.save();
    if (todo === newTodo) {
      res.json({
        message: 'succeed',
        status: 200,
        newTodo: {
          content: req.body.content,
          isCompleted: req.body.isCompleted,
          id: newTodo._id,
        },
      });
      return;
    }

    res.json({
      status: 500,
      message: 'failed',
    });
    return;
  }
  //if the data is invalid
  res.json({
    status: 500,
    message: 'failed',
  });
});

//2. mod a todo
//example => body => {index: 2}
app.post('/modTodo', async (req, res) => {
  //if the id is valid
  if (req.body && req.body.id) {
    const id = req.body.id;
    const queryResult = await Todo.findOne({ _id: id });
    const temp = queryResult.isCompleted;
    queryResult.isCompleted = !queryResult.isCompleted;
    const saveResult = await queryResult.save();
    if (saveResult.isCompleted !== temp) {
      res.json({ message: 'succeed', status: 200 });
      return;
    }

    res.json({ message: 'failed', status: 500 });
    return;
  }
  //if the id is invalid
  res.json({
    message: 'failed',
    status: 500,
  });
});

//3. delete a todo
app.post('/delTodo', async (req, res) => {
  //if the id is valid
  if (req.body && req.body.id) {
    const id = req.body.id;
    const queryResult = await Todo.deleteOne({ _id: id });
    if (queryResult) {
      res.json({ message: 'succeed', status: 200 });
      return;
    }

    res.json({
      message: 'failed',
      status: 500,
    });
    return;
  }
  //if the index is invalid
  res.json({
    message: 'failed',
    status: 500,
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
