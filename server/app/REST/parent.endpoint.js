import pool from '../../db'; 
const bcrypt = require("bcrypt");

const parentEndpoint = (app) => {
  app.post('/register-parent', async(req, res, next) => {
    const { email, password, active, first_name, second_name, student_id, street, building_number, apartment_number, zip_code, town, phone_number, school_id } = req.body;

    try {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const parentRegister = await pool.query('INSERT INTO gradebook.users(email, password, role, active, status, first_name, second_name, school_id) VALUES($1, $2, 5, $3, $4, $5, $6, $7)  RETURNING user_id',
        [email, bcryptPassword, active, 'parent', first_name, second_name, school_id]);

      const userId = parentRegister.rows[0].user_id;

      const parentInfo = await pool.query('INSERT INTO gradebook.parents(user_id, student_id, street, building_number, apartment_number, zip_code, town, phone_number, school_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [userId, student_id, street, building_number, apartment_number, zip_code, town, phone_number, school_id]);

      res.status(201).json({ message: 'Rodzic zarejestrowany pomyślnie.', user_id: userId });
    } catch (error) {
      console.error('Błąd rejestracji rodzica:', error);
      res.status(500).json({ error: 'Błąd rejestracji rodzica' });
    }
  });

app.get('/students/:school_id', async (req, res) => {
  const schoolId = req.params.school_id;

  try {
    const studentsQuery = `
      SELECT students.student_id, users.first_name, users.second_name
      FROM gradebook.students
      INNER JOIN gradebook.users ON students.user_id = users.user_id
      WHERE students.school_id = $1;
    `;

    const { rows } = await pool.query(studentsQuery, [schoolId]);
    res.send(rows);
  } catch (error) {
    console.error('Błąd pobierania studentów:', error);
    res.status(500).send('Internal Server Error');
  }
});



};

export default parentEndpoint;
