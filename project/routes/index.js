const express = require('express');
const router = express.Router();
const fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');

router.use(bodyParser.json({ type: 'application/json' }));

var connection = mysql.createConnection({
    host        : '101.101.210.110',
    user        : 'root',
    password    : '1234',
    database    : 'db'
});


// Main Page
router.get('/', (req, res) => {
    connection.query('SELECT * FROM region', function(err, rows, fields){
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.render('../views/info.ejs',{rows : rows});
        }
    })
});

router.get('/info', (req, res) => {
    connection.query('SELECT * FROM region', function(err, rows, fields){
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(rows);
            res.render('../views/info.ejs',{rows : rows});
        }
    })
});

router.get('/charge', (req, res) => {
    res.render('../views/charge.html');
});

router.get('/deposit', (req, res) => {
    res.render('../views/deposit.html');
});

router.get('/withdraw', (req, res) => {
    res.render('../views/withdraw.html');
});

router.get('/storeAdd', (req, res) => {
    res.render('../views/storeAdd.html');
});

router.get('/store', (req, res) => {
    res.render('../views/store.html', {store : {name : "떡볶이", region : "수원", code : "13", number : "0505-3232-2323"}});
});

router.get('/customerAdd', (req, res) => {
    res.render('../views/customerAdd.html');
});


module.exports = router;
