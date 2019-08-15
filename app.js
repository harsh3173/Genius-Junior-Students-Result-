const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require("body-parser");
var _ = require('lodash');
const app = express();
const Student = require(__dirname + "/student");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connect to MongoDB
mongoose.connect("mongodb+srv://harsh:mongodb@cluster0-ariyd.mongodb.net/MsDB",{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))


// Connect flash
app.use(flash());

// Global constiables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes


// Register Page
app.get('/', (req, res) => res.render('register'));

// Register
app.post('/', (req, res) => {
	const firstName = _.capitalize(req.body.firstName);
	const lastName = _.capitalize(req.body.lastName);
	const username = req.body.username;
	let errors = [];
	if(!firstName || !lastName || !username ) {
		errors.push({
			msg: 'Please enter all fields'
		});
	}
	if(errors.length > 0) {
		res.render('register', {
			errors,
			firstName,
			lastName,
			username,
		});
	}  else {

				Student.findOne({username: username},
           function(err, student) {
					if(student) {
						if((firstName === _.capitalize(student.first_name1) && lastName === _.capitalize(student.last_name1)) || (firstName === _.capitalize(student.first_name2) && lastName === _.capitalize(student.last_name2))) {
							console.log("Verified Names");
              res.render('dashboard', {
                firstName : firstName,
                lastName  : lastName,
                username  : username,
                marks : student.Marks,
                standard : student.Standard,
                school : student.School
               })
						} else {
							console.log("Names are not valid for given Application Number");
							req.flash('error_msg', "Names are not valid for given Application Number.\n Try Again");
							res.redirect('/');
						}
					} else {
						console.log("No User found in DataBase");
						req.flash('error_msg', "No User with given Application Number found in DataBase.\n Try Again");
						res.redirect('/');
					}
				})
			}
})



app.get('/logout', (req, res) => {
    	res.redirect('/');
});

app.set( 'port', ( process.env.PORT || 3000 ));

// Start node server
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });
