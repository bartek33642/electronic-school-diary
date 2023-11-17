import business from '../business/business.container';
import applicationException from '../service/applicationException';
import login from '../middleware/login';
import auth from '../middleware/auth';
import pool from '../../db'; 
const bcrypt = require("bcrypt");

const studentEndpoint = (app) => {
  app.post('/register-student', async(req, res, next) => {
    const { email, password, active, first_name, second_name, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id, class_id } = req.body;
    
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    try {
      const studentRegister = await pool.query('INSERT INTO gradebook.users(email, password, role, active, status, first_name, second_name) VALUES($1, $2, 4, $3, $4, $5, $6) RETURNING user_id',
        [email, bcryptPassword, active, 'student', first_name, second_name]);

      const userId = studentRegister.rows[0].user_id;

      // Dodaj informacje o uczniu do tabeli uczniów
      const studentInfo = await pool.query('INSERT INTO gradebook.students(user_id, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id, class_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
        [userId, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id, class_id]);

      console.log("Dodano nowego ucznia do bazy danych:", studentInfo.rows);

      res.status(201).json({ message: 'Uczeń zarejestrowany pomyślnie.', user_id: userId });
    } catch (error) {
      console.error('Błąd rejestracji ucznia:', error);
      res.status(500).json({ error: 'Błąd rejestracji ucznia' });     
    }
  });

  app.get('/classes/:school_id', async (req, res) => {
    const schoolId = req.params.school_id;
  
    try {
      const classesQuery = `
        SELECT schools.school_id, classes.class_name, classes.class_id
        FROM gradebook.schools
        INNER JOIN gradebook.classes ON classes.school_id = schools.school_id
        WHERE classes.school_id = $1;
      `;
  
      const { rows } = await pool.query(classesQuery, [schoolId]);
      res.send(rows);
    } catch (error) {
      console.error('Błąd pobierania klas:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

  
};

export default studentEndpoint;
