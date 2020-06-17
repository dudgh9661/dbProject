var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

app.use(bodyParser.json({ type: 'application/json' }));

var connection = mysql.createConnection({
    host        : '101.101.210.110',
    user        : 'root',
    password    : '1234',
    database    : 'db'
});
//지역별 정보
app.post('/info', function(req, res){
    var regionName = req.body.regionName;
    var monthLimit = req.body.monthLimit;
    var discountRate = req.body.discountRate;

    connection.query('SELECT * FROM region', function(err, rows, fields){
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            for(var i=0; i<rows.length; i++) {
                console.log('regionName : ' + rows[i].regionName + 'monthLimit : ' + rows[i].monthLimit + 'discountRate : ' + rows[i].discountRate);
                res.send('regionName : ' + rows[i].regionName + 'monthLimit : ' + rows[i].monthLimit + 'discountRate : ' + rows[i].discountRate);
            }
        }
    })
});

//고객 등록(지역과 고객명, 계좌번호를 입력)
app.post('/customerAdd', function(req, res){
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
//가맹점 등록(지역과 가맹점명, 전화번호를 입력)
app.post('/storeAdd', function(req, res){
    var regionCode = req.body.regionCode;
    var storeCode = req.body.storeCode;
    var storeName = req.body.storeName;
    var storePhone = req.body.storePhone;

    connection.query('SELECT max(storeCode) from store', function(err, rows, fields){
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('max is ' + rows[0]);
            storeCode = rows[0]+1;
        }
    });

    var sql = 'INSERT INTO store (regionCode, storeCode, storeName, storePhone) VALUES (?, ?, ?, ?)';
    var param = [regionCode, storeCode, storeName, storePhone];
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
//충전(고객코드와 충전금액을 입력)
app.post('/deposit', function(req, res){
    var regionCode = req.body.regionCode;
    var customerCode = req.body.customerCode;
    var chargeCode = req.body.chargeCode;
    var price = req.body.price;
    var date = new Date();

    connection.query('SELECT max(chargeCode) from charge', function(err, rows, fields){
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            console.log('max is ' + rows[0]);
            chargeCode = rows[0]+1;
        }
    });

    var sql = 'INSERT INTO store (regionCode, customerCode, chargeCode, price, date) VALUES (?, ?, ?, ?, ?)';
    var param = [regionCode, customerCode, chargeCode, price, date];
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
//출금(가맹점코드와 출금금액을 입력)
app.post('/withdraw', function(req, res){

});