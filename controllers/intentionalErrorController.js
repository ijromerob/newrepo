const utilities = require('../utilities/');

const errorCont = {};

errorCont.faultyFunction = async function (req, res, next) {
  res.render('index', {
    nav,
  });
};

module.export = errorCont;
