import pool from '../../db';
const express = require('express');
const app = express();

const remarksEndpoint = (app) => {
    app.get('/remarks', async (req, res) => {
        try {
          const remarksQuery = `SELECT * FROM gradebook.remarks`;
    
          const { rows } = await pool.query(remarksQuery);
          res.send(rows);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        } )

    app.get('/remarks/:student_id', async (req, res) => {
        try {
            const remarksQuery = `SELECT * FROM gradebook.remarks
                                    INNER JOIN gradebook.teachers ON remarks.teacher_id = teachers.teacher_id
                                    INNER JOIN gradebook.users on teachers.user_id = users.user_id
                                    WHERE student_id = $1
                                    `;
    
            const { rows } = await pool.query(remarksQuery, [req.params.student_id]);
            res.send(rows);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            }
        } )

          app.post("/add-remarks", async (req, res) => {
            const { remark_text, is_possitive, student_id, teacher_id, date } = req.body;

            try{
                const addRemarks = `INSERT INTO gradebook.remarks(remark_text, is_possitive, student_id, teacher_id, date) VALUES ($1, $2, $3, $4, $5)`;
                await pool.query(addRemarks, [remark_text, is_possitive, student_id, teacher_id, date]);
        
                res.status(201).json({ message: 'Uwaga dodana pomyślnie.' });
            }catch(error){
                console.error('Błąd dodania uwagi:', error);
                res.status(500).json({ error: 'Błąd dodania uwagi' });
            }
          })


          app.get('/remarks-all-classes', async (req, res) => {        
            try {
              const remarksQuery = `
                SELECT
                  r.*,
                  sc.*,
                  cl.*,
                  st.*,
                  te.*,
                  us.first_name AS student_first_name,
                  us.second_name AS student_second_name,
                  u.first_name AS teacher_first_name,
                  u.second_name AS teacher_second_name
                FROM gradebook.remarks r
                LEFT JOIN gradebook.students st ON r.student_id = st.student_id
                LEFT JOIN gradebook.schools sc ON st.school_id = sc.school_id
                LEFT JOIN gradebook.classes cl ON st.class_id = cl.class_id
                LEFT JOIN gradebook.teachers te ON r.teacher_id = te.teacher_id
                LEFT JOIN gradebook.users u ON te.user_id = u.user_id
                LEFT JOIN gradebook.users us ON st.user_id = us.user_id
              `;
              const { rows } = await pool.query(remarksQuery);
              res.send(rows);
            } catch (error) {
              console.error(error);
              res.status(500).send('Internal Server Error');
            }
          });
          

          app.get('/remarks-all-classes/:school_id', async (req, res) => {
            const schoolId = req.params.school_id;
        
            try {
                const remarksQuery = `
                SELECT
                r.*,
                       us.first_name AS student_first_name,
                       us.second_name AS student_second_name,
                       u.first_name AS teacher_first_name,
                       u.second_name AS teacher_second_name,
                       cl.class_name
                   FROM gradebook.remarks r
                   LEFT JOIN gradebook.students st ON r.student_id = st.student_id
                   LEFT JOIN gradebook.schools sc ON st.school_id = sc.school_id
                   LEFT JOIN gradebook.classes cl ON st.class_id = cl.class_id
                   LEFT JOIN gradebook.teachers te ON r.teacher_id = te.teacher_id
                   LEFT JOIN gradebook.users u ON te.user_id = u.user_id
                   LEFT JOIN gradebook.users us ON st.user_id = us.user_id
                   WHERE sc.school_id = $1
                `;
                const { rows } = await pool.query(remarksQuery, [schoolId]);
                res.send(rows);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });

          app.get('/remarks-parent/:student_id', async (req, res) => {
            const studentId = req.params.student_id;

            try {
                const remarksQuery = `SELECT * FROM gradebook.remarks
                                        INNER JOIN gradebook.teachers ON remarks.teacher_id = teachers.teacher_id
                                        INNER JOIN gradebook.users on teachers.user_id = users.user_id
                                        WHERE student_id = $1
                                        `;
        
                const { rows } = await pool.query(remarksQuery, [studentId]);
                res.send(rows);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                }
            } )

            app.delete('/remarks/:remark_id', async(req, res) => {
              const remarkId = req.params.remark_id;

              try {
                const remarksQuery = `DELETE FROM gradebook.remarks
                                      WHERE remarks.remark_id = $1`;
                const { rows } = await pool.query(remarksQuery, [remarkId]);
                res.send(rows);
              }
              catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
              }
            })

}
export default remarksEndpoint;