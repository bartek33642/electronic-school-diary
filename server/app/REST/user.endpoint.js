import pool from "../../db";
const express = require('express');
const app = express();

const userEndpoint = (app) => {

  app.get('/users', async (req, res) => {
    try {
      const userQuery = 'SELECT user_id, email, password, role, active, status, first_name, second_name FROM gradebook.users';
      const { rows } = await pool.query(userQuery);
      res.send(rows);
      // console.log("Users okay");

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

//   app.get('/users-school-student/:email', async (req, res) => {
//     try {
//       const userEmail = req.params.email;

//       const userQuery = `
//         SELECT 
//           u.user_id, u.role, u.active, u.status, u.first_name, u.second_name, u.email, 
//           s.student_id, s.class_id, s.school_id,
//           p.parent_id, p.student_id,
//           t.teacher_id, t.school_id,
//           pr.principal_id, pr.school_id,
//           sc.school_id, sc.school_name,
//           cl.class_id, cl.class_name
//         FROM gradebook.users u
//         LEFT JOIN gradebook.students s ON u.user_id = s.user_id
//         LEFT JOIN gradebook.parents p ON u.user_id = p.user_id
//         LEFT JOIN gradebook.schools sc ON s.school_id = sc.school_id
//         LEFT JOIN gradebook.principal pr ON u.user_id = pr.user_id
//         LEFT JOIN gradebook.teachers t ON u.user_id = t.user_id
//         LEFT JOIN gradebook.classes cl ON sc.school_id = cl.school_id
//         WHERE u.email = $1
//       `;
      
//       const { rows } = await pool.query(userQuery, [userEmail]);
//       if (rows.length > 0) {
//         res.send(rows);
//       } else {
//           res.status(404).send('User not found'); // Użytkownik nie został znaleziony
//         }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });
  
// app.get('/users-school-student/:email', async (req, res) => {
//   try {
//     const userEmail = req.params.email;

//     const userQuery = `
//       SELECT 
//         u.user_id, u.role, u.active, u.status, u.first_name, u.second_name, u.email, 
//         s.student_id, s.class_id, s.school_id,
//         p.parent_id, p.student_id,
//         t.teacher_id, t.school_id,
//         pr.principal_id, pr.school_id,
//         sc.school_id, sc.school_name,
//         cl.class_id, cl.class_name
//       FROM gradebook.users u
//       LEFT JOIN gradebook.students s ON u.user_id = s.user_id
//       LEFT JOIN gradebook.parents p ON u.user_id = p.user_id
//       LEFT JOIN gradebook.schools sc ON s.school_id = sc.school_id
//       LEFT JOIN gradebook.principal pr ON u.user_id = pr.user_id
//       LEFT JOIN gradebook.teachers t ON u.user_id = t.user_id
//       LEFT JOIN gradebook.classes cl ON sc.school_id = cl.school_id
//       WHERE u.email = $1
//     `;

//     const { rows } = await pool.query(userQuery, [userEmail]);
//     if (rows.length > 0) {
//       res.send(rows[0]);  // Zwróć cały obiekt użytkownika, który zawiera user_id
//     } else {
//       res.status(404).send('User not found'); // Użytkownik nie został znaleziony
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

//   app.get('/users-count', async (req, res) => {
//     try {
//       const usercountQuery = 'SELECT COUNT(*) FROM gradebook.users';
//       const { rows } = await pool.query(usercountQuery);
//       const userCount = parseInt(rows[0].count);
//       res.send({ userCount });

//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });

app.get('/users-school-student/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;

    const userQuery = `
      SELECT 
        u.user_id, u.role, u.active, u.status, u.first_name, u.second_name, u.email, u.school_id,
        s.student_id, s.class_id, s.school_id,
        p.parent_id, p.student_id,
        t.teacher_id, t.school_id,
        pr.principal_id, pr.school_id,
        sc.school_id, sc.school_name
      FROM gradebook.users u
      LEFT JOIN gradebook.students s ON u.user_id = s.user_id
      LEFT JOIN gradebook.parents p ON u.user_id = p.user_id
      LEFT JOIN gradebook.schools sc ON s.school_id = sc.school_id
      LEFT JOIN gradebook.principal pr ON u.user_id = pr.user_id
      LEFT JOIN gradebook.teachers t ON u.user_id = t.user_id
      WHERE u.email = $1
    `;
    
    const { rows } = await pool.query(userQuery, [userEmail]);
    if (rows.length > 0) {
      res.send(rows);
    } else {
        res.status(404).send('User not found'); // Użytkownik nie został znaleziony
      }
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
});


app.get('/users-count', async (req, res) => {
  try {
    const usercountQuery = 'SELECT COUNT(*) FROM gradebook.users';
    const { rows } = await pool.query(usercountQuery);
    const userCount = parseInt(rows[0].count);
    res.send({ userCount });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const userQuery = `
      SELECT 
        u.user_id, u.role, u.active, u.status, u.first_name, u.second_name, u.email,
        s.student_id, s.class_id, s.school_id, s.phone_number, s.street, s.building_number, s.apartment_number, s.zip_code, s.town, 
        p.student_id, p.phone_number, p.street, p.building_number, p.apartment_number, p.zip_code, p.town
      FROM gradebook.users u
      LEFT JOIN gradebook.students s ON u.user_id = s.user_id
      LEFT JOIN gradebook.parents p ON u.user_id = p.user_id
      WHERE u.user_id = $1
    `;
    
    const { rows } = await pool.query(userQuery, [userId]);
    if (rows.length > 0) {
      res.send(rows);
    } else {
        res.status(404).send('User not found'); // Użytkownik nie został znaleziony
      }
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
});

  // app.delete('/users/:user_id', async (req, res) => {
  //   const userId = req.params.user_id;
  
  //   try {
  //     const userRoleQuery = 'SELECT role FROM gradebook.users WHERE user_id = $1';
  //     const { rows } = await pool.query(userRoleQuery, [userId]);
  //     const userRole = rows[0].role;
  
  //     let deleteQueries = 'DELETE FROM gradebook.users WHERE user_id = $1';
  //     // switch (userRole) {
  //     //   case 1: // Admin
  //     //     deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
  //     //     break;
  //     //   case 2: // Dyrektor
  //     //     deleteQueries.push('DELETE FROM gradebook.principal WHERE user_id = $1');
  //     //     deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
  //     //     break;
  //     //   case 3: // Nauczyciel
  //     //     deleteQueries.push('DELETE FROM gradebook.teachers WHERE user_id = $1');
  //     //     deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
  //     //     break;
  //     //   case 4: // Uczeń
  //     //     deleteQueries.push('DELETE FROM gradebook.students WHERE user_id = $1');
  //     //     deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
  //     //     break;
  //     //   case 5: // Rodzic
  //     //     deleteQueries.push('DELETE FROM gradebook.parents WHERE user_id = $1');
  //     //     deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
  //     //     break;
  //     //   default:
  //     //     deleteQueries.push('DELETE FROM gradebook.users WHERE user_id = $1');
  //     // }
  
  //     for (const query of deleteQueries) {
  //       await pool.query(query, [userId]);
  //     }
  
  //     console.log('Usunięto użytkownika z bazy danych');
  //     res.status(204).end();
  //   } catch (error) {
  //     console.error('Błąd usuwania użytkownika:', error);
  //     res.status(500).json({ error: 'Błąd usuwania użytkownika' });
  //   }

  // });

  app.delete('/users/:user_id', async (req, res) => {
    const userId = req.params.user_id;
  
    try {
      const deleteUserQuery = 'DELETE FROM gradebook.users WHERE user_id = $1';
      await pool.query(deleteUserQuery, [userId]);
  
      console.log('Usunięto użytkownika z bazy danych');
      res.status(204).end();
    } catch (error) {
      console.error('Błąd usuwania użytkownika:', error);
      res.status(500).json({ error: 'Błąd usuwania użytkownika' });
    }
  });


  app.put('/users/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    const { first_name, second_name } = req.body;
  
    try {
      const editUserQuery = 'UPDATE gradebook.users SET first_name = $1, second_name = $2 WHERE user_id = $3';
      await pool.query(editUserQuery, [first_name, second_name, userId]);
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Błąd edycji użytkownika:', error);
      res.status(500).json({ error: 'Błąd edycji użytkownika' });
    }
  });
  
}

export default userEndpoint;
