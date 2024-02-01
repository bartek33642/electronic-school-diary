import pool from '../../db';
const express = require('express');
const app = express();

const timetableEndpoint = (app) => {
    app.get('/timetable', async (req, res) => {
        try {
          const timetableQuery = `SELECT * FROM gradebook.timetable`;
    
          const { rows } = await pool.query(timetableQuery);
          res.send(rows);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        } )

        app.get('/timetable/:school_id', async (req, res) => {
            const { school_id } = req.params;
            try {
              const timetableQuery = `SELECT * FROM gradebook.timetable tb
              INNER JOIN gradebook.classes cl ON cl.class_id = tb.class_id
              INNER JOIN gradebook.schools sc ON sc.school_id = cl.school_id
              WHERE sc.school_id = $1;
              `;
        
              const { rows } = await pool.query(timetableQuery, [school_id]);
              res.send(rows);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
              }
            } )

            app.get('/timetable/:school_id/:class_id', async (req, res) => {
              const { school_id, class_id } = req.params; 
              try {
                  const timetableQuery = `
                      SELECT * FROM gradebook.timetable tb
                      INNER JOIN gradebook.classes cl ON cl.class_id = tb.class_id
                      INNER JOIN gradebook.schools sc ON sc.school_id = cl.school_id
                      INNER JOIN gradebook.subjects sb ON tb.subject_id = sb.subject_id
                      WHERE sc.school_id = $1 AND tb.class_id = $2;
                  `;
          
                  const { rows } = await pool.query(timetableQuery, [school_id, class_id]);
                  res.send(rows);
              } catch (error) {
                  console.error(error);
                  res.status(500).send('Internal Server Error');
              }
          });

          app.get('/teacher-timetable/:school_id/:teacher_id', async (req, res) => {
            const { school_id, teacher_id } = req.params;
            try {
                const timetableQuery = `
                    SELECT * FROM gradebook.timetable tb
                    INNER JOIN gradebook.classes cl ON cl.class_id = tb.class_id
                    INNER JOIN gradebook.schools sc ON sc.school_id = cl.school_id
                    INNER JOIN gradebook.subjects sb ON tb.subject_id = sb.subject_id
                    INNER JOIN gradebook.teachers te ON tb.teacher_id = te.teacher_id
                    WHERE sc.school_id = $1 AND te.teacher_id = $2;
                `;
        
                const { rows } = await pool.query(timetableQuery, [school_id, teacher_id]);
                res.send(rows);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });          

            app.post('/add-timetable', async (req, res) => {
            const { day_of_week, start_time, end_time, classroom, is_substitution, is_canceled, is_recurring, class_id, subject_id, teacher_id, lesson_number, end_recurring_date } = req.body;
            try {
                const addTimetableQuery = `INSERT INTO gradebook.timetable(day_of_week, start_time, end_time, classroom, is_substitution, is_canceled, is_recurring, class_id, subject_id, teacher_id, lesson_number, end_recurring_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
                await pool.query(addTimetableQuery, [day_of_week, start_time, end_time, classroom, is_substitution, is_canceled, is_recurring, class_id, subject_id, teacher_id, lesson_number, end_recurring_date]);

                res.status(201).json({ message: 'Zajęcie do planu lekcji dodany pomyślnie.' });

            }
            catch (error) {
                console.error('Błąd dodania tmatu:', error);
                res.status(500).send('Internal Server Error');
            }
            })

            app.put('/timetable-all-classes/:school_id/:class_id', async (req, res) => {
              const { school_id, class_id } = req.params;
              const { day_of_week, start_time, end_time, classroom, is_substitution, is_canceled, is_recurring, subject_id, teacher_id, lesson_number, end_recurring_date } = req.body;
              try {
                  const updateTimetableQuery = `UPDATE gradebook.timetable 
                                                SET day_of_week = $1, start_time = $2, end_time = $3, classroom = $4, 
                                                    is_substitution = $5, is_canceled = $6, is_recurring = $7, 
                                                    subject_id = $8, teacher_id = $9, lesson_number = $10, 
                                                    end_recurring_date = $11 
                                                WHERE school_id = $12 AND class_id = $13 `;
                  await pool.query(updateTimetableQuery, [day_of_week, start_time, end_time, classroom, is_substitution, is_canceled, is_recurring, subject_id, teacher_id, lesson_number, end_recurring_date, school_id, class_id]);
 
                  res.status(200).send('Timetable updated successfully');
              } catch (error) {
                  console.error("Error updating timetable:", error);
                  res.status(500).send('Error updating timetable: ' + error.message);
              }
          });

}

export default timetableEndpoint;