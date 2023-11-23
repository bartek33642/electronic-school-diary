import pool from '../../db';
const express = require('express');
const app = express();

const topicsEndpoint = (app) => {
    app.get('/topics', async (req, res) => {
        try {
          const topicsQuery = `SELECT * FROM gradebook.topics`;
    
          const { rows } = await pool.query(topicsQuery);
          res.send(rows);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        } )


        app.get('/topics-all', async (req, res) => {
          try {
            const topicsQuery = `SELECT * FROM gradebook.topics
                                  NATURAL JOIN gradebook.schools
                                  NATURAL JOIN gradebook.teachers
                                  NATURAL JOIN gradebook.classes
                                  NATURAL JOIN gradebook.subjects
                                  NATURAL JOIN gradebook.users
                                  `;
      
            const { rows } = await pool.query(topicsQuery);
            res.send(rows);
          }
          catch (error) {
              console.error(error);
              res.status(500).send('Internal Server Error');
            }
          } )

          app.get('/topics-all-student/:classId', async (req, res) => {
            try {
              // const userId = req.params.userId;
              const classId = req.params.classId;
          
              const topicsQuery = `
                SELECT * FROM gradebook.topics
                NATURAL JOIN gradebook.schools
                NATURAL JOIN gradebook.teachers
                NATURAL JOIN gradebook.classes
                NATURAL JOIN gradebook.subjects
                NATURAL JOIN gradebook.users
                WHERE class_id = $1;
              `;
          
              const { rows } = await pool.query(topicsQuery, [classId]);
              res.send(rows);
            } catch (error) {
              console.error(error);
              res.status(500).send('Internal Server Error');
            }
          });
        

        app.post('/add-topics', async(req, res) => {
            const { teacher_id, class_id, topic_text, description, date, subject_id } = req.body;
        
            try{
                const addMarks = `INSERT INTO gradebook.topics(teacher_id, class_id, topic_text, description, date, subject_id) VALUES ($1, $2, $3, $4, $5, $6)`;
                await pool.query(addMarks, [teacher_id, class_id, topic_text, description, date, subject_id]);
                console.log("Dodano temat do bazy danych");
      
                res.status(201).json({ message: 'Temat dodany pomyślnie.' });
            }catch(error){
                console.error('Błąd dodania tematu:', error);
                res.status(500).json({ error: 'Błąd dodania tematu' });
            }
          })


          app.get('/topics/:tacher_id', async (req, res) => {
            try {
              const topicsTeacherQuery = `SELECT t.topic_id, t.teacher_id, t.class_id, t.topic_text, t.description, t.date, t.subject_id,
                                  te.teacher_id
                                    FROM gradebook.topics t
                                  NATURAL JOIN gradebook.teachers te
                                  WHERE te.teacher_id = $1`;
        
              const { rows } = await pool.query(topicsTeacherQuery);
              res.send(rows);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
              }
            } )
    
            app.post('/add-topics/:teacher_id', async(req, res) => {
                const { teacher_id, class_id, topic_text, description, date, subject_id } = req.body;
            
                try{
                    const addMarks = `INSERT INTO gradebook.topics(teacher_id, class_id, topic_text, description, date, subject_id) VALUES ($1, $2, $3, $4, $5, $6)`;
                    await pool.query(addMarks, [teacher_id, class_id, topic_text, description, date, subject_id]);
                    console.log("Dodano temat do bazy danych");
          
                    res.status(201).json({ message: 'Temat dodany pomyślnie.' });
                }catch(error){
                    console.error('Błąd dodania tmatu:', error);
                    res.status(500).json({ error: 'Błąd dodania tematu' });
                }
              })


        };
export default topicsEndpoint;