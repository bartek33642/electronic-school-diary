// import React from "react";
// import './Register.css';

// export function RegisterAdmin(){
//     return (
//       <div className="register-form">
//         <form action="/register-admin" method="post">
//         Adres e-mail: <input type="text" id="email" name="email"/> <br />
//         Hasło: <input type="password" id="password-register" name="password"/> <br />
//         Imię: <input type="text" name="first-name" id="first-name" /> <br />
//         Nazwisko: <input type="text" name="last-name" id="last-name" /><br />
//         Czy aktywny: <input type="checkbox" name="active" id="active" />  <br />
//         <input type="submit" value="Zapisz" />
//         </form>
//       </div>
//     );
    
// }


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

    const handleRegister = () => {
        // Przygotuj dane do wysłania na serwer
        const registrationData = {
            email,
            password,
            role: '1', 
            active: isActive,
            status: 'admin',
            first_name: firstName,
            second_name: lastName,
        };

        // Wysłanie danych do serwera
        const registration$ = ajax.post(
          "http://localhost:3001/REST/register-admin",
          registrationData,
          {
            "Content-Type": "application/json",
          }
        );

        registration$
            .pipe(
                map((response) => response.response), // Dostęp do odpowiedzi.
                catchError((error) => {
                    // Obsłuż błąd.
                    console.error("Błąd rejestracji: ", error);
                    return of(null); // Zwróć pustą wartość w przypadku błędu.
                })
            )
            .subscribe((data) => {
                if (data) {
                    console.log("Admin zarejestrowany pomyślnie.");
                } else {
                    console.error("Nieprawidłowa odpowiedź serwera.");
                }
            });
    };

    return (
        <div className="register-form">
            <form>
                Adres e-mail: <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                Hasło: <input type="password" id="password-register" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                Imię: <input type="text" name="first-name" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} /> <br />
                Nazwisko: <input type="text" name="last-name" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} /><br />
                Czy aktywny: <input type="checkbox" name="active" id="active" checked={isActive} onChange={() => setIsActive(!isActive)} />  <br />
                <input type="button" value="Zapisz" onClick={handleRegister} />
            </form>
        </div>
    );
}
