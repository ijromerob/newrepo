// Needed Resources
const express = require('express');
const router = new express.Router();
const utilities = require('../utilities');
const appointmentController = require('../controllers/appointmentController');
const appValidate = require('../utilities/appointment-validation');
// Route to build the add request
router.get(
  '/add',
  utilities.handleErrors(appointmentController.buildApointmentRequest)
);

// Route to add the new appointment
router.post(
  '/add',
  appValidate.appointmentRules(),
  appValidate.checkAppointment,
  utilities.handleErrors(appointmentController.bookAppointment)
);

module.exports = router;
