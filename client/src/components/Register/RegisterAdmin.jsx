import React, { useState } from "react";
import './Register.css';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export function RegisterAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // Dodane pole na komunikat o błędzie

    const handleRegister = () => {
        setErrorMessage(''); // Wyczyść komunikat o błędzie przed próbą rejestracji

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
                    setErrorMessage("Błąd rejestracji. Spróbuj ponownie."); // Ustaw komunikat o błędzie
                    return of(null);
                })
            )
            .subscribe((data) => {
                if (data) {
                    console.log("Admin zarejestrowany pomyślnie.");
                } else {
                    console.error("Nieprawidłowa odpowiedź serwera.");
                    setErrorMessage("Nieprawidłowa odpowiedź serwera.");
                }
            });
    };

    return (
        <div className="register-form">
            <form>
                Adres e-mail: <input type="text" id="email" name="email" className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                Hasło: <input type="password" id="password-register" name="password" className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                Imię: <input type="text" name="first-name" id="first-name" className="register-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} /> <br />
                Nazwisko: <input type="text" name="last-name" id="last-name" className="register-input" value={lastName} onChange={(e) => setLastName(e.target.value)} /><br />
                Czy aktywny: <input type="checkbox" name="active" id="active"  checked={isActive} onChange={() => setIsActive(!isActive)} />  <br />
                <input type="button" value="Zapisz" onClick={handleRegister} />
                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Wyświetlanie komunikatu o błędzie */}
            </form>
        </div>
    );
}
