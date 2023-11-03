import business from '../business/business.container';
import applicationException from '../service/applicationException';
import login from '../middleware/login';
import auth from '../middleware/auth';
import pool from '../../db'; // Upewnij się, że importujesz obiekt `pool` z odpowiedniego pliku

const parentEndpoint = (router) => {
  router.post('/register-parent', async(req, res, next) => {
    const { email, password, active, first_name, second_name, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id } = req.body;

    try {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const parentRegister = await pool.query('INSERT INTO gradebook.users(email, password, role, active, status, first_name, second_name) VALUES($1, $2, 5, $3, $4, $5, $6)  RETURNING user_id',
        [email, bcryptPassword, active, 'parent', first_name, second_name]);

      const userId = parentRegister.rows[0].user_id;

      // Dodaj informacje o rodzicu do tabeli rodziców
      const parentInfo = await pool.query('INSERT INTO gradebook.parents(user_id, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [userId, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id]);

      console.log("Dodano nowego rodzica do bazy danych:", parentInfo.rows);

      res.status(201).json({ message: 'Rodzic zarejestrowany pomyślnie.' });
    } catch (error) {
      res.status(500).json({ error: 'Błąd rejestracji rodzica' });
    }
  });
};

export default parentEndpoint;
