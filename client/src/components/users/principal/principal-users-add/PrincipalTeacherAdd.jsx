// import React, { useState, useEffect } from "react";
// import './Register.css';
// import { ajax } from 'rxjs/ajax';
// import { catchError, map } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { backendServer } from "../../config";

// export function PrincipalTeacherAdd(props) {
//   const [schools, setSchools] = useState([]);
//   const [userData, setUserData] = useState([]);
//   const [selectedSchool, setSelectedSchool] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [isActive, setIsActive] = useState(false);
//   const [specialization, setSpecialization] = useState('')
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');


//   useEffect(() => {
//     fetch(`${backendServer}/schools`)
//       .then(response => response.json())
//       .then(data => setSchools(data))
//       .catch(error => console.error('Błąd pobierania szkół:', error));
//   }, []);

//   const handleRegister = (e) => {
//     setErrorMessage('');
//     setSuccessMessage('');
//     e.preventDefault();


//     if (!email || !password || !firstName || !lastName || !schools || !specialization) {
//       setErrorMessage("Wszystkie pola są wymagane."); // Ustaw komunikat o błędzie
//       return;
//   }


//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userEmail = localStorage.getItem("userEmail");

//         if (userEmail) {
//           const userQuery = `${backendServer}/users-school-student/${userEmail}`;
//           const result = await fetch(userQuery);
//           const userData = await result.json();
//           console.log("userData: ", userData);
//           setUserData(userData);
//         }
//       } catch (error) {
//         console.error(error);
//         setError("Wystąpił błąd podczas pobierania danych użytkownika.");
//       }
//     };

//     fetchUserData();
//   }, []);

//     const registrationData = {
//       email,
//       password,
//       active: isActive,
//       first_name: firstName,
//       second_name: lastName,
//       school_id: selectedSchool,
//       specialization
//     };

//     const registration$ = ajax.post(
//       `${backendServer}/register-teacher`,
//       registrationData,
//       {
//         "Content-Type": "application/json",
//       }
//     );

//     registration$
//       .pipe(
//         map((response) => response.response),
//         catchError((error) => {
//           console.error("Błąd rejestracji: ", error);
//           setErrorMessage("Błąd rejestracji. Spróbuj ponownie.");
//           return of(null);
//         })
//       )
//       .subscribe((data) => {
//         if (data) {
//           // console.log("Nauczyciel zarejestrowany pomyślnie.");
//           setSuccessMessage('Nauczyciel zarejestrowany pomyślnie');
//           setOpen(true);

//           props.onRegistrationResult("Nauczyciel zarejestrowany pomyślnie.", null);


//           // Wyczyść formularz po pomyślnej rejestracji
//           setEmail('');
//           setPassword('');
//           setFirstName('');
//           setLastName('');
//           setIsActive(false);
//           setSelectedSchool('');
//           setSpecialization('');

//         } else {
//           // console.error("Nieprawidłowa odpowiedź serwera.");
//           setErrorMessage("Nieprawidłowa odpowiedź serwera.");
//           props.onRegistrationResult(null, "Nieprawidłowa odpowiedź serwera.");

//           setOpen(true);

//         }
//       });
//   };

//   const [open, setOpen] = useState(false);

      
//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };
//     return (
//       <>
//       <div className="register-form">
//         <form method="post" onSubmit={handleRegister}>
//         Adres e-mail: <input type="text" id="email" name="email" className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br />
//         Hasło: <input type="password" id="password-register" name="password" className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} required /> <br />
//         Imię: <input type="text" name="first-name" id="first-name" className="register-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /> <br />
//         Nazwisko: <input type="text" name="last-name" id="last-name" className="register-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required /> <br />
//         Czy aktywny: <input type="checkbox" name="active" id="active" className="register-input" checked={isActive} onChange={() => setIsActive(!isActive)} /> <br />
//         Specjalizacja: <input type="text" name="specialization" className="register-input" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required /> <br />
//         <input type="submit" value="Zapisz" onClick={handleRegister}/>
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//         {successMessage && <div className="success-message">{successMessage}</div>} 
//         </form>
            
//       </div>

//       </>
//     );
    
// }


// PrincipalTeacherAdd.jsx
import React, { useState, useEffect } from "react";
import { ajax } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { backendServer } from "../../../../config";
import '../../../users/userModal/UserModal.css';

export function PrincipalTeacherAdd(props) {
  const [schools, setSchools] = useState([]);
  const [userData, setUserData] = useState([]);
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
    fetch(`${backendServer}/schools`)
      .then(response => response.json())
      .then(data => setSchools(data))
      .catch(error => console.error('Błąd pobierania szkół:', error));
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          const userQuery = `${backendServer}/users-school-student/${userEmail}`;
          const result = await fetch(userQuery);
          const userData = await result.json();
          setUserData(userData);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage("Wystąpił błąd podczas pobierania danych użytkownika.");
      }
    };

    fetchUserData();
  }, []);

  const handleRegister = (e) => {
    setErrorMessage('');
    setSuccessMessage('');
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !specialization) {
      setErrorMessage("Wszystkie pola są wymagane.");
      return;
    }

        const registrationData = {
            email,
            password,
            active: isActive,
            first_name: firstName,
            second_name: lastName,
            school_id: userData[0].school_id,
            specialization
          };
          console.log("userData[0].school_id", userData[0].school_id);
          
          const registration$ = ajax.post(
            `${backendServer}/register-teacher`,
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
                setSuccessMessage('Nauczyciel zarejestrowany pomyślnie');
                props.onAddTeacher();
                setEmail('');
                setPassword('');
                setFirstName('');
                setLastName('');
                setIsActive(false);
                setSpecialization('');
              } else {
                setErrorMessage("Nieprawidłowa odpowiedź serwera.");
              }
            });
          

  };

  return (
    <div className="register-form">
      <form method="post" onSubmit={handleRegister}>
        Adres e-mail: <input type="text" id="email" name="email" className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br />
        Hasło: <input type="password" id="password-register" name="password" className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} required /> <br />
        Imię: <input type="text" name="first-name" id="first-name" className="register-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required /> <br />
        Nazwisko: <input type="text" name="last-name" id="last-name" className="register-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required /> <br />
        Czy aktywny: <input type="checkbox" name="active" id="active" className="register-input" checked={isActive} onChange={() => setIsActive(!isActive)} /> <br />
        Specjalizacja: <input type="text" name="specialization" className="register-input" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required /> <br />
        <input type="submit" value="Zapisz" onClick={handleRegister} />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
}
