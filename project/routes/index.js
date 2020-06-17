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

<<<<<<< HEAD

=======
>>>>>>> 03348d36e67231a65ac2d100ca46a32eaf5cf582

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
    res.render('../views/charge.ejs');
});

router.get('/deposit', (req, res) => {
    res.render('../views/deposit.ejs');
});

router.get('/withdraw', (req, res) => {
    res.render('../views/withdraw.ejs');
});

router.get('/storeAdd', (req, res) => {
    res.render('../views/storeAdd.ejs');
});

router.get('/store', (req, res) => {
    res.render('../views/store.ejs', {store : {name : "떡볶이", region : "수원", code : "13", number : "0505-3232-2323"}});
});

router.get('/customerAdd', (req, res) => {
    res.render('../views/customerAdd.ejs');
});

//고객 등록(지역과 고객명, 계좌번호를 입력)
router.post('/customerAdd', function(req, res){
    var regionCode = req.body.regionCode;
    var customerCode = req.body.customerCode;
    var account = req.body.account;

    var sql = 'INSERT INTO customer (regionCode, customerCode, account) VALUES (?, ?, ?)';
    var param = [regionCode, customerCode, account];
    connection.query(sql, param, function(err, rows, fields) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('Success');
            res.send('Success');
        }
    })
});

module.exports = router;
