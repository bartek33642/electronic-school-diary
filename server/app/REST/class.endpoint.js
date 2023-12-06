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

  app.get('/classes/:school_id', async (req, res) => {
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
                              s.school_id = c.school_id
                            WHERE school_id = $1`;

      const { rows } = await pool.query(classesQuery, [school_id]);
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


  app.put('/edit-class', async(req, res) => {
    const { class_name, school_id, class_id } = req.body;

    try{
        const updateClass = `UPDATE gradebook.classes SET class_name=$1, school_id=$2 WHERE class_id=$3`;
        await pool.query(updateClass, [class_name, school_id, class_id]);
        console.log("Edytowano klasę w bazie danych");

        res.status(201).json({ message: 'Klasa zedytowana pomyślnie.' });
    }catch(error){
        console.error('Błąd edycji klasy:', error);
        res.status(500).json({ error: 'Błąd edycji klasy' });
    }
  })

  app.delete('/classes/:class_id', async (req, res) => {
    const classId = req.params.class_id;
  
    try {
      const deleteClassQuery = 'DELETE FROM gradebook.classes WHERE class_id = $1';
      await pool.query(deleteClassQuery, [classId]);
  
      console.log('Usunięto klasę z bazy danych');
      res.status(204).end();
    } catch (error) {
      console.error('Błąd usuwania klasy:', error);
      res.status(500).json({ error: 'Błąd usuwania klasy' });
    }
  });

  app.get('/principal-classes/:schoolId', async (req, res) => {
    try {
      const schoolId = req.params.schoolId;
  
      const classQuery = `
      SELECT * FROM gradebook.classes
        WHERE school_id = $1;
      `;
      
  const { rows } = await pool.query(classQuery, [schoolId]);
      if (rows.length > 0) {
        res.send(rows);
      } else {
        res.status(404).send('Class not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


  app.get('/teacher-classes/:schoolId', async (req, res) => {
    try {
      const schoolId = req.params.schoolId;
  
      const classQuery = `
      SELECT * FROM gradebook.classes
        WHERE school_id = $1;
      `;
      
  const { rows } = await pool.query(classQuery, [schoolId]);
      if (rows.length > 0) {
        res.send(rows);
      } else {
        res.status(404).send('Class not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
}

export default classEndpoint;