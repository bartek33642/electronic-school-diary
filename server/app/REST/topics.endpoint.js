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

        app.post('/add-topics', async(req, res) => {
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