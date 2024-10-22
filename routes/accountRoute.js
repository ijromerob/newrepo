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

/**
 * This route builds the edit view
 */
router.get(
  '/edit',
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountEdit)
);

/**
 * This route posts the changes in the account information (but not the password)
 */
router.post(
  '/edit',
  regValidate.infoRules(),
  regValidate.checkInfo,
  utilities.handleErrors(utilities.checkEmailUpdate),
  utilities.handleErrors(accountController.editInfo)
);

/**
 * This route post changes uniquely to the password
 */
router.post(
  '/editpw',
  regValidate.passwordRules(),
  regValidate.checkPassword,
  utilities.handleErrors(accountController.editPassword)
);

router.get('/logout', utilities.handleErrors(accountController.logout));

module.exports = router;
