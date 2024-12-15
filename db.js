// db.js
require('dotenv').config();  // Load environment variables
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,  // Use the DATABASE_URL environment variable
  ssl: {
    rejectUnauthorized: false,  // This may be needed for Heroku/PostgreSQL SSL connections
  }
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;
