// Requirements
const pool = require('../database/');

/************************
 * Book an appointment
 ***********************/

async function addAppointment(appointment_date, account_id) {
  try {
    const sql =
      'INSERT INTO public.appointment (appointment_date, account_id) VALUES ($1, $2) RETURNING *';
    return await pool.query(sql, [appointment_date, account_id]);
  } catch (error) {
    return error.message;
  }
}

module.exports = { addAppointment };
