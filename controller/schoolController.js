const School = require("../models/schoolModel");
const pool = require("../config/db");
// POST /addSchool
module.exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    // Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ message: "Invalid or missing 'name'" });
    }
    if (!address || typeof address !== "string" || address.trim() === "") {
      return res.status(400).json({ message: "Invalid or missing 'address'" });
    }
    if (latitude === undefined || isNaN(latitude)) {
      return res.status(400).json({ message: "Invalid or missing 'latitude'" });
    }
    if (longitude === undefined || isNaN(longitude)) {
      return res.status(400).json({ message: "Invalid or missing 'longitude'" });
    }

    const newSchool = await School.addSchool(name, latitude, longitude, address);
    res.status(201).json({
      success: true,
      message: "School added successfully",
      data: newSchool
    });
  } catch (error) {
    console.error("❌ Error adding school:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || isNaN(latitude) || !longitude || isNaN(longitude)) {
      return res.status(400).json({ message: "Invalid or missing latitude/longitude" });
    }

    const [schools] = await pool.query(
      `
      SELECT 
        id, name, address, latitude, longitude,
        (6371 * ACOS(
            COS(RADIANS(?)) * COS(RADIANS(latitude)) *
            COS(RADIANS(longitude) - RADIANS(?)) +
            SIN(RADIANS(?)) * SIN(RADIANS(latitude))
         )) AS distance
       FROM schools
       ORDER BY distance ASC
      `,
      [latitude, longitude, latitude]
    );

    res.status(200).json({
      success: true,
      count: schools.length,
      schools
    });
  } catch (error) {
    console.error("❌ Error fetching schools:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



