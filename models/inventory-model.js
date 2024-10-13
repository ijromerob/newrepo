const pool = require('../database/');

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query(
    'SELECT * FROM public.classification ORDER BY classification_name'
  );
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error('getclassificationsbyid error ' + error);
  }
}

/*******************************
 * Get the inventory item details based on the inventory id
 *******************************/
async function getDetailByInventoryId(inv_id) {
  try {
    const data = await pool.query(
      `SELECT inv_id, inv_make, inv_model, inv_year,
      inv_description, inv_image, inv_price, inv_miles, inv_color
      FROM public.inventory
      WHERE inv_id = $1;`,
      [inv_id]
    );
    return data.rows;
  } catch (error) {
    console.error('getDetailByInventoryId error ' + error);
  }
}

/***********************************************************
 * Checks for an existing classification within the database
 **********************************************************/
async function checkExistingClassification(classification_name) {
  try {
    const sql = 'SELECT * FROM classification WHERE classification_name = $1';
    const classification = await pool.query(sql, [classification_name]);
    return classification.rowCount;
  } catch (error) {
    return error.message;
  }
}

/******************************************
 * Adds a new classification to the database
 ******************************************/
async function AddClassificationDB(classification_name) {
  try {
    const sql =
      'INSERT INTO public.classification (classification_name) VALUES($1) RETURNING *';
    return await pool.query(sql, [classification_name]);
  } catch (error) {
    return error.message;
  }
}

/**
 * Adds the new car to the inventory
 */
async function addCarInventory(
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
) {
  try {
    const sql =
      'INSERT INTO public.inventory (inv_make,inv_model,inv_year,inv_description,inv_image,inv_thumbnail,inv_price,inv_miles,inv_color,classification_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    return await pool.query(sql, [
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    ]);
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getDetailByInventoryId,
  checkExistingClassification,
  AddClassificationDB,
  addCarInventory,
};
