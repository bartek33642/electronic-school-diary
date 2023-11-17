import business from '../business/business.container';
import applicationException from '../service/applicationException';
import login from '../middleware/login';
import auth from '../middleware/auth';
import pool from '../../db'; 
const bcrypt = require("bcrypt");


const principalEndpoint = (app) => {
  app.post('/register-principal', async (req, res, next) => {
    const { email, password, active, first_name, second_name, school_id } = req.body;

    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash(password, salt);
      
      const principalRegister = await pool.query(`
      INSERT INTO gradebook.users(email, password, role, active, status, first_name, second_name)
      SELECT $1, $2, 2, $3, $4, $5, $6
      RETURNING user_id`, 
      [email, bcryptPassword, active, 'principal', first_name, second_name]);
    
      const userId = principalRegister.rows[0].user_id;

      const principalInfo = await pool.query('INSERT INTO gradebook.principal(user_id, school_id) VALUES($1, $2)',
        [userId, school_id]);

      console.log("Dodano nowego dyrektora do bazy danych:", principalInfo.rows);

      res.status(201).json({ message: 'Dyrektor zarejestrowany pomyślnie.', user_id: userId });
    } catch (error) {
      console.error('Błąd rejestracji dyrektora:', error);
      res.status(500).json({ error: 'Błąd rejestracji dyrektora' });
    }
  });
};


export default principalEndpoint;
