const invModel = require('../models/inventory-model');
const utilities = require('../utilities/');

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render('./inventory/classification', {
    title: className + ' vehicles',
    nav,
    grid,
  });
};

/**
 * Build specific inventory item by item ID
 */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inventoryId;
  const data = await invModel.getDetailByInventoryId(inv_id);
  const grid = await utilities.buildItemDetailGrid(data);
  let nav = await utilities.getNav();

  res.render('./inventory/detail', {
    title: data[0].inv_make + ' ' + data[0].inv_model + ' ' + data[0].inv_year,
    nav,
    grid,
  });
};

invCont.buildInventoryManager = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render('./inventory/management', {
    title: 'Inventory Management',
    nav,
    errors: null,
  });
};

module.exports = invCont;
