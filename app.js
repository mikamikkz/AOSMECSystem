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

/*****************************************       R O O M       ************************************************/

app.get("/room", (req, res) => {
    connection.query('SELECT * FROM `room`', (err, result) => {
        console.log(result);
        res.json({
            message: "Room",
            status: 200,
        })
    });
});

app.post("/room", urlEncodedParser, (req, res) => {
     connection.query('INSERT INTO room (roomTypeId, roomNo, status, occupied) VALUES ('+req.body.roomTypeId+','+req.body.roomNo+',"'+req.body.status+'", '+req.body.occupied+')', (err, result) => {
        console.log(result);
        if(err){
            res.json({
                message: "Room Not Added",
                status: 400
            })
        } else {
            res.json({
                message: "Room Added",
                status: 200,
            })
        }
    });
});

/**********************************************    G U E S T     ***************************************************/

app.get("/guest", (req, res) => {
    connection.query('SELECT * FROM `guest`', (err, result) => {
        console.log(result);
        res.json({
            message: "Guest",
            status: 200,
        })
    });
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
    connection.query('UPDATE checkin SET )', (err, result) => {
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
//retrieve
app.get('/room-mgmt/all', (req, res) => {
    connection.query('SELECT * FROM room_type', (err, result) => {
        if(err){
            res.json({
                message: "Rooms Info was not retrieved.",
                status: 404,
            })
        } else res.json({
            message: "Rooms info was retrieved.",
            status: 100,
        })
        console.log(result)
    });
});

app.get('/room-mgmt/all/:id', (req, res) => {
    connection.query('SELECT * FROM room_type WHERE id = '+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Rooms Info was not retrieved.",
                status: 404,
            })
        } else res.json({
            message: "Rooms info was retrieved.",
            status: 100,
        })
        console.log(result)
    });
});

//create
app.post('/room-mgmt/all', (req, res) => {
    connection.query('INSERT INTO room_type (name,rate,totalNoOfRoom) VALUES ('+req.body.name+','+req.body.rate+','+req.body.totalNoOfRoom+') ', (err, result) => {
        if(err){
            res.json({
                message: "Room was not added.",
                status: 404,
            })
        } else res.json({
            message: "Room was added.",
            status: 100,
        })
        console.log(result)
        console.log(err)
    });
});

app.post('/room-mgmt/all/:id', (req, res) => {
    connection.query('UPDATE room_type SET name = '+req.body.name+', rate = '+req.body.rate+', totalNoOfRoom = '+req.body.totalNoOfRoom+' WHERE id = '+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Room was not added.",
                status: 404,
            })
        } else res.json({
            message: "Room was added.",
            status: 100,
        })
        console.log(result)
        console.log(err)
    });
});

//delete
app.get('/room-mgmt/all/delete/:id', (req, res) => {
    connection.query('DELETE FROM room_type WHERE id = '+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Rooms Info was not deleted.",
                status: 404,
            })
        }
        res.json({
            message: "Rooms info was deleted.",
            status: 100,
        })
        console.log(result)
    });
});

/***********************************************       F L O O R S       ****************************************************/


/*************************************     S E R V I C E   M A N A G E M E N T     ******************************************/

//retrieve
app.get('/service-mgmt', (req, res) => {
    connection.query('SELECT * FROM service', (err, result) => {
        if(err){
            res.json({
                message: "Services were not retrieved.",
                status: 404,
            })
        }
        res.json({
            message: "Services were retrieved.",
            status: 100,
        })
        console.log(result)
    });
});

//create
app.post('/service-mgmt/add', urlEncodedParser, (req, res) => {
    connection.query('INSERT INTO service (name, rate, pricing) VALUES ('+req.body.name+','+req.body.rate+','+req.body.pricing+')', (err, result) => {
        if(err){
            res.json({
                message: "Insertion of Service has failed.",
                status: 400,
            })
        } else {
            res.json({
                message: "Successfully added service.",
                status: 201,
            })
        }
        console.log(err)
    });
})

//update
app.post('/service-mgmt/update/:id', urlEncodedParser, (req, res) => {
    connection.query('UPDATE service SET name = '+req.body.name+', rate = '+req.body.rate+', pricing = '+req.body.pricing+' WHERE id = '+req.params.id+' WHERE id = '+req.params.id+' ',(err, result) => {
        if(err){
            res.json({
                message: "Update of Service has failed.",
                status: 400,
            })
        } else {
            res.json({
                message: "Successfully updated service.",
                status: 201,
            })
        }
        console.log(err)
    });
})

//delete
app.get('/service-mgmt/delete/:id', (req,res) => {
    connection.query('DELETE FROM service WHERE id='+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Service Deletion Failed",
                status: 400,
            })
        } else {
            res.json({
                message: "Service Successfully Deleted",
                status: 201,
            })
        }
        console.log(result)
    });
});
/*************************************     A C C O U N T   M A N A G E M E N T     ******************************************/ 
//retrieve
app.get('/account-mgmt', (req, res) => {
    connection.query('SELECT * FROM account', (err, result) => {
        if((err)){
            res.json({
                message: "Account was not retrieved.",
                status: 404,
            })
        }
        res.json({
            message: "Account was retrieved.",
            status: 100,
        })
        console.log(result)
    });
});

app.get('/account-mgmt/:id', (req, res) => {
    connection.query('SELECT * FROM account WHERE id = '+req.params.id+' ', (err, result) => {
        if((err)){
            res.json({
                message: "Account was not retrieved.",
                status: 404,
            })
        }
        res.json({
            message: "Account was retrieved.",
            status: 100,
        })
        console.log(result)
    });
});

//create
app.post('/account-mgmt', urlEncodedParser, (req, res) => {
    connection.query('INSERT INTO account (username, password, fname, mname, lname, birthdate, gender) VALUES ('+req.body.username+','+req.body.password+','+req.body.fname+','+req.body.mname+','+req.body.lname+',"'+req.body.birthdate+'",'+req.body.gender+')', (err, result) => {
        if(err){
            res.json({
                message: "Insertion of Account has failed.",
                status: 400,
            })
        } else {
            res.json({
                message: "Successfully added account.",
                status: 201,
            })
        }
        console.log(err)
        console.log(result)
    });
})

//delete
app.get('/account-mgmt/delete/:id', urlEncodedParser, (req, res) => {
    connection.query('DELETE FROM account WHERE id = '+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Deletion of Account has failed.",
                status: 400,
            })
        } else {
            res.json({
                message: "Successfully deleted account.",
                status: 201,
            })
            console.log(result)
        }
    });
})

app.post('/account-mgmt/update/:id', urlEncodedParser, (req, res) => {
    connection.query('UPDATE account SET username = '+req.body.username+', password = '+req.body.password+', fname = '+req.body.fname+', mname = '+req.body.mname+', lname = '+req.body.lname+', birthdate = "'+req.body.birthdate+'", gender = '+req.body.gender+' WHERE id = '+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Update of Account has failed.",
                status: 400,
            })
        } else {
            res.json({
                message: "Successfully updated account.",
                status: 201,
            })
        }
        console.log(err)
        console.log(result)
    });
})

/***********************************************       R E P O R T       ****************************************************/
app.get('/report', (req,res) => {
    res.render('report');
});

app.listen(3000);
console.log("Server is up in port 3000");