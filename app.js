//packages

const express = require('express');
const app = express();
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// engines and sets

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

// static directorys

app.use(express.static('public'));

// validators, body parser, and server listing

app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000 , function (){
  console.log('THE SERVER IS UP AND RUNNING!')
});

// empty arrays to push info into

var todos = [];
var complete = [];

// get info from input

app.get('/', function (request, response) {
  response.render('index', {pageTitle: 'To Do List', todos: todos, complete: complete})
});

// post info into the to do list
app.post('/', function (request, response) {
  todos.push(request.body.todos)
  response.redirect('/')
});

// complete info and push into new list
app.post('/completed', function (request, response) {
  const remove = request.body.completed
  todos.splice(todos.indexOf(remove), 1)
  complete.push(remove)
  response.redirect('/')
});
