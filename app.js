const express = require("express")
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const mysql = require('mysql');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

//parser middleware

app.use(bodyParser.urlencoded({encode:false}));

// parse application/json
app.use(bodyParser.json());

//static file
app.use(express.static('public'));

//Template Engine

app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine','hbs');

//connection pool

const pool = mysql.createPool({
   connectionLimit: 100,
    host: "localhost",
    user: "ankit",
    password:"password",
    database: "digisole"
});

// connection database

pool.getConnection((err, con)=>{
    if(err) throw err;
    console.log('connected as Id '+ con.threadId);
});




const routes = require('./server/routes/user');
app.use('/',routes);

app.listen(port, ()=>{
    console.log('Listening on port ' +port);
})