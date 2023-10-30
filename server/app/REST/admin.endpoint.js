import business from '../business/business.container';
import applicationException from '../service/applicationException';
import login from '../middleware/login';
import auth from '../middleware/auth';
import pool from '../../db';

const adminEndpoint = (router) => {
    router.post('/REST/register-admin', async(req, res, next) => {
        const {email, password, role, active, first_name, second_name } = req.body;
    
        try{
          const adminRegister = await pool.query('INSERT INTO gradebook.users(email, password, role, active, status, first_name, second_name) VALUES($1, $2, 1, $3, $4, $5, $6) ', [email, password, role, active, 'admin', first_name, second_name]);
    
          console.log("Dodano nowego admina do bazy danych:", adminRegister.rows); 
    
          res.status(201).json({ message: 'Admin zarejestrowany pomyślnie.', user_id: newUser.user_id });
        }catch (error) {
          res.status(500).json({ error: 'Błąd rejestracji' });
        }
      })
    };
    
export default adminEndpoint;