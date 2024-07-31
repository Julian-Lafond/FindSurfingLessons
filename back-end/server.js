require('dotenv').config(); // Load environment variables. Store sensitive information
const express = require('express'); //imports Express framework. Provides routing features
const cors = require('cors'); //Imports CORS middleware. Allows requests from different pages
const { Pool } = require('pg'); //Allows you to execute queries to integrate with PostgreSQL databases

const app = express();  //Creates an instance of the express application. Used to define routes, middleware etc
const PORT = process.env.PORT || 5000;    //Holds port number

// Middleware
app.use(cors());  //Lets server accept requests from different websites
app.use(express.json());  //Makes it easier for your server to read and use JSON data sent from clients

// PostgreSQL Pool Configuration
const pool = new Pool({
    user: process.env.PG_USER || 'postgres', // Use environment variable or default
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || 'surf_coaches',
    password: process.env.PG_PASSWORD || 'Julian17!',
    port: process.env.PG_PORT || 5432,
});

// Route to handle form submission
app.post('/api/coaches', async (req, res) => {      //When someone sends a POST request (to submit data) to the URL '/apis/coaches', the code inside the function will run.
    const { firstName, lastName } = req.body;     //gets the first and last name from the request body 
    
    // Log input for debugging
    console.log('Received input:', { firstName, lastName });

    try {
        const result = await pool.query(      //Sends a command to database to insert a new coach to the coaches table
            'INSERT INTO coaches (first_name, last_name) VALUES ($1, $2) RETURNING *',    //SQL command to add new row. $1 and $2 are replaced by the actual values. 
            [firstName, lastName]
        );

        console.log('Inserted row:', result.rows[0]);            // Log the inserted row

        res.status(201).json(result.rows[0]);   //Sends a response back to the client saying the coach was added successfully
      
    } catch (error) {
        console.error('Error inserting data:', error.message); // More detailed error logging
        res.status(500).json({ error: 'Error inserting data' });
    }
});


// Route to retrieve all coaches
/** 
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

**/
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
