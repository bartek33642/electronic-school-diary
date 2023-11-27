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

          app.get('/marks/:student_id', async (req, res) => {
            const { student_id } = req.params;
        
            try {
                const marksQuery = `
                SELECT * FROM gradebook.grades
                INNER JOIN gradebook.subjects ON grades.subject_id = subjects.subject_id
                WHERE student_id = $1;`;
        
                const { rows } = await pool.query(marksQuery, [student_id]);
                res.send(rows);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });

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

        app.get('/students/:school_id/:class_id', async (req, res) => {
            const { school_id, class_id } = req.params;
        
            try {
                const studentsQuery = `
                    SELECT students.student_id, users.first_name, users.second_name
                    FROM gradebook.students
                    INNER JOIN gradebook.users ON students.user_id = users.user_id
                    WHERE students.class_id = $1;
                `;
        
                const { rows } = await pool.query(studentsQuery, [class_id]);
                res.send(rows);
            } catch (error) {
                console.error('Błąd pobierania uczniów:', error);
                res.status(500).send('Internal Server Error');
            }
        });
        

        app.get('/subjects/:subject_id', async (req, res) => {
            const subjectId = req.params.subject_id;
    
            try {
                const subjectsQuery = `
                    SELECT * FROM gradebook.subjects
                    WHERE subjects.subject_id = $1;
                `;
    
                const { rows } = await pool.query(subjectsQuery, [subjectId]);
                res.send(rows);
            } catch (error) {
                console.error('Błąd pobierania przedmiotów:', error);
                res.status(500).send('Internal Server Error');
            }
        });

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
        

        app.get('/subjects/:class_id', async (req, res) => {
            const classId = req.params.class_id;
            console.log('Requested class ID:', classId);
        
            try {
                const subjectsQuery = `
                    SELECT * FROM gradebook.subjects 
                    NATURAL JOIN gradebook.classes
                    WHERE class_id = $1;
                `;
        
                const { rows } = await pool.query(subjectsQuery, [classId]);
                res.send(rows);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
        
        

        };
export default marksEndpoint;