import React, { useState } from "react";
import './Register.css';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function RegisterAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Dodane pole na komunikat o udanej rejestracji
    const [open, setOpen] = useState(false);


    const handleRegister = (e) => {
        setErrorMessage('');
        setSuccessMessage(''); // Wyczyść komunikat o udanej rejestracji przed próbą rejestracji
        e.preventDefault();

        // Sprawdź, czy wszystkie pola są wypełnione
        if (!email || !password || !firstName || !lastName) {
            setErrorMessage("Wszystkie pola są wymagane."); // Ustaw komunikat o błędzie
            return;
        }

        const registrationData = {
            email,
            password,
            role: '1',
            active: isActive,
            status: 'admin',
            first_name: firstName,
            second_name: lastName,
        };

        const registration$ = ajax.post(
          "http://localhost:3001/register-admin",
          registrationData,
          {
            "Content-Type": "application/json",
          }
        );

        registration$
            .pipe(
                map((response) => response.response),
                catchError((error) => {
                    console.error("Błąd rejestracji: ", error);
                    setErrorMessage("Błąd rejestracji. Spróbuj ponownie.");
                    return of(null);
                })
            )
            .subscribe((data) => {
                if (data) {
                    console.log("Admin zarejestrowany pomyślnie.");
                    setSuccessMessage("Admin zarejestrowany pomyślnie.");
                    setOpen(true);

                    // Wyczyść formularz po pomyślnej rejestracji
                    setEmail('');
                    setPassword('');
                    setFirstName('');
                    setLastName('');
                    setIsActive(false);

                } else {
                    console.error("Nieprawidłowa odpowiedź serwera.");
                    setErrorMessage("Nieprawidłowa odpowiedź serwera.");
                    setOpen(true);
                }
            });
    };

      
        const handleClose = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
      
          setOpen(false);
        };



    return (
        <>
        <div className="register-form">
            <form method="post" onSubmit={handleRegister}>
                Adres e-mail: <input type="text" id="email" name="email" className="register-input" required value={email} onChange={(e) => setEmail(e.target.value)}/> <br />
                Hasło: <input type="password" id="password-register" name="password" required className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                Imię: <input type="text" name="first-name" id="first-name" required className="register-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} /> <br />
                Nazwisko: <input type="text" name="last-name" id="last-name" required className="register-input" value={lastName} onChange={(e) => setLastName(e.target.value)} /><br />
                Czy aktywny: <input type="checkbox" name="active" id="active"  checked={isActive} onChange={() => setIsActive(!isActive)} />  <br />
                <input type="button" value="Zapisz" onClick={handleRegister} />
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                {successMessage && <div className="success-message">{successMessage}</div>} {/* Wyświetlanie komunikatu o udanej rejestracji */}
            </form>


        </div>

        <Snackbar open={successMessage !== ''} autoHideDuration={4000} onClose={() => setSuccessMessage('')}>
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
        Pomyślnie zarejestrowano użytkownika
        </Alert>
        </Snackbar>

        <Snackbar open={errorMessage !== ''} autoHideDuration={4000} onClose={() => setErrorMessage('')}>
        <Alert onClose={() => setErrorMessage('')} severity="warning" sx={{ width: '100%' }}>
        Użytkownik nie został zarejestrowany
        </Alert>
        </Snackbar>
</>
    );
}
