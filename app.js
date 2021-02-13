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
app.get("/login", (req, res) => {
    res.render('login');
});

/************************************************  REGISTER (to be del)   *****************************************************/
app.get("/register", (req, res) => {
    res.render('register');
});

/**********************************************     D A S H B O A R D     ***************************************************/
app.get('/dashboard', (req,res) => {
    res.render('Dashboard');
});

/********************************************     R E S E R V A T I O N     *************************************************/
app.get('/reservation', (req,res) => {
    res.render('reservation');
});

/***********************************************     C H E C K   I N     ****************************************************/
app.get('/checkin/:date', (req,res) => {
    connection.query('SELECT * FROM checkIn WHERE checkInDate = '+req.params.date+'', (err, result) => {
        if(err) {
            res.json({
                message: "Current Date Required"
            });
        } else {
            res.json({
                message: "Check in Retrieved",
            });
        }
    })
});

app.post('/checkin', urlEncodedParser, (req, res) => {
    connection.query('INSERT INTO checkin(reservationId, accountId, roomId, checkInDate, checkOutDate, noOfDays, noOfHead) VALUES ('+req.body.reservationId+','+req.body.accountId+','+req.body.roomId+',"'+req.body.checkInDate+'","'+req.body.checkOutDate+'", '+req.body.noOfDays+','+req.body.noOfHead+')', (err, result) => {
        console.log(err)
        if(err){
            res.json({
                message: "CheckIn Failed",
                status: 400,
            })
        } else {
            res.json({
                message: "Successfully Checked In",
                status: 201,
            })
        }
    });
})

app.put('/checkin', urlEncodedParser, (req, res) => {
    connection.query('UPDATE INTO checkin(reservationId, accountId, roomId, checkInDate, checkOutDate, noOfDays, noOfHead) VALUES ('+req.body.reservationId+','+req.body.accountId+','+req.body.roomId+',"'+req.body.checkInDate+'","'+req.body.checkOutDate+'", '+req.body.noOfDays+','+req.body.noOfHead+')', (err, result) => {
        console.log(err)
        if(err){
            res.json({
                message: "CheckIn Failed",
                status: 400,
            })
        } else {
            res.json({
                message: "Successfully Checked In",
                status: 201,
            })
        }
    });
})

/****************************************     R O O M   M A N A G E M E N T     *********************************************/

app.get('/room-mgmt/all', (req,res) => {
    res.render('room-mgmt');
});

/***********************************************       F L O O R S       ****************************************************/


/*************************************     S E R V I C E   M A N A G E M E N T     ******************************************/

app.get('/service-mgmt', (req,res) => {
    res.render('service-mgmt');
});

/*************************************     A C C O U N T   M A N A G E M E N T     ******************************************/ 

app.get('/account-mgmt', (req,res) => {
    res.render('account-mgmt');
});

/***********************************************       R E P O R T       ****************************************************/
app.get('/report', (req,res) => {
    res.render('report');
});

app.listen(3000);
console.log("Server is up in port 3000");