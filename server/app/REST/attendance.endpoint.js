import pool from '../../db';
const express = require('express');
const app = express();

const attendanceEnpoint = (app) => {

    app.get('/attendance', async (req, res) => {
        try {
          const attendanceQuery = 'SELECT * FROM gradebook.attendance';
          const { rows } = await pool.query(attendanceQuery);
          res.send(rows);
    
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });
    
      app.get('/attendance-all', async (req, res) => {
        try {
          const attendanceQuery = `SELECT * FROM gradebook.attendance at
                                    INNER JOIN gradebook.classes cl ON at.class_id = cl.class_id
                                    INNER JOIN gradebook.schools sc ON cl.school_id = sc.school_id
                                    INNER JOIN gradebook.students st ON at.student_id = st.student_id
                                    INNER JOIN gradebook.users us ON st.user_id = us.user_id
                                    INNER JOIN gradebook.timetable tb ON at.timetable_id = tb.timetable_id`;
          const { rows } = await pool.query(attendanceQuery);
          res.send(rows);
    
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

      app.get('/attendance-all/:student_id', async (req, res) => {
        const { student_id } = req.params;
        try {
          const attendanceQuery = `
          SELECT at.*, tb.lesson_number FROM gradebook.attendance at
          INNER JOIN gradebook.classes cl ON at.class_id = cl.class_id
          INNER JOIN gradebook.schools sc ON cl.school_id = sc.school_id
          INNER JOIN gradebook.students st ON at.student_id = st.student_id
          INNER JOIN gradebook.users us ON st.user_id = us.user_id
          INNER JOIN gradebook.timetable tb ON at.timetable_id = tb.timetable_id
          WHERE at.student_id = $1;`;
      
          const { rows } = await pool.query(attendanceQuery, [student_id]);
          console.log("Rows from attendance query:", rows);
          res.send(rows);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

      app.post('/add-attendance', async (req, res) => {
        const { date, status, student_id, teacher_id, class_id, timetable_id } = req.body;
    
        // Dodaj warunek sprawdzający, czy student_id nie jest null
        if (student_id === null || student_id === undefined) {
            return res.status(400).json({ error: 'Nieprawidłowy identyfikator studenta.' });
        }
    
        try {
            const addAttendance = `
                INSERT INTO gradebook.attendance(date, status, student_id, teacher_id, class_id, timetable_id)
                VALUES ($1, $2, $3, $4, $5, $6)
            `;
            await pool.query(addAttendance, [date, status, student_id, teacher_id, class_id, timetable_id]);
            console.log("Dodano frekwencję do bazy danych");
    
            res.status(201).json({ message: 'Frekwencja dodana pomyślnie.' });
        } catch (error) {
            console.error('Błąd dodania frekwencji:', error);
            res.status(500).json({ error: 'Błąd dodania frekwencji', details: error.detail || error.message });
        }
    });
    
    
      app.delete('/attendance/:attendance_id', async (req, res) => {
        const attendanceId = req.params.attendance_id;
      
        try {
          const deleteAttendanceQuery = 'DELETE FROM gradebook.attendance WHERE attendance_id = $1';
          await pool.query(deleteAttendanceQuery, [attendanceId]);
      
          console.log('Usunięto frekwencję z bazy danych');
          res.status(204).end();
        } catch (error) {
          console.error('Błąd usuwania frekwencji:', error);
          res.status(500).json({ error: 'Błąd usuwania frekwencji' });
        }
      });

}
export default attendanceEnpoint;