// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');  // Import database connection

const app = express();
const port = process.env.PORT || 5432;

// Middleware to handle JSON requests and CORS
app.use(express.json());
app.use(cors());

// Sample endpoint to get data from PostgreSQL
app.get('/test', async(req, res) => {
    res.json({
      "message" : "Hello world",
    });
})

app.get('/api/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM data');  // Example query to fetch users
    res.json(result.rows);  // Send the result to the frontend
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to add a new user (for example)
app.post('/api/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query('INSERT INTO public.data (name, email) VALUES ($1, $2) RETURNING *', [username, password]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
