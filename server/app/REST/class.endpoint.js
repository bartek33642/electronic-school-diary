import pool from '../../db';
const express = require('express');
const app = express();

const classEndpoint = (app) => {

    app.get('/classes', async (req, res) => {
    try {
      const classesQuery = `SELECT
                              s.school_id,
                              s.school_name,
                              s.town,
                              c.class_id,
                              c.class_name
                            FROM
                              gradebook.schools s
                            JOIN
                              gradebook.classes c
                            ON
                              s.school_id = c.school_id;`;

      const { rows } = await pool.query(classesQuery);
      res.send(rows);
    //   console.log("Classes okay");

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



  app.post('/add-class', async(req, res) => {
    const { class_name, school_id } = req.body;

    try{
        const addClass = `INSERT INTO gradebook.classes(class_name, school_id) VALUES ($1, $2)`;
        await pool.query(addClass, [class_name, school_id]);
        console.log("dodano klasę do bazy danych");

        res.status(201).json({ message: 'Klasa dodana pomyślnie.' });
    }catch(error){
        console.error('Błąd dodania klasy:', error);
        res.status(500).json({ error: 'Błąd dodania klasy' });
    }
  })

  app.delete('/classes/:class_id', async (req, res) => {
    const classId = req.params.class_id;
  
    try {
      const deleteCLassQuery = 'DELETE FROM gradebook.classes WHERE class_id = $1';
      await pool.query(deleteClassQuery, [classId]);
  
      console.log('Usunięto klasę z bazy danych');
      res.status(204).end();
    } catch (error) {
      console.error('Błąd usuwania klasy:', error);
      res.status(500).json({ error: 'Błąd usuwania klasy' });
    }
  });
}

export default classEndpoint;