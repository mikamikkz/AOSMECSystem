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
const cors = require('cors');
var isEmpty = require('is-empty');

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(flash());
app.use(bodyParser.json());
app.use(cors());

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
app.get("/bill-details/:id/:ip", (req, res) => {
    connection.query("SELECT billId, serviceId, quantity, total, status FROM `bill_detail` WHERE billId='"+req.params.id+"' AND serviceId='"+req.params.ip+"' ", (err, result) => {
        // console.log(result);
        res.json({
            message: "Bill Details Update1",
            status: 200,
            result
        })
    });
});
app.post("/bill-details/:id/:ip", urlEncodedParser, (req, res) => {
    connection.query("UPDATE `bill_detail` SET `quantity`='+req.body.quantity+',`total`='+req.body.total+',`status`='"+req.body.status+"' WHERE billId='"+req.params.id+"' AND serviceId='"+req.params.ip+"' ", (err, result) => {
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

app.get('/reservation', urlEncodedParser, (req,res) => {
    connection.query('SELECT R.id, R.accountId, R.type, R.status, R.checkInDate, R.checkOutDate, R.noOfHead, R.noOfDays, R.confirmationNo, R.reservationFee, R.createdAt, E.name, E.gender, E.country, E.email, E.phoneNo FROM reservation R JOIN reservee E ON R.reserveeId = E.id ORDER BY checkInDate', function(err, result){
        if(err) {
            console.log(err);
            res.json({
                message: "Failed to Retrieve all Reservation"
            });
        } else {
            connection.query('SELECT O.reservationId, O.roomType, O.noOfRoom FROM reservation R JOIN reserve_room O ON R.id = O.reservationId', (err, room) => {
                var data = [];
                for(var i = 0; i < room.length; i++){
                    for(var j = 0; j < result.length; j++){
                        if(room[i].reservationId == result[j].id){
                            var temp = {
                                roomDetails: [],
                                reserve: []
                            }
                            var check = false;
                            if(isEmpty(data)){
                                temp.roomDetails.push(room[i])
                                temp.reserve = result[j]
                                data.push(temp);
                            } else {
                                for(var k = 0; k < data.length; k++){
                                    if(room[i].reservationId == data[k].reserve.id){
                                        data[k].roomDetails.push(room[i]);
                                        check = true;
                                        break
                                    }
                                }
                                if(check == false) {
                                    temp.roomDetails.push(room[i])
                                    temp.reserve = result[j]
                                    data.push(temp);
                                }
                                check = false;
                            }
                        };
                    }
                }
                res.json({
                    message: "Reservation Retrieved",
                    data
                });
            })
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

app.get('/checkin/id/:id', (req,res) => {
    connection.query('SELECT * FROM checkIn WHERE id = '+req.params.id+'', (err, result) => {
        if(err) {
            res.json({
                message: "Check in ID Required"
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
//retrieve
app.get("/room-mgmt/all", (req, res) => {
    connection.query('SELECT * FROM room_type', (err, result) => {
        res.json({
            result,
            message: "Rooms info was retrieved.",
            status: 100,            
        })
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
app.get("/service-mgmt", (req, res) => {
    connection.query('SELECT * FROM service', (err, result) => {
        res.json({
            result,
            message: "Services were retrieved.",
            status: 200,            
        })
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
            result,
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