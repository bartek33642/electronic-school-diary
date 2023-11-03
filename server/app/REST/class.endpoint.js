import pool from '../../db';
const express = require('express');
const app = express();

const classEndpoint = (app) => {

    app.get('/classes', async (req, res) => {
    try {
      const classesQuery = 'SELECT class_name, school_id FROM gradebook.classes';
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
        const addClass = await pool.query(`INSERT INTO gradebook.classes(class_name, school_id) VALUES ($1, $2)`, 
        [class_name, school_id]);
        console.log("dodano klasę do bazy danych");

        res.status(201).json({ message: 'Klasa dodana pomyślnie.' });
    }catch(error){
        console.error('Błąd dodania klasy:', error);
        res.status(500).json({ error: 'Błąd dodania klasy' });
    }
  })
}

export default classEndpoint;