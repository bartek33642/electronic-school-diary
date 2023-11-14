const { Pool } = require('pg'); 
require('dotenv').config();

// Konfiguracja połączenia z bazą danych PostgreSQL
const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',
    database: 'postgres', 
    password: process.env.SECRET_PASSWORD, 
    port: 5432, 
  });

  module.exports = pool;