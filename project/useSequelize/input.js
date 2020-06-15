const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("/Users/kim_yeongho/Desktop/DeFold/20-1학기/데이터베이스/데이터/결제.csv");
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
        csvData.push(data);
    })
    .on("end", function() {
        // remove the first line: header
        csvData.shift();

        // create a new connection to the database
        const connection = mysql.createConnection({
            host: "101.101.210.110",
            user: "root",
            password: "1234",
            database: "db"
        });

        // open the connection
        connection.connect(error => {
            if (error) {
                console.error(error);
            } else {
                let query =
                    "INSERT INTO payment (regionCode, customerCode, storeCode, paymentCode, price, date) VALUES ?";
                connection.query(query, [csvData], (error, response) => {
                    console.log(error || response);
                });
            }
        });
    });

stream.pipe(csvStream);