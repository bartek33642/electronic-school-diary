import business from '../business/business.container';
import applicationException from '../service/applicationException';
import login from '../middleware/login';
import auth from '../middleware/auth';
import pool from '../../db'; // Upewnij się, że importujesz obiekt `pool` z odpowiedniego pliku

const studentEndpoint = (router) => {
  router.post('/REST/register-student', async(req, res, next) => {
    const { email, password, active, first_name, second_name, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id } = req.body;

    try {
      const studentRegister = await pool.query('INSERT INTO gradebook.users(email, password, role, active, status, first_name, second_name) VALUES($1, $2, 4, $3, $4, $5, $6, $7) RETURNING user_id',
        [email, password, active, 'student', first_name, second_name]);

      const userId = studentRegister.rows[0].user_id;

      // Dodaj informacje o uczniu do tabeli uczniów
      const studentInfo = await pool.query('INSERT INTO gradebook.students(user_id, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [userId, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id]);

      console.log("Dodano nowego ucznia do bazy danych:", studentInfo.rows);

      res.status(201).json({ message: 'Uczeń zarejestrowany pomyślnie.', user_id: userId });
    } catch (error) {
      res.status(500).json({ error: 'Błąd rejestracji ucznia' });
    }
  });
};

export default studentEndpoint;
