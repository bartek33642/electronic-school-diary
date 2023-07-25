const { Pool } = require('pg'); 

// Konfiguracja połączenia z bazą danych PostgreSQL
const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',
    database: 'postgres', 
    password: '1234', 
    port: 5432, 
  });

  module.exports = pool;