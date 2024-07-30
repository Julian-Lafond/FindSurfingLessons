require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Configuration
const pool = new Pool({
    user: process.env.PG_USER || 'postgres', // Use environment variable or default
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || 'surf_coaches',
    password: process.env.PG_PASSWORD || 'Julian17!',
    port: process.env.PG_PORT || 5432,
});

// Route to handle form submission
app.post('/api/coaches', async (req, res) => {
    const { firstName, lastName } = req.body;
    
    // Log input for debugging
    console.log('Received input:', { firstName, lastName });

    try {
        const result = await pool.query(
            'INSERT INTO coaches (first_name, last_name) VALUES ($1, $2) RETURNING *',
            [firstName, lastName]
        );

        // Log the inserted row
        console.log('Inserted row:', result.rows[0]);

        // Send successful response
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting data:', error.message); // More detailed error logging
        res.status(500).json({ error: 'Error inserting data' });
    }
});

// Route to retrieve all coaches
app.get('/api/coaches', async (req, res) => {
    try {
        const result = await pool.query('SELECT first_name, last_name FROM coaches');

        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ message: 'No coaches found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
