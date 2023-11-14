import pool from '../../db';
const express = require('express');
const app = express();

const marksEndpoint = (app) => {
    app.get('/marks', async (req, res) => {
        try {
          const marksQuery = `SELECT * FROM gradebook.grades`;
    
          const { rows } = await pool.query(marksQuery);
          res.send(rows);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        } )

        app.post('/add-marks', async(req, res) => {
            const { student_id, subject_id, grade_value, weight, description, teacher_id, date } = req.body;
        
            try{
                const addMarks = `INSERT INTO gradebook.grades(student_id, subject_id, weight, description, grade_value, teacher_id, date) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
                await pool.query(addMarks, [student_id, subject_id, weight, description, grade_value, teacher_id, date]);
                console.log("dodano oceny do bazy danych");
      
                res.status(201).json({ message: 'Ocena dodana pomyślnie.' });
            }catch(error){
                console.error('Błąd dodania oceny:', error);
                res.status(500).json({ error: 'Błąd dodania oceny' });
            }
          })

        };
export default marksEndpoint;