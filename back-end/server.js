require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});


const upload = multer({ storage });

// PostgreSQL Pool Configuration
const pool = new Pool({
  user: process.env.PG_USER || "postgres",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "surf_coaches",
  password: process.env.PG_PASSWORD || "Julian17!",
  port: process.env.PG_PORT || 5432,
});

// Route to handle form submission
app.post("/api/coaches", upload.single("profilePicture"), async (req, res) => {
  console.log("File received:", req.file);
  const {
    firstName,
    lastName,
    city,
    state,
    experience,
    privateLessonRate,
    groupLessonRate,
    profileAbout,
  } = req.body;

  const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;
  console.log("Profile picture path:", profilePicture); // Log the profile picture path

  try {
    const result = await pool.query(
      "INSERT INTO coaches (first_name, last_name, city, experience, privatelessonrate, grouplessonrate, state, profile_picture, profile_about) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        firstName,
        lastName,
        city,
        experience,
        privateLessonRate,
        groupLessonRate,
        state,
        profilePicture,
        profileAbout
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error.message);
    res.status(500).json({ error: "Error inserting data" });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
