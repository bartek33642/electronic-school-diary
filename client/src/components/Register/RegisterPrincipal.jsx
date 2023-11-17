import React, { useState, useEffect } from "react";
import './Register.css';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function RegisterPrincipal() {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  

  useEffect(() => {
    fetch('/schools')
      .then(response => response.json())
      .then(data => setSchools(data))
      .catch(error => console.error('Błąd pobierania szkół:', error));
  }, []);

  const handleRegister = (e) => {
    setErrorMessage('');
    setSuccessMessage('');
    e.preventDefault();

    const registrationData = {
      email,
      password,
      active: isActive,
      first_name: firstName,
      second_name: lastName,
      school_id: selectedSchool,
    };

      // Sprawdź, czy wszystkie pola są wypełnione
      if (!email || !password || !firstName || !lastName || !schools) {
        setErrorMessage("Wszystkie pola są wymagane."); // Ustaw komunikat o błędzie
        return;
    }

    const registration$ = ajax.post(
      "http://localhost:3001/register-principal",
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
          console.log("Dyrektor zarejestrowany pomyślnie.");
          setSuccessMessage('Dyrektor zarejestrowany pomyślnie')
          setOpen(true);

          // Wyczyść formularz po pomyślnej rejestracji
          setEmail('');
          setPassword('');
          setFirstName('');
          setLastName('');
          setIsActive(false);
          setSelectedSchool('');

        } else {
          console.error("Nieprawidłowa odpowiedź serwera.");
          setErrorMessage("Nieprawidłowa odpowiedź serwera.");
          setOpen(true);

        }
      });
  };

  const [open, setOpen] = React.useState(false);

      
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <div className="register-form">
      <form method="post" onSubmit={handleRegister}>
        Adres e-mail: <input type="text" id="email" name="email" className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} required/> <br />
        Hasło: <input type="password" id="password-register" name="password" className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} required /> <br />
        Imię: <input type="text" name="first-name" id="first-name" className="register-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/> <br />
        Nazwisko: <input type="text" name="last-name" id="last-name" className="register-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required /> <br />
        Czy aktywny: <input type="checkbox" name="active" id="active" checked={isActive} onChange={() => setIsActive(!isActive)} />  <br />
        Szkoła: <select name="school_id" id="school" className="register-input" onChange={(e) => setSelectedSchool(e.target.value)} value={selectedSchool} required>
          <option value="" name='option-school' disabled> Wybierz szkołę</option>
          {schools.map((school) => (
            <option key={school.school_id} value={school.school_id}>
              {school.school_name} - {school.town}
            </option>
          ))}
        </select> <br />
        <input type="button" value="Zapisz" onClick={handleRegister} />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>} 

      </form>

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
            
    </div>
  );
}
