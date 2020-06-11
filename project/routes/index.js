const express = require('express');
const router = express.Router();
const fs = require('fs');

// Main Page
router.get('/', (req, res) => {
    res.render('../views/info.html');
});

router.get('/info', (req, res) => {
    res.render('../views/info.html');
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
    res.render('../views/store.html');
});

router.get('/customerAdd', (req, res) => {
    res.render('../views/customerAdd.html');
});


module.exports = router;
