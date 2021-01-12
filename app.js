const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require("express-session");
const urlEncodedParser = bodyParser.urlencoded({extended: true});
const app = express();
const ejs = require("ejs");
const bcrpyt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(flash());
app.use(urlEncodedParser);
app.use(bodyParser.json());

const connection = mysql.createConnection({
    multipleStatements: true,
    host: "127.0.0.1",
    user: "root",
    password: "",
    dateStrings: true,
    database: "aosmec"
});

app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
}));

connection.connect((err) => {
    if(err) throw err;
    console.log("Database Connected");
});

/************************************************       L O G I N       *****************************************************/


/**********************************************     D A S H B O A R D     ***************************************************/


/********************************************     R E S E R V A T I O N     *************************************************/


/***********************************************     C H E C K   I N     ****************************************************/


/****************************************     R O O M   M A N A G E M E N T     *********************************************/


/***********************************************       F L O O R S       ****************************************************/


/*************************************     S E R V I C E   M A N A G E M E N T     ******************************************/


/*************************************     A C C O U N T   M A N A G E M E N T     ******************************************/ 


/***********************************************       R E P O R T       ****************************************************/


app.listen(3000);
console.log("Server is up in port 3000");