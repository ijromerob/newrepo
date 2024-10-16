// Requirements
const regValidate = require('../utilities/account-validation');
// Needed Resources
const express = require('express');
const router = new express.Router();
const utilities = require('../utilities');
const accountController = require('../controllers/accountController');

// login route
router.get('/login', utilities.handleErrors(accountController.buildLogin));
// registration route
router.get(
  '/register',
  utilities.handleErrors(accountController.registerIndividual) //build login
);

// Default account view
router.get(
  '/',
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildDefaultAccount)
);

// registration route - a client entering information
router.post(
  '/register',
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt
router.post(
  '/login',
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

module.exports = router;
