// Requirements
const utilities = require('.');
const { body, validationResult } = require('express-validator');

const validate = {};

/***************************************
 * Classification Data validation Rules
 **************************************/

validate.inventoryRules = () => {
  return [
    body('classification_id').notEmpty().isInt().isLength({ min: 1 }),
    body('inv_make')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Please provide a valid make'),
    body('inv_model')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Please provide a valid model'),
    body('inv_year').trim().escape().notEmpty().isInt().isLength({ min: 4 }),
    body('inv_description')
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Please provide a valid description'),
    body('inv_image')
      .notEmpty()
      .custom((classification_name) => {
        if (/\s/.test(classification_name)) {
          throw new Error('Classification does not allow for spaces');
        }
        return true;
      })
      .isLength({ min: 1 })
      .matches(/^\/images\/vehicles\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif)$/)
      .withMessage('Please provide a valid image path'),
    body('inv_thumbnail')
      .notEmpty()
      .custom((classification_name) => {
        if (/\s/.test(classification_name)) {
          throw new Error('Classification does not allow for spaces');
        }
        return true;
      })
      .isLength({ min: 1 })
      .matches(/^\/images\/vehicles\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif)$/)
      .withMessage('Please provide a valid image path'),
    body('inv_price')
      .notEmpty()
      .isFloat()
      .isLength({ min: 1 })
      .withMessage('Please provide a valid price'),
    body('inv_miles')
      .notEmpty()
      .isInt()
      .isLength({ min: 1 })
      .withMessage('Please provide a valid milage'),
    body('inv_color')
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage('Please provide a valid color'),
  ];
};

/****************************************************************
 * Check data and return errors or continue to add the car to the inventory
 ****************************************************************/

validate.checkInvenData = async (req, res, next) => {
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
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let selection = await utilities.getClassificationOptions(classification_id);
    res.render('inventory/add-inventory', {
      errors,
      title: 'Add Inventory',
      nav,
      selection,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
    return;
  }
  next();
};

module.exports = validate;