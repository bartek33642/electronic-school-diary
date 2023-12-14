import React, { useState, useEffect } from "react";
import './Register.css';
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { backendServer } from "../../config";

export function RegisterParent(props) {
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [street, setStreet] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [town, setTown] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Dodane pole na komunikat o udanej rejestracji


  useEffect(() => {
    fetch(`${backendServer}/schools`)
      .then(response => response.json())
      .then(data => setSchools(data))
      .catch(error => console.error('Błąd pobierania szkół:', error));
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      fetch(`${backendServer}/students/${selectedSchool}`)
        .then(response => response.json())
        .then(data => setStudents(data))
        .catch(error => console.error('Błąd pobierania studentów:', error));
    }
  }, [selectedSchool]);

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
      student_id: selectedStudent,
      school_id: selectedSchool,
      street,
      building_number: buildingNumber,
      apartment_number: apartmentNumber,
      zip_code: zipCode,
      town,
      phone_number: phoneNumber
    };

      // Sprawdź, czy wszystkie pola są wypełnione
      if (!email || !password || !firstName || !lastName || !schools || !students || !street || !buildingNumber || !zipCode || !town || !phoneNumber) {
        setErrorMessage("Wszystkie pola są wymagane."); // Ustaw komunikat o błędzie
        return;
    }

    const registration$ = ajax.post(
      `${backendServer}/register-parent`,
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
          console.log("Rodzic zarejestrowany pomyślnie.");
          setSuccessMessage('Rodzic zarejestrowany pomyślnie');
          setOpen(true);

          props.onRegistrationResult("Rodzic zarejestrowany pomyślnie.", null);

          // Wyczyść formularz po pomyślnej rejestracji
          setEmail('');
          setPassword('');
          setFirstName('');
          setLastName('');
          setIsActive(false);
          setSelectedStudent('');
          setSelectedSchool('');
          setStreet('');
          setBuildingNumber('');
          setApartmentNumber('');
          setZipCode('');
          setTown('');
          setPhoneNumber('');

        } else {
          // console.error("Nieprawidłowa odpowiedź serwera.");
          setErrorMessage("Nieprawidłowa odpowiedź serwera.");
          props.onRegistrationResult(null, "Nieprawidłowa odpowiedź serwera.");

          setOpen(true);

        }
      });
  };
  const [open, setOpen] = useState(false);

      
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
        Adres e-mail: <input type="text" id="email" name="email" className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} required/> <br />
        Hasło: <input type="password" id="password-register" name="password" className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} required /> <br />
        Imię: <input type="text" name="first-name" id="first-name" className="register-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /> <br />
        Nazwisko: <input type="text" name="last-name" id="last-name" className="register-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required /> <br />
        Czy aktywny: <input type="checkbox" name="active" id="active" checked={isActive} onChange={() => setIsActive(!isActive)}  /> <br />
        Szkoła: <select name="school-select" id="school " className="register-input"  onChange={(e) => setSelectedSchool(e.target.value)} value={selectedSchool} required>
            <option value="" name='option-school' disabled> Wybierz szkołę</option>
            {schools.map((school) => (
            <option key={school.school_id} value={school.school_id}>
              {school.school_name} - {school.town}
            </option>
          ))}
        </select> <br />
        Uczeń:
      <select name="student-select" id="student-select" className="register-input" onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent} disabled={!selectedSchool} required>
        <option value="" name='option-student' disabled> Wybierz ucznia</option>
        {students.map((student) => (
          <option key={student.student_id} value={student.student_id}>
            {student.first_name} {student.second_name}
          </option>
        ))}
      </select> <br />

        Ulica: <input type="text" name="street" id="street" className="register-input" value={street} onChange={(e) => setStreet(e.target.value)} required/> <br />
        Numer budynku: <input type="text" name="building_number" id="building_number" className="register-input" value={buildingNumber} onChange={(e) => setBuildingNumber(e.target.value)} required/> <br />
        Numer mieszknia: <input type="text" name="apartment_number" id="apartment_number" className="register-input" value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)}/> <br />
        Kod pocztowy: <input type="text" name="zip_code" id="zip_code" className="register-input" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required /> <br />
        Miejscowość: <input type="text" name="town" id="town" className="register-input" value={town} onChange={(e) => setTown(e.target.value)} required/> <br />
        Numer telefonu: <input type="text" name="phone_number" id="phone_number" className="register-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/> <br />
        <input type="submit" value="Zapisz" onClick={handleRegister}/>
        {errorMessage && <div className="error-message">{errorMessage}
        {successMessage && <div className="success-message">{successMessage}</div>} 
        </div>}

        </form>


      </div>

</>
    );
    
}