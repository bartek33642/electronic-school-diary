import business from '../business/business.container';
import applicationException from '../service/applicationException';
import login from '../middleware/login';
import auth from '../middleware/auth';
import pool from '../../db'; // Upewnij się, że importujesz obiekt `pool` z odpowiedniego pliku

const principalEndpoint = (router) => {
  router.post('/REST/register-principal', async(req, res, next) => {
    const { email, password, active, first_name, second_name, school_id } = req.body;

    try {
      const principalRegister = await pool.query('INSERT INTO gradebook.users(email, password, role, active, status, first_name, second_name, school_id) VALUES($1, $2, 2, $3, $4, $5, $6, $7) RETURNING user_id',
        [email, password, active, 'principal', first_name, second_name, school_id]);

      const userId = principalRegister.rows[0].user_id;

      // Dodaj informacje o dyrektorze do tabeli dyrektorów
      const principalInfo = await pool.query('INSERT INTO gradebook.principal(user_id, school_id) VALUES($1, $2)',
        [userId, school_id]);

      console.log("Dodano nowego dyrektora do bazy danych:", principalInfo.rows);

      res.status(201).json({ message: 'Dyrektor zarejestrowany pomyślnie.', user_id: userId });
    } catch (error) {
      res.status(500).json({ error: 'Błąd rejestracji dyrektora' });
    }
  });
};

export default principalEndpoint;
