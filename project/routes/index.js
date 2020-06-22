const express = require('express');
const router = express.Router();
const fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');

router.use(bodyParser.json({ type: 'application/json' }));

var connection = mysql.createConnection({
    host: '101.101.210.110',
    user: 'root',
    password: '1234',
    database: 'db'
});

let code = 0;
let this_storeCode;

// Main Page
router.get('/', (req, res) => {
    connection.query('SELECT * FROM region', function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.render('../views/info.ejs', { rows: rows });
        }
    })
});

router.get('/info', (req, res) => {
    connection.query('SELECT * FROM region', function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(rows);
            res.render('../views/info.ejs', { rows: rows });
        }
    })
});

router.post('/storeCodeSet', (req, res) => {
    let { storeCode, regionCode } = req.body;
    this_storeCode = storeCode;
    this_regionCode = regionCode;
    console.log(this_storeCode);
    console.log(this_regionCode);
    res.send(true);
});

router.get('/payment', (req, res) => {
    console.log(this_storeCode + " " + code)
    res.render('../views/payment.ejs', { regionCode: this_regionCode, storeCode: this_storeCode, code: code });
    code = 0;
});


router.get('/withdraw', (req, res) => {
    res.render('../views/withdraw.ejs', { code: code });
    code = 0;
});

router.get('/storeAdd', (req, res) => {
    res.render('../views/storeAdd.ejs', { code: code });
    code = 0;
});

router.get('/charge', (req, res) => {
    res.render('../views/charge.ejs', { code: code });
    code = 0;
});


router.get('/store', (req, res) => {
    connection.query('SELECT * FROM store', function(err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.render('../views/store.ejs', { rows: rows });
        }
    })
});

router.get('/customerAdd', (req, res) => {
    console.log(code);
    res.render('../views/customerAdd.ejs', { code: code });
    code = 0;
});

//고객 등록(지역과 고객명, 계좌번호를 입력)
router.post('/customerAdd/action', function(req, res) {
    var regionCode = req.body.regionCode;
    var customerName = req.body.customerName;
    var account = 0;

    console.log(req.body);
    connection.query('SELECT * from customer', function(err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            console.log('max is ' + rows.length);
            account = rows.length + 1;
            code = account;
            var sql = 'INSERT INTO customer (regionCode, customerName, account, usedMoney, chargedMoney) VALUES (?, ?, ?, ?, ?)';
            var param = [regionCode, customerName, account, '0', '0'];
            connection.query(sql, param, function(err, rows, fields) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(true);
                }
            });
        }
    });
});
//가맹점 등록(지역과 가맹점명, 전화번호를 입력)
router.post('/storeAdd/action', function(req, res) {
    console.log(req.body);
    var regionCode = req.body.regionCode;
    var storeName = req.body.storeName;
    var storePhone = req.body.storePhone;
    var sql = 'INSERT INTO store (regionCode, storeName, storePhone, revenue) VALUES (?, ?, ?, ?)';
    var param = [regionCode, storeName, storePhone, '0'];
    connection.query('SELECT * from store', function(err, rows, fields) {
        code = rows.length + 1;
        connection.query(sql, param, function(err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log('suc');
                res.send(true);
            }
        });
    });

});
//충전(고객코드와 충전금액을 입력)
router.post('/charge/action', function(req, res) {
    var regionCode = req.body.regionCode;
    var customerCode = req.body.customerCode;
    var chargeCode = 0;
    var price = req.body.price;
    var date = new Date();
    console.log(req.body);

    connection.query('SELECT * from charge', function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            chargeCode = rows.length + 1;
            console.log(chargeCode);
            code = chargeCode;
            var sql = 'INSERT INTO charge (regionCode, customerCode, chargeCode, price, date) VALUES (?, ?, ?, ?, ?)';
            var param = [regionCode, customerCode, chargeCode, price, date];
            connection.query(sql, param, function(err, rows, fields) {
                //사용자에게 돈넣음
                //1.백에서 지역별 discountRate 가져와야함 
                sql = 'select discountRate from region where regionCode = ?';
                param = [regionCode];

                connection.query(sql, param, function(err, rows, fields) {
                    let { discountRate } = rows[0];
                    console.log('discountRate' + discountRate);
                    //2.currentMoney 먼저 불러오고 나서 합쳐줌.
                    sql = 'select chargedMoney from customer where customerCode=?'
                    param = [customerCode];

                    connection.query(sql, param, function(err, rows, fields) {
                        let { chargedMoney } = rows[0];
                        chargedMoney *= 1;
                        price *= 1;
                        discountRate *= 1;
                        chargedMoney = chargedMoney + price + (price * discountRate * 0.01);
                        //3. update
                        console.log(chargedMoney + 'chargedMoney');
                        sql = 'UPDATE customer set chargedMoney=? where customerCode=?';
                        param = [chargedMoney, customerCode];
                        connection.query(sql, param, function(err, rows, fields) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('suc');
                                res.send(true);
                            }
                        });
                    });
                });
            });
        }
    });
});

//출금(가맹점코드와 출금금액을 입력)
router.post('/withdraw/action', function(req, res) {
    console.log(req.body);
    var regionCode = req.body.regionCode;
    var storeCode = req.body.storeCode;
    var withdrawMoney = req.body.withdrawMoney;
    var withdrawCode = 0;
    var date = new Date();

    connection.query('SELECT * from withdraw', function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            withdrawCode = rows.length + withdrawCode + 1;
            console.log(withdrawCode);
            code = withdrawCode;
            var sql = 'INSERT INTO withdraw(regionCode, storeCode, withdrawCode, withdrawMoney, date) VALUES (?, ?, ?, ?, ?)';
            var param = [regionCode, storeCode, withdrawCode, withdrawMoney, date];
            connection.query(sql, param, function(err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {

                    //store에서 돈 뺌
                    //1.백에서 currentMoney 먼저 출금 금액 빼줌
                    sql = 'select revenue from store where storeCode=?';
                    param = [storeCode];
                    connection.query(sql, param, function(err, rows, fields) {
                        if (err) {
                            console.log(err);
                        } else {
                            let { revenue } = rows[0];
                            console.log(revenue);
                            revenue = revenue - withdrawMoney;

                            //2. UPDATE
                            sql = 'UPDATE store set revenue=? where storeCode=?'
                            param = [revenue, storeCode];
                            console.log(revenue);
                            connection.query(sql, param, function(err, rows, fields) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    res.send(true);
                                }
                            });
                        }
                    });
                } //
            });

        }
    });
});

//결제 
router.post('/payment/action', function(req, res) {
    console.log(req.body);
    var regionCode = req.body.regionCode;
    var customerCode = req.body.customerCode;
    var storeCode = req.body.storeCode;
    var paymentCode = 0;
    var price = req.body.price;
    var date = new Date();
    this_storeCode = storeCode;
    connection.query('SELECT * from payment', function(err, rows, fields) {
        paymentCode = rows.length + 10000;
        console.log(paymentCode);
        code = paymentCode;
        var sql = 'INSERT INTO payment (regionCode, customerCode, storeCode, paymentCode, price, date) VALUES (?, ?, ?, ?, ?, ?)';
        var param = [regionCode, customerCode, storeCode, paymentCode, price, date];
        connection.query(sql, param, function(err, rows, fields) {
            if (err) {
                console.log(err);
            } else {

            }
        });
    });

    // 1. 사용자에게서 돈 빼감(백에서 currentMoney 불러와서 먼저 결제금액 빼주고 UPDATE )
    sql = 'select chargedMoney, usedMoney from customer where customerCode=?';
    param = [customerCode];
    connection.query(sql, param, function(err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            console.log(rows[0]);
            let { chargedMoney, usedMoney } = rows[0];
            chargedMoney *= 1;
            usedMoney *= 1;
            price *= 1;
            let currentMoney = chargedMoney - usedMoney;
            if (currentMoney < price) {
                res.send(false);
            }
            usedMoney += price;
            sql = 'UPDATE customer set usedMoney=? where customerCode=?';
            param = [usedMoney, customerCode];
            connection.query(sql, param, function(err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    sql = 'select revenue from store where storeCode=?';
                    param = [storeCode];
                    connection.query(sql, param, function(err, rows, fields) {
                        console.log(rows);
                        let { revenue } = rows[0];
                        console.log(revenue);
                        revenue *= 1;
                        revenue += price;
                        sql = 'UPDATE store set revenue=? where storeCode=?';
                        param = [revenue, storeCode];
                        connection.query(sql, param, function(err, rows, fields) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('suc');
                                res.send(true);
                            }
                        });
                    });
                }
            });
        }
    });
});

module.exports = router;