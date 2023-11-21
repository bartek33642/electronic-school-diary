import pool from '../../db';
const express = require('express');
const app = express();

const subjectEndpoint = (app) => {

    app.get('/subjects', async (req, res) => {
    try {
      const subjectsQuery = 'SELECT * FROM gradebook.subjects';
      const { rows } = await pool.query(subjectsQuery);
      res.send(rows);

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/subjects-all', async (req, res) => {
    try {
      const subjectsQuery = `SELECT * FROM gradebook.subjects 
                              NATURAL JOIN gradebook.schools
                              NATURAL JOIN gradebook.classes`;
      const { rows } = await pool.query(subjectsQuery);
      res.send(rows);

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });



//   app.get('/subjects/:school_id/:class_id/:student_id', async (req, res) => {
//     try {
//         const { school_id, class_id, student_id } = req.params;

//         // Przykładowe zapytanie SQL, dostosuj je do swojej bazy danych
//         const subjectsQuery1 = `
//             SELECT s.subject_id, s.subject_name, s.class_id, s.school_id
//             FROM gradebook.subjects s
//             WHERE s.school_id = $1 AND s.class_id = $2
//         `;
        
//         const { rows } = await pool.query(subjectsQuery1, [school_id, class_id, student_id]);
//         res.send(rows);

//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

  app.post('/add-subjects', async(req, res) => {
    const { subject_name, school_id, class_id} = req.body;

    try{
        const addSubjects = `INSERT INTO gradebook.subjects(subject_name, school_id, class_id) VALUES ($1, $2, $3)`;
        await pool.query(addSubjects, [ subject_name, school_id, class_id]);
        console.log("Dodano przedmiot do bazy danych");

        res.status(201).json({ message: 'Przedmiot dodany pomyślnie.' });
    }catch(error){
        console.error('Błąd dodania tmatu:', error);
        res.status(500).json({ error: 'Błąd dodania przedmiotu' });
    }
  })

  app.delete('/subject/:subject_id', async (req, res) => {
    const subjectId = req.params.subject_id;
  
    try {
      const deleteSubjectQuery = 'DELETE FROM gradebook.subjects WHERE subject_id = $1';
      await pool.query(deleteSubjectQuery, [subjectId]);
  
      console.log('Usunięto przedmiot z bazy danych');
      res.status(204).end();
    } catch (error) {
      console.error('Błąd usuwania przedmiotu:', error);
      res.status(500).json({ error: 'Błąd usuwania przedmiotu' });
    }
  });

}

export default subjectEndpoint;
