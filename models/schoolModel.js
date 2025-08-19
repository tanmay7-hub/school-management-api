const pool = require("../config/db");

const addSchool = async (name, latitude, longitude, address) => {
  const [result] = await pool.query(
    "INSERT INTO schools (name, latitude, longitude, address) VALUES (?, ?, ?, ?)",
    [name, latitude, longitude, address]
  );
  return { id: result.insertId, name, latitude, longitude, address };
};

module.exports = { addSchool };
