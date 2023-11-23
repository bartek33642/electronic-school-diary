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
          const attendanceQuery = `SELECT * FROM gradebook.attendance
                                  NATURAL JOIN gradebook.schools
                                  NATURAL JOIN gradebook.classes
                                  NATURAL JOIN gradebook.users
                                  NATURAL JOIN gradebook.students`;
          const { rows } = await pool.query(attendanceQuery);
          res.send(rows);
    
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

      app.get('/attendance-all/:student_id', async (req, res) => {
        try {
          const attendanceQuery = `
            SELECT * FROM gradebook.attendance
            NATURAL JOIN gradebook.schools
            NATURAL JOIN gradebook.classes
            NATURAL JOIN gradebook.users
            NATURAL JOIN gradebook.students
            WHERE student_id = $1;`;
      
          const { rows } = await pool.query(attendanceQuery);
          console.log("Rows from attendance query:", rows);
          res.send(rows);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

      app.post('/add-attendance', async(req, res) => {
        const { date, status, student_id, teacher_id} = req.body;
    
        try{
            const addAtenndance = `INSERT INTO gradebook.attendance(date, status, student_id, teacher_id) VALUES ($1, $2, $3, $4)`;
            await pool.query(addAtenndance, [ date, status, student_id, teacher_id]);
            console.log("Dodano frekwencję do bazy danych");
    
            res.status(201).json({ message: 'frekwencja dodany pomyślnie.' });
        }catch(error){
            console.error('Błąd dodania frekwencji:', error);
            res.status(500).json({ error: 'Błąd dodania frekwencji' });
        }
      })
    
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