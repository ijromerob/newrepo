const appointmentModel = require('../models/appoiontment-model');
const utilities = require('../utilities/');

const appCont = {};

appCont.buildApointmentRequest = async function (req, res, next) {
  let nav = await utilities.getNav();
  const welcomeAccount = await utilities.checkLoginWelcomeAccount(res);
  res.render('./appointment/add', {
    title: 'Request An Appointment!',
    welcomeAccount,
    nav,
    errors: null,
  });
};

appCont.bookAppointment = async function (req, res) {
  const { appointment_date, account_id } = req.body;
  let nav = await utilities.getNav();
  const welcomeAccount = await utilities.checkLoginWelcomeAccount(res);
  const inventoryManagement = utilities.renderAdmisnistrativeClient(
    res,
    utilities.buildInventoryManagement,
    () => {}
  );
  const appointmentResult = await appointmentModel.addAppointment(
    appointment_date,
    account_id
  );
  if (appointmentResult) {
    req.flash(
      'notice',
      `You have requested an appointment on ${appointment_date}`
    );
    res.status(201).render('account/default', {
      title: 'Account Management',
      welcomeAccount,
      inventoryManagement,
      nav,
      errors: null,
    });
  } else {
    req.flash('notice', 'Sorry we were unable to book an appointment for you');
    res.status(501).render('appointment/add', {
      title: 'Book An Appointment!',
      welcomeAccount,
      nav,
      errors: null,
    });
  }
};

module.exports = appCont;
