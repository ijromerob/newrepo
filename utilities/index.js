const invModel = require('../models/inventory-model');
const Util = {};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += '<li>';
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        ' ' +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        ' ' +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += '<hr />';
      grid += '<h2>';
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        ' ' +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        ' ' +
        vehicle.inv_model +
        '</a>';
      grid += '</h2>';
      grid +=
        '<span>$' +
        new Intl.NumberFormat('en-US').format(vehicle.inv_price) +
        '</span>';
      grid += '</div>';
      grid += '</li>';
    });
    grid += '</ul>';
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = '<ul>';
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += '<li>';
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      '</a>';
    list += '</li>';
  });
  list += '</ul>';
  return list;
};

Util.getClassificationOptions = async function (classification_id = null) {
  let data = await invModel.getClassifications();
  let list =
    '<select name="classification_id" id="classification_id" required>';
  list += "<option value=''>Choose a Classification</option>";
  data.rows.forEach((row) => {
    list += '<option value="' + row.classification_id + '"';
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      list += ' selected ';
    }
    list += '>' + row.classification_name + '</option>';
  });
  list += '</select>';
  return list;
};

/**
 *Constructs the template grid for the details of the car
 */
Util.buildItemDetailGrid = async function (data) {
  let grid = '';
  if (data.length > 0) {
    grid += `<h3 class="detail-price">$${new Intl.NumberFormat('en-US').format(
      Number(data[0].inv_price)
    )}</h3>
            <div class="details">
              <img class="car-image" src="${data[0].inv_image}" alt="image of ${
      data[0].inv_make
    } ${data.inv_model} on CSE Motors" />
              <div class="car-info">
                <p>Make: ${data[0].inv_make}</p>
                <p>Model: ${data[0].inv_model}</p>
                <p>Year: ${data[0].inv_year}</p>
                <p>Miles: ${new Intl.NumberFormat('en-US').format(
                  data[0].inv_miles
                )}</p>
                <p>Color: ${data[0].inv_color}</p>
                <p class="description">${data[0].inv_description}</p>
              </div>
            </div>`;
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
