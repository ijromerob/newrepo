// Needed Resources
const express = require('express');
const router = new express.Router();
const utilities = require('../utilities');
const accountController = require('../controllers/accountController');

// login route
router.get('/login', utilities.handleErrors(accountController.buildLogin));

router.get(
  '/register',
  utilities.handleErrors(accountController.registerIndividual)
);

module.exports = router;
