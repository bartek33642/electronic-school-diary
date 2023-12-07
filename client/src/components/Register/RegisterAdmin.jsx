import React, { useState } from "react";
import './Register.css';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export function RegisterAdmin(props) {
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
        setSuccessMessage('');
        e.preventDefault();
      
        if (!email || !password || !firstName || !lastName) {
          setErrorMessage("Wszystkie pola są wymagane.");
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
            //   console.log("Admin zarejestrowany pomyślnie.");
              setSuccessMessage("Admin zarejestrowany pomyślnie.");
              setOpen(true);
              // Tutaj użyj callbacka, aby przekazać komunikat o sukcesie do komponentu AdminUsers
              props.onRegistrationResult("Admin zarejestrowany pomyślnie.", null);
              setEmail('');
              setPassword('');
              setFirstName('');
              setLastName('');
              setIsActive(false);
            } else {
            //   console.error("Nieprawidłowa odpowiedź serwera.");
              setErrorMessage("Nieprawidłowa odpowiedź serwera.");
              setOpen(true);
              // Tutaj użyj callbacka, aby przekazać komunikat o błędzie do komponentu AdminUsers
              props.onRegistrationResult(null, "Nieprawidłowa odpowiedź serwera.");
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
</>
    );
}
