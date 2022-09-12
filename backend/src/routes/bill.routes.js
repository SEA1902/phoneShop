const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.controller');

router.post('/create-bill', billController.create);

module.exports = router;