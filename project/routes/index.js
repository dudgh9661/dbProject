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


let this_storeCode;

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

router.post('/storeCodeSet', (req, res) => {
    let {storeCode} = req.body;
    this_storeCode = storeCode;
    console.log(this_storeCode)
    res.send(true);
});

router.get('/payment', (req, res) => {
    console.log(this_storeCode)
    res.render('../views/payment.ejs', {storeCode : this_storeCode});
});

router.post('/payment/action', (req, res) => {
    var storeCode = this_storeCode;
    var customerCode = req.body.customerCode;
    var price = req.body.price;
    console.log(req.body);
    //성공시 send true 실패시 send false
});

router.get('/withdraw', (req, res) => {
    res.render('../views/withdraw.ejs');
});

router.post('/withdraw/action', (req, res) => {
    var storeCode = this_storeCode;
    var price = req.body.price;
    console.log(req.body);
    //성공시 send true 실패시 send false
});

router.get('/storeAdd', (req, res) => {
    res.render('../views/storeAdd.ejs');
});

router.post('/storeAdd/action', (req, res) => {
    var regionCode = req.body.regionCode;
    var storeName = req.body.storeName;
    var storePhone = req.body.storePhone;
    console.log(req.body);
    //성공시 send true 실패시 send false
});

router.get('/charge', (req, res) => {
    res.render('../views/charge.ejs');
});

router.post('/charge/action', (req, res) => {
    var regionCode = req.body.regionCode;
    var customerCode = req.body.customerName;
    var price = req.body.price;
    console.log(req.body);
        //성공시 send true 실패시 send false
});

router.get('/store', (req, res) => {
    connection.query('SELECT * FROM store', function(err, rows, fields){
        if(err) {
            res.send(err);
        } else {
            res.render('../views/store.ejs',{rows : rows});
        }
    })
});

router.get('/customerAdd', (req, res) => {
    res.render('../views/customerAdd.ejs',{add : false});
});

//고객 등록(지역과 고객명, 계좌번호를 입력)
router.post('/customerAdd/action', function(req, res){
    var regionCode = req.body.regionCode;
    var customerCode = req.body.customerCode;
    var account = req.body.account;
    console.log(req.body);
    //성공시 send true 실패시 send false
    // var sql = 'INSERT INTO customer (regionCode, customerName, account) VALUES (?, ?, ?)';
    // var param = [regionCode, customerCode, account];
    // connection.query(sql, param, function(err, rows, fields) {
    //     if(err) {
    //         console.log(err);
    //         res.send(err);
    //     } else {
    //         console.log('Success');
    //         res.render('../views/customerAdd.ejs',{add : true});
    //     }
    // })
});

module.exports = router;
