// // loginMiddleware.js
// const express = require('express');
// const router = express.Router();
// const pool = require('../../db'); // Zaimportuj swój obiekt bazodanowy
// const passwordDAO = require('../DAO/passwordDAO'); // Zaimportuj plik do weryfikacji hasła
// const jwt = require('jsonwebtoken');

// // Endpoint logowania
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Sprawdź, czy użytkownik istnieje w bazie danych na podstawie adresu email
//     const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//     if (user.rows.length === 0) {
//       return res.status(401).json({ error: 'Nieprawidłowy e-mail lub hasło' });
//     }

//     // Weryfikacja hasła
//     const isPasswordValid = await passwordDAO.comparePassword(password, user.rows[0].password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Nieprawidłowy e-mail lub hasło' });
//     }

//     // Generowanie tokena JWT
//     const jwtSecret = 'twój sekret JWT';
//     const token = jwt.sign({ userId: user.rows[0].user_id, role: user.rows[0].role }, jwtSecret);

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Błąd logowania' });
//   }
// });

// module.exports = router;

// loginMiddleware.js
const express = require('express');
const router = express.Router();
const pool = require('../../db'); // Zaimportuj swój obiekt bazodanowy
const jwt = require('jsonwebtoken');

// Endpoint logowania
router.post('/REST/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Sprawdź, czy użytkownik istnieje w bazie danych na podstawie adresu email i hasła
    const user = await pool.query('SELECT * FROM gradebook.users WHERE email = $1 AND  password = $2', [email, password]);

    console.log(user);

    if (user.rows.length > 0){
        res.redirect('http://localhost:3000/role');
    }

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Nieprawidłowy e-mail lub hasło' });
    }


    // Tutaj pomijamy weryfikację hasła - hasło w czystej postaci
    // Jest to praktyka tymczasowa i niebezpieczna. Konieczne jest skrócenie hasła w przyszłości.

    // Generowanie tokena JWT
    // const jwtSecret = 'twój sekret JWT';
    // const token = jwt.sign({ userId: user.rows[0].user_id, role: user.rows[0].role }, jwtSecret);

    // res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Błąd logowania' });
  }
});

module.exports = router;

