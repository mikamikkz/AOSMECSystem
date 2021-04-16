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

/*****************************************       R O O M ( C R U )      ************************************************/

//Create:
app.post("/room", urlEncodedParser, (req, res) => {
    connection.query('INSERT INTO room (roomTypeId, roomNo, status, occupied) VALUES ('+req.body.roomTypeId+','+req.body.roomNo+',"'+req.body.status+'", '+req.body.occupied+')', (err, result) => {
    //    console.log(result);
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

//Retrieve:
app.get("/room", (req, res) => {
    connection.query('SELECT * FROM `room`', (err, result) => {
        // console.log(result);
        res.json({
            message: "Room",
            status: 200,
            result
        })
    });
});

//Update:
app.get("/room/:id", (req, res) => {
    connection.query("SELECT roomTypeId, roomNo, status, occupied FROM room WHERE id="+req.params.id+" ", (err, result) => {
        // console.log(result);
        res.json({
            message: "Room Update",
            status: 200,
            result
        })
    });
});

app.post("/room/:id", urlEncodedParser, (req, res) => {
    connection.query('UPDATE room SET roomTypeId='+req.body.roomTypeId+',roomNo='+req.body.roomNo+', status="'+req.body.status+'", occupied= '+req.body.occupied+' WHERE id='+req.params.id+' ', (err, response) => {
        // console.log(err);
        if(err){
            res.json({
                message: "Room Not Updated",
                status: 400
            })
        } else {
            res.json({
                message: "Room Updated",
                status: 200,
            })
        }
    });
});


/******************************************    G U E S T ( C R )     **********************************************/

//Create:
app.post("/guest", urlEncodedParser, (req, res) => {
    connection.query('INSERT INTO guest (checkInId, fname, lname, gender, country, nationality, address, validId, validIdType, phoneNo) VALUES ('+req.body.checkInId+',"'+req.body.fname+'","'+req.body.lname+'", "'+req.body.gender+'","'+req.body.country+'","'+req.body.nationality+'", "'+req.body.address+'", '+req.body.validId+', "'+req.body.validIdType+'", '+req.body.phoneNo+')', (err, result) => {
    //    console.log(result);
       if(err){
           res.json({
               message: "Guess Not Added",
               status: 400
           })
       } else {
           res.json({
               message: "Guess Added",
               status: 200,
           })
       }
   });
});

//Retrieve:
app.get("/guest", (req, res) => {
    connection.query('SELECT * FROM `guest`', (err, result) => {
        // console.log(result);
        res.json({
            message: "Guest",
            status: 200,
            result
        })
    });
});

/*******************************     B I L L  ( C R )     *******************************/

//Create:
app.post("/bill", urlEncodedParser, (req, res) => {
    connection.query('INSERT INTO bill (roomId, status, keyDeposit, total) VALUES ('+req.body.roomId+', "'+req.body.status+'", '+req.body.keyDeposit+', '+req.body.total+')', (err, result) => {
    //    console.log(result);
       if(err){
           res.json({
               message: "Bill Not Added",
               status: 400
           })
       } else {
           res.json({
               message: "Bill Added",
               status: 200,
           })
       }
   });
});

//Retrieve:
app.get("/bill", (req, res) => {
    connection.query('SELECT * FROM `bill`', (err, result) => {
        // console.log(result);
        res.json({
            message: "Bill",
            status: 200,
            result
        })
    });
});

/*******************************     B I L L  D E T A I L S  ( C R U )     *******************************/

//Create:
app.post("/bill-details", urlEncodedParser, (req, res) => {
    connection.query('INSERT INTO bill_detail(billId, serviceId, quantity, total, status) VALUES ('+req.body.billId+', '+req.body.serviceId+', '+req.body.quantity+', '+req.body.total+', "'+req.body.status+'")', (err, result) => {
    //    console.log(result);
       if(err){
           res.json({
               message: "Bill Details Not Added",
               status: 400
           })
       } else {
           res.json({
               message: "Bill Details Added",
               status: 200,
           })
       }
   });
});

//Retrieve:
app.get("/bill-details", (req, res) => {
    connection.query('SELECT * FROM `bill_detail`', (err, result) => {
        // console.log(result);
        res.json({
            message: "Bill Details",
            status: 200,
            result
        })
    });
});

//Update:
app.get("/bill-details/:id", (req, res) => {
    connection.query("SELECT BD.billId, BD.serviceId, BD.quantity, BD.total, BD.status FROM bill_detail BD JOIN bill B ON B.id = BD.billId WHERE BD.billId = "+req.params.id+" ", (err, result) => {
        // console.log(result);
        res.json({
            message: "Bill Details Update1",
            status: 200,
            result
        })
    });
});
app.post("/bill-details/:id", urlEncodedParser, (req, res) => {
    connection.query("UPDATE `bill_detail` SET `quantity`='+req.body.quantity+',`total`='+req.body.total+',`status`='"+req.body.status+"' ", (err, result) => {
        // console.log(result);
           if(err){
               res.json({
                   message: "Bill Details Not Added",
                   status: 400
               })
           } else {
               res.json({
                   message: "Bill Details Added",
                   status: 200,
               })
           }
    });
});

/*******************************     E N D  O F  J I M     *******************************/


/********************************************     R E S E R V A T I O N     *************************************************/
/*RESERVEE TABLE*/
app.post('/reservee', urlEncodedParser, (req, res)=>{
    connection.query('INSERT INTO reservee(name, gender, country, email, phoneNo) VALUES ("'+req.body.name+'", "'+req.body.gender+'", "'+req.body.gender+'","'+req.body.email+'",'+req.body.phoneNo+')', (err, result) => {
        if(err){
            res.json({
                message: "Reservee Failed",
                status: 400,
            })
        } else {
            res.json({
                message: "Reservee Added",
                status: 201,
            })
        }
    });
})

app.get('/reservee/:id', (req, res)=> {
    connection.query('SELECT * FROM reservee WHERE id = '+req.params.id+'', (err, result) => {
        if(err) {
            res.json({
                message: "Reservee Id Required"
            });
        } else {
            res.json({
                message: "Reservee Retrieved",
                result
            });
        }
    })
})

app.post('/reservee/:id', urlEncodedParser, (req, res)=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    connection.query('UPDATE reservee SET name="'+req.body.name+'", gender="'+req.body.gender+'", country="'+req.body.country+'", email="'+req.body.email+'", phoneNo="'+req.body.phoneNo+'", updatedAt="'+today+'" WHERE id='+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Reservee Update Failed",
                status: 400,
            })
        } else {
            res.json({
                message: "Reservee Updated",
                status: 201,
            })
        }
    });
})

app.get('/reservee/delete/:id', (req, res)=> {
    connection.query('DELETE FROM reservee WHERE id='+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Reservee Delete Failed",
                status: 400,
            })
        } else {
            res.json({
                message: "Reservee Successfully Deleted",
                status: 201,
            })
        }
    });
})

/*RESERVATION TABLE*/

app.post('/reservation', urlEncodedParser, (req,res) => {
    connection.query('INSERT INTO reservation(reserveeId, accountId, type, status, checkInDate, checkOutDate, noOfDays, noOfHead, confirmationNo, reservationFee) VALUES ('+req.body.reserveeId+','+req.body.accountId+',"'+req.body.type+'", '+req.body.status+', "'+req.body.checkInDate+'","'+req.body.checkOutDate+'", '+req.body.noOfDays+','+req.body.noOfHead+','+req.body.confirmationNo+','+req.body.reservationFee+')', (err, result) => {
        if(err){
            res.json({
                message: "Reservation Failed",
                status: 400,
            })
        } else {
            res.json({
                message: "Reservation Success",
                status: 201,
            })
        }
    });
});

app.get('/reservation/:date', (req,res) => {
    connection.query('SELECT * FROM reservation WHERE checkInDate = '+req.params.date+'', (err, result) => {
        if(err) {
            res.json({
                message: "Current Date Required"
            });
        } else {
            res.json({
                message: "Reservation Retrieved",
                result
            });
        }
    })
});

app.get('/reservation/id/:id', (req,res) => {
    connection.query('SELECT * FROM reservation WHERE id = '+req.params.id+'', (err, result) => {
        if(err) {
            res.json({
                message: "Reservation Id Required"
            });
        } else {
            res.json({
                message: "Reservation Retrieved",
                result
            });
        }
    })
});

app.get('/reservation', (req,res) => {
    connection.query('SELECT * FROM reservation ORDER BY checkInDate', (err, result) => {
        if(err) {
            res.json({
                message: "Failed to Retrieve all Reservation"
            });
        } else {
            res.json({
                message: "Reservation Retrieved",
                result
            });
        }
    })
});

app.post('/reservation/:id', urlEncodedParser, (req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    connection.query('UPDATE reservation SET reserveeId='+req.body.reserveeId+', accountId='+req.body.accountId+', type="'+req.body.type+'", status='+req.body.status+', checkInDate="'+req.body.checkInDate+'", checkOutDate="'+req.body.checkOutDate+'", noOfDays='+req.body.noOfDays+', noOfHead='+req.body.noOfHead+', confirmationNo='+req.body.confirmationNo+', reservationFee='+req.body.reservationFee+', updatedAt="'+today+'" WHERE id='+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Unable to update",
                status: 400,
            })
        } else {
            res.json({
                message: "Reservation Updated",
                status: 201,
            })
        }
    });
})

app.get('/reservation/delete/:id', (req,res) => {
    connection.query('DELETE FROM reservation WHERE id='+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Reservation Delete Failed",
                status: 400,
            })
        } else {
            res.json({
                message: "Reservation Successfully Deleted",
                status: 201,
            })
        }
    });
});

/*RESERVE_ROOM TABLE*/

app.get('/room-reserve/:reservationId', (req,res) => {
    connection.query('SELECT * FROM reserve_room WHERE reservationId = '+req.params.reservationId+' ', (err, result) => {
        if(err) {
            res.json({
                message: "Current Date Required"
            });
        } else {
            res.json({
                message: "Room Reservation Retrieved",
                result
            });
        }
    })
});

app.get('/room-reserve/id/:id', (req,res) => {
    connection.query('SELECT * FROM reserve_room WHERE id = '+req.params.id+' ', (err, result) => {
        if(err) {
            res.json({
                message: "Room Reservation Id Required"
            });
        } else {
            res.json({
                message: "Room Reservation Retrieved",
                result
            });
        }
    })
});

app.get('/room-reserve', (req,res) => {
    connection.query('SELECT * FROM reserve_room', (err, result) => {
        if(err) {
            res.json({
                message: "Failed to Retrieve all Reservation"
            });
        } else {
            res.json({
                message: "Reservation Retrieved",
                result
            });
        }
    })
});

app.post('/room-reserve', urlEncodedParser, (req,res) => {
    connection.query('INSERT INTO reserve_room(reservationId, roomType, noOfRoom) VALUES ('+req.body.reservationId+',"'+req.body.roomType+'", '+req.body.noOfRoom+')', (err, result) => {
        if(err){
            res.json({
                message: "Room Reservation Failed",
                status: 400,
            })
        } else {
            res.json({
                message: "Room Reservation Successully Added",
                status: 201,
            })
        }
    });
});

app.post('/room-reserve/:id', urlEncodedParser, (req,res) => {
    connection.query('UPDATE reserve_room SET reservationId='+req.body.reservationId+', roomType="'+req.body.roomType+'", noOfRoom = '+req.body.noOfRoom+' WHERE id='+req.params.id+'', (err, result) => {
        if(err){
            res.json({
                message: "Update Room Reservation Failed",
                status: 400,
            })
            console.log(err);
            console.log(req.params.id)
        } else {
            res.json({
                message: "Room Reservation Updated",
                status: 201,
            })
        }
    });
});

app.get('/room-reserve/delete/:id', (req,res) => {
    connection.query('DELETE FROM reserve_room WHERE id='+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Room Reservation Delete Failed",
                status: 400,
            })
        } else {
            res.json({
                message: "Room Reservation Successfully Deleted",
                status: 201,
            })
        }
    });
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
                result
            });
        }
    })
});

app.post('/checkin', urlEncodedParser, (req, res) => {
    connection.query('INSERT INTO checkin(reservationId, accountId, roomId, checkInDate, checkOutDate, noOfDays, noOfHead) VALUES ('+req.body.reservationId+','+req.body.accountId+','+req.body.roomId+',"'+req.body.checkInDate+'","'+req.body.checkOutDate+'", '+req.body.noOfDays+','+req.body.noOfHead+')', (err, result) => {
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

app.post('/checkin/:id', urlEncodedParser, (req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    connection.query('UPDATE checkin SET reservationId='+req.body.reservationId+', accountId='+req.body.accountId+', roomId='+req.body.roomId+', checkInDate="'+req.body.checkInDate+'", checkOutDate="'+req.body.checkOutDate+'", noOfDays='+req.body.noOfDays+', noOfHead='+req.body.noOfHead+', updatedAt="'+today+'" WHERE id='+req.params.id+' ', (err, result) => {
        if(err){
            res.json({
                message: "Unable to update",
                status: 400,
            })
        } else {
            res.json({
                message: "CheckIn Updated",
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