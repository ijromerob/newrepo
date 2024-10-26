// Requirements
const utilities = require('.');
const { body, validationResult } = require('express-validator');

const validate = {};

validate.appointmentRules = () => {
  return [
    body('appointment_date')
      .notEmpty()
      .isDate({ format: 'YYYY-MM-DD' })
      .custom((value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight to only compare dates

        if (selectedDate < today) {
          throw new Error('The date cannot be in the past');
        }
        return true;
      })
      .withMessage('Please enter a valid date'),
  ];
};

validate.checkAppointment = async (req, res, next) => {
  const { appointment_date } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    const welcomeAccount = await utilities.checkLoginWelcomeAccount(res);
    let nav = await utilities.getNav();
    res.render('appointment/add', {
      title: 'Book An Appointment!',
      welcomeAccount,
      nav,
      errors,
      appointment_date,
    });
    return;
  }
  next();
};

module.exports = validate;
