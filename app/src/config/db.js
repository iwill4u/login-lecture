// ----------------------------------------------------------------------
// DB접속
// ----------------------------------------------------------------------
const { Client } = require('pg');

const db = new Client({
    host: "localhost",
    user: "postgres",
    database: "login-lecture",
    password: "postgres",
    port: 5432,
});

db.connect(err => {
    if(err) {
        console.log("## db connection error..:" + err.stack);
    } else {
        console.log("PosgtreSQL Connected..");
    }
});

// db.query(`SELECT * FROM users`, (err, res) => {
//     if(!err){
//         console.log(res.rows);        
//     } else {
//         console.log(err.message);
//     }
//     db.end;
// })

module.exports = db;
