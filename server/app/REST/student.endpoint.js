import pool from '../../db'; 
const bcrypt = require("bcrypt");

const studentEndpoint = (app) => {
  app.post('/register-student', async(req, res, next) => {
    const { email, password, active, first_name, second_name, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id, class_id } = req.body;
    
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    try {
      const studentRegister = await pool.query('INSERT INTO gradebook.users(email, password, role, active, status, first_name, second_name, school_id) VALUES($1, $2, 4, $3, $4, $5, $6, $7) RETURNING user_id',
        [email, bcryptPassword, active, 'student', first_name, second_name, school_id]);

      const userId = studentRegister.rows[0].user_id;

      const studentInfo = await pool.query('INSERT INTO gradebook.students(user_id, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id, class_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
        [userId, pesel, street, building_number, apartment_number, zip_code, town, phone_number, school_id, class_id]);


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
  
  app.get('/all-students', async (req, res) => {
    try {
      const studentsQuery = `SELECT * FROM gradebook.students 
                              NATURAL JOIN gradebook.users`;

      const { rows } = await pool.query(studentsQuery);
      res.send(rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    } )


app.get('/student-parent/:student_id', async (req, res) => {
  const studentId = req.params.student_id;

  try {
    const studentParentQuery = `
      SELECT st.user_id AS student_user_id, st.class_id, st.school_id
      FROM gradebook.students st
      WHERE student_id = $1;
    `;

    const { rows } = await pool.query(studentParentQuery, [studentId]);
    res.send(rows);
  } catch (error) {
    console.error('Błąd pobierania studenta:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/students-from-class/:class_id', async (req, res) => {
  const classId = req.params.class_id;
  try {
    const studentsQuery = `SELECT st.student_id, st.class_id, st.user_id, st.school_id, us.first_name, us.second_name FROM gradebook.students st
                            INNER JOIN gradebook.users us ON st.user_id = us.user_id
                            WHERE class_id = $1`;

    const { rows } = await pool.query(studentsQuery, [classId]);
    res.send(rows);
  }
  catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  } )

};
export default studentEndpoint;
