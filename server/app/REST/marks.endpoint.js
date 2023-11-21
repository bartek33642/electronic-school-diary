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

          app.get('/marks/:student_id/:subject_id', async (req, res) => {
            const { student_id, subject_id } = req.params;
        
            try {
                const marksQuery = `
                    SELECT *
                    FROM gradebook.grades
                    WHERE student_id = $1 AND subject_id = $2; `;
        
                const { rows } = await pool.query(marksQuery, [student_id, subject_id]);
                res.send(rows);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
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
                console.error('Błąd pobierania uczniów:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    
        // Pobierz listę nauczycieli w danej szkole
        app.get('/teachers/:school_id', async (req, res) => {
            const schoolId = req.params.school_id;
    
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

        app.get('/subjects/:school_id', async (req, res) => {
          const schoolId = req.params.school_id;

          try {
            const subjectsQuery = `SELECT * FROM gradebook.subjects 
                                    NATURAL JOIN gradebook.schools
                                    WHERE school_id=$1`;
            const { rows } = await pool.query(subjectsQuery, [schoolId]);
            res.send(rows);
      
          } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        });

        };
export default marksEndpoint;