const mysql = require('mysql');
const {pin} = require("nodemon/lib/version");

/**
 *
 * validations
 */

function validatePhone(inputtxt) {
    var phoneno = /^\d{10}$/;
    console.log(inputtxt.length);

    if(inputtxt.length==13 && inputtxt.substring(0,3)=="+91"){
        inputtxt = inputtxt.substring(3, inputtxt.length);
    }

    else if(inputtxt.length==11 && inputtxt.substring(0,1)=="0"){
        inputtxt = inputtxt.substring(1, inputtxt.length);
    }


    if (inputtxt.match(phoneno)) {

        return true;
    } else {
        return false;
    }
}



function validateName(inputtext){
    var name= /^[a-zA-Z ]*$/;
    if(inputtext.match(name)){
       return true;
    }
    else{
        return false;
    }

}

function validatePinCode(inputText){
    var pinNo = /^[0-9]{6}$/;
    if(inputText.match(pinNo)){

    }
    else{

        return false;
    }

}





/**
 *
 * validations
 */



const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "ankit",
    password:"password",
    database: "digisole"
});




//fetch all data

exports.view = (req, res)=>{

    pool.getConnection((err, con)=>{
        if(err) throw err;
        console.log('connected as Id '+ con.threadId);

        // user connection
        var q = "SELECT *FROM user"
        con.query(q,(err,rows)=>{

            con.release();
            if(err){
                throw err;
            }
            res.render('home', {rows});

            console.log("the data from user table: \n ", rows)

        })
    });

};

//search using name city phone zipcode

exports.find = (req, res)=>{

    pool.getConnection((err, con)=>{
     console.log('Connected as ID '+ con.threadId);
     let searchTerm = req.body.search;


     console.log(searchTerm);

        con.query('SELECT * FROM user where name LIKE ? OR city LIKE ? OR phone_no LIKE ? OR zip_code LIKE ? ',
            ["%"+searchTerm+"%", "%"+searchTerm+"%",  "%"+searchTerm+"%",  "%"+searchTerm+"%"],(err,rows)=>{

            con.release();
            if(err){
                throw err;
            }
            res.render('home', {rows});

            console.log("the data from user tale: \n ", rows)

        })


    });

}

// go to user page

exports.form = (req, res)=>{
    res.render('addUser');
}


//create /add user
exports.create = (req, res)=>{

    var errorResponse = "";
    var bool = true;
    var zipCodeFound = false;
    const {id, name, street, city, zip_code, phone_no} = req.body;
    var datetime = new Date();

    // validations
     if(validateName(name)==false){
        errorResponse += "please enter a valid name\n";
        bool = false;
    }
     if(validatePinCode(zip_code)==false){
        errorResponse += "please enter a valid pin code\n";
        bool = false;
    }
     if(validatePhone(phone_no)==false){
        errorResponse += "please enter a valid phone number \n";
        bool = false;
    }



    if(bool) {

        pool.getConnection((err, con) => {
            console.log('Connected as ID ' + con.threadId);


            con.query('INSERT INTO user SET id=?, name=?, street= ?, city= ?, zip_code = ?,phone_no = ?, created_at =?, updated_at=?' +
                '', [id, name, street, city, zip_code, phone_no, datetime, datetime], (err, rows) => {
                con.release();
                if (!err) {
                    res.render('addUser', {alert: 'User added successfully.'});
                } else {
                    console.log(err);
                }
                console.log('The data from user table: \n', rows);
            })
        });

    }
    else{
        res.render('addUser', {alert: errorResponse});
    }
}

//edit user

exports.edit = (req, res)=> {

    pool.getConnection((err, con)=>{
        if(err) throw err;
        console.log('connected as Id '+ con.threadId);


        con.query('SELECT * FROM user WHERE id=?',[req.params.id],(err,rows)=>{

            con.release();
            if(err){
                throw err;
            }
            res.render('editUser', {rows});

            console.log("the data from user table: \n ", rows)

        })
    });

}


//update user

exports.update = (req, res)=> {


    var errorResponse = "";
    var bool = true;

    const { name, street, city, zip_code, phone_no} = req.body;
    var datetime = new Date();

    // validations
    if(validateName(name)==false){
        errorResponse += "please enter a valid name\n";
        bool = false;
    }
    if(validatePinCode(zip_code)==false){
        errorResponse += "please enter a valid pin code\n";
        bool = false;
    }
    if(validatePhone(phone_no)==false){
        errorResponse += "please enter a valid phone number \n";
        bool=false;
    }


    if(bool) {

        pool.getConnection((err, con) => {
            if (err) throw err;
            console.log('connected as Id ' + con.threadId);


            con.query('UPDATE user SET updated_at = ?, name= ?, street = ?, city = ?, zip_code = ?, phone_no = ? WHERE id = ?', [datetime, name, street, city, zip_code, phone_no, req.params.id], (err, rows) => {

                con.release();
                if (err) {
                    throw err;
                } else {
                    pool.getConnection((err, con) => {
                        if (err) throw err;
                        console.log('connected as Id ' + con.threadId);


                        con.query('SELECT * FROM user WHERE id=?', [req.params.id], (err, rows) => {

                            con.release();
                            if (err) {
                                throw err;
                            }
                            res.render('editUser', {rows, alert: `${name} has been updated`});

                            console.log("the data from user table: \n ", rows)

                        })
                    });
                }
            })
        });
    }
    else{
        res.render('editUser', { alert: `${errorResponse} `});
    }

}



// Delete User
exports.delete = (req, res) => {

    pool.getConnection((err, connection) => {
      if(err) throw err; // not connected!
      console.log('Connected as ID ' + connection.threadId);

      // User the connection
      connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
          res.redirect('/');
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);

      });
    });

}


// View Users
exports.viewall = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        // User the connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('view-user', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows);
        });
    });
}

