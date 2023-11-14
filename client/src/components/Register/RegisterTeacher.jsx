import React, { useState, useEffect } from "react";
import './Register.css';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

export function RegisterTeacher() {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [specialization, setSpecialization] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    fetch('/schools')
      .then(response => response.json())
      .then(data => setSchools(data))
      .catch(error => console.error('Błąd pobierania szkół:', error));
  }, []);

  const handleRegister = () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password || !firstName || !lastName || !schools || !specialization) {
      setErrorMessage("Wszystkie pola są wymagane."); // Ustaw komunikat o błędzie
      return;
  }

    const registrationData = {
      email,
      password,
      active: isActive,
      first_name: firstName,
      second_name: lastName,
      school_id: selectedSchool,
      specialization
    };

    const registration$ = ajax.post(
      "http://localhost:3001/register-teacher",
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
        } else {
          console.error("Nieprawidłowa odpowiedź serwera.");
          setErrorMessage("Nieprawidłowa odpowiedź serwera.");
        }
      });
  };
    return (
      <div className="register-form">
        <form >
        Adres e-mail: <input type="text" id="email" name="email" className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br />
        Hasło: <input type="password" id="password-register" name="password" className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} required /> <br />
        Imię: <input type="text" name="first-name" id="first-name" className="register-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /> <br />
        Nazwisko: <input type="text" name="last-name" id="last-name" className="register-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required /> <br />
        Czy aktywny: <input type="checkbox" name="active" id="active" className="register-input" checked={isActive} onChange={() => setIsActive(!isActive)} /> <br />
        Szkoła: <select name="school" id="school" className="register-input" onChange={(e) => setSelectedSchool(e.target.value)} value={selectedSchool} required >
            <option value="" name='option-school' disabled> Wybierz szkołę</option>
            {schools.map((school) => (
            <option key={school.school_id} value={school.school_id}>
              {school.school_name} - {school.town}
            </option>
          ))}
        </select> <br />
        Specjalizacja: <input type="text" name="specialization" className="register-input" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required /> <br />
        <input type="submit" value="Zapisz" onClick={handleRegister}/>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>} 
        </form>
      </div>
    );
    
}