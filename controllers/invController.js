// Requirements
const invModel = require('../models/inventory-model');
const utilities = require('../utilities/');
const clasValidate = require('../utilities/classification-validation');

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

/**
 * Builds the inventory manager view
 */

invCont.buildInventoryManager = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render('./inventory/management', {
    title: 'Inventory Management',
    nav,
    errors: null,
  });
};

/**
 * Builds the add classification view
 */

invCont.buildClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render('./inventory/add-classification', {
    title: 'Add Classification',
    nav,
    errors: null,
  });
};

/**
 * adds the classification to the database and renders the inventory Management
 */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body;
  let nav;
  const classificationAddResult = await invModel.AddClassificationDB(
    classification_name
  );

  if (classificationAddResult) {
    nav = await utilities.getNav();
    req.flash(
      'notice',
      `You have successfully added ${classification_name} to the server!`
    );
    res.status(201).render('inventory/management', {
      title: 'Inventory Management',
      nav,
      errors: null,
    });
  } else {
    nav = await utilities.getNav();
    req.flash('notice', "Sorry the classification wasn't added to the server");
    res.status(501).render('inventory/add-classification', {
      title: 'Add Classification',
      nav,
      errors: null,
    });
  }
};
/**
 * Builds the add inventory view
 */
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav();
  let selection = await utilities.getClassificationOptions();
  res.render('./inventory/add-inventory', {
    title: 'Add To The Inventory',
    nav,
    selection,
    errors: null,
  });
};

/**
 * Adds the car to the inventory
 */
invCont.addInventory = async function (req, res) {
  let nav = await utilities.getNav();
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  } = req.body;

  const addInvResult = await invModel.addCarInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  );

  if (addInvResult) {
    req.flash(
      'notice',
      `The ${inv_make} ${inv_model} ${inv_year} has been added to the inventory`
    );
    res.status(201).render('inventory/management', {
      title: 'Inventory Management',
      nav,
      errors: null,
    });
  } else {
    let selection = await utilities.getClassificationOptions(classification_id);
    req.flash('notice', "Sorry the car wasn't added to the inventory");
    res.status(501).render('inventory/add-inventory', {
      title: 'Add Inventory',
      nav,
      selection,
      errors: null,
    });
  }
};
module.exports = invCont;
