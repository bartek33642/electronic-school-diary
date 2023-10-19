// const express = require('express');
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// const pool = require('../db');
// const config = require('../config');


// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     const user = { email, role: 'admin' }; 
//     const token = jwt.sign(user, config.jwtSecret, { expiresIn: '1h' });

//     res.json({ token });
// });

  
// module.exports = router;



// const express = require('express');
// const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcrypt'); // Dodana biblioteka do haszowania hasła
// const router = express.Router();
// const pool = require('../../../db');
// const config = require('../../config');
// router.use(express.json());

// router.post('/REST/login', async (req, res) => {
//     console.log("Dane z req.body:", req.body);
//     const { email, password } = req.body;

//     try {
//         // Sprawdź, czy istnieje użytkownik o podanym e-mailu w bazie danych.
        
//         const user = await pool.query("SELECT * FROM gradebook.users WHERE email = $1", [email]);

//         if (user.rows.length === 0) {
//             // Jeśli nie znaleziono użytkownika, zwróć błąd.
//             return res.status(401).json({ message: 'Nieprawidłowy e-mail lub hasło. Nie wypełniono' });
//         }

//         // Porównaj hasło z bazą danych za pomocą bcrypt.
//         // const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
        

//         // if (!passwordMatch) {
//         //     // Jeśli hasło nie pasuje, zwróć błąd.
//         //     return res.status(401).json({ message: 'Nieprawidłowy e-mail lub hasło.' });
//         // }

//         if (!password){
//             return res.status(401).json({message: 'Nieprawidłowy email lub hasło'})
//         }

//         // Użytkownik zweryfikowany, generuj token JWT.
//         const token = jwt.sign({ email, role: 'admin' }, config.jwtSecret, { expiresIn: '1h' });

//         res.json({ token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Błąd logowania.' });
//     }
// });

// module.exports = router;




const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt'); // Usunięta biblioteka do haszowania hasła
const router = express.Router();
const pool = require('../../../db');
const config = require('../../config');
router.use(express.json());

router.post('/REST/login', async (req, res) => {
    console.log("Dane z req.body:", req.body);
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(401).json({ message: 'Nieprawidłowy e-mail lub hasło. Nie wypełniono' });
        }

        // Sprawdź, czy istnieje użytkownik o podanym e-mailu w bazie danych.
        const user = await pool.query("SELECT * FROM gradebook.users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            // Jeśli nie znaleziono użytkownika, zwróć błąd.
            return res.status(401).json({ message: 'Nieprawidłowy e-mail lub hasło.' });
        }

        // Usunięta weryfikacja hasła z użyciem bcrypt.

        // Użytkownik zweryfikowany, generuj token JWT.
        // const token = jwt.sign({ email, role: 'admin' }, config.jwtSecret, { expiresIn: '1h' });

        // res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Błąd logowania.' });
    }
});

module.exports = router;
