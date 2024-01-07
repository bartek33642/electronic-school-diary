import business from '../business/business.container';
import applicationException from '../service/applicationException';
import login from '../middleware/login';
import auth from '../middleware/auth';
import pool from '../../db'; 
const bcrypt = require("bcrypt");

const teacherEndpoint = (app) => {
  app.post('/register-teacher', async (req, res, next) => {
    const { email, password, active, first_name, second_name, specialization, school_id } = req.body;

    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const teacherRegister = await pool.query(`INSERT INTO gradebook.users(email, password, role, active, status, first_name, second_name, school_id) 
      VALUES($1, $2, 3, $3, $4, $5, $6, $7) RETURNING user_id`,
        [email, bcryptPassword, active, 'teacher', first_name, second_name, school_id]);

      const userId = teacherRegister.rows[0].user_id;

      // Dodaj informacje o nauczycielu do tabeli nauczycieli
      const teacherInfo = await pool.query('INSERT INTO gradebook.teachers(user_id, specialization, school_id) VALUES($1, $2, $3)',
        [userId, specialization, school_id]);

      console.log("Dodano nowego nauczyciela do bazy danych:", teacherInfo.rows);

      res.status(201).json({ message: 'Nauczyciel zarejestrowany pomyślnie.', user_id: userId });
    } catch (error) {
      console.error('Błąd rejestracji nauczyciela:', error);
      res.status(500).json({ error: 'Błąd rejestracji nauczyciela' });    
    }
  });

  app.get('/all-teachers', async (req, res) => {
    try {
      const teachersQuery = `SELECT * FROM gradebook.teachers 
                              NATURAL JOIN gradebook.users`;

      const { rows } = await pool.query(teachersQuery);
      res.send(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    } )

    app.get('/all-teachers/:schoolId', async (req, res) => {
      const schoolId = req.params.schoolId;

      try {
          const teachersQuery = `
              SELECT teachers.teacher_id, users.first_name, users.second_name
              FROM gradebook.teachers
              INNER JOIN gradebook.users ON teachers.user_id = users.user_id
              WHERE teachers.school_id = $1;
          `;

          const { rows } = await pool.query(teachersQuery, [schoolId]);
          res.send(rows);
      } catch (error) {
          console.error('Błąd pobierania nauczycieli:', error);
          res.status(500).send('Internal Server Error');
      }
  });


};

export default teacherEndpoint;
