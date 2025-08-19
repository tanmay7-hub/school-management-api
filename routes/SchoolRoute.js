const express = require("express");
const { addSchool,listSchools } = require("../controller/schoolController");


const router = express.Router();

// Add school
router.post("/addSchool",addSchool );

// List schools by proximity
router.get("/listSchools", listSchools);

module.exports = router;
