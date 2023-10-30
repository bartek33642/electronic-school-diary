// import React, { useState } from "react";
// import "./Login.css"
// import imageEducation from "../../images/education.svg"
// import { FiEye, FiEyeOff } from 'react-icons/fi'

// export function Login(){
//     const [showPassword, setShowPassword] = useState(false);

//     const handleShowPasswordChange = () => {
//       setShowPassword(!showPassword);
//     };

//     return(
//         <div className="login-form">

//             <div className="login-content">
//                 <div className="left-login-content">
//                     <img src={imageEducation} className="image-login" alt="Education" />
//                 </div>
//                     <div className="right-login-content">
//                     <h3 className="h3-login">Logowanie</h3>
//                     <p className="p-login">Zaloguj się do aplikacji e-dziennik</p>
                
//                 E-mail: <input type="email" id="login" /> <br />
//                 <div className="password-container"> Hasło: 
                
//                     <input type={showPassword ? "text" : "password"} id="password" /> 
//                     {showPassword ? (
//                     <span className="password-toggle" onClick={handleShowPasswordChange}>
//                         <FiEyeOff alt="password show/hide eye"  className="fi-login-eye"/>
//                     </span>
//                     ) : (
//                     <span className="password-toggle" onClick={handleShowPasswordChange}>
//                         <FiEye alt="password show/hide eye" className="fi-login-eye"/>
//                     </span>
//                     )}
//                     <br />
//                 </div>
//                 <a href="/role" className="loginA"><button type="submit" className="loginBttn">Zaloguj się</button></a><br /> 

//                 {/* <a href="/" id="forgotPassword">Zapomniałem hasła</a> */}
//                 </div>
//             </div>

//         </div>
//     );
// }

// import React, { useState } from "react";
// import "./Login.css";
// import axios from 'axios';
// import imageEducation from "../../images/education.svg";
// import { FiEye, FiEyeOff } from "react-icons/fi";

// export function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");


//   const handleShowPasswordChange = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async () => {
//     const email = document.getElementById("login").value;
//     const password = document.getElementById("password").value;

//     try {
//       // Wyślij żądanie logowania do serwera.
//       const response = await axios.post("http://localhost:3001/REST/login", { email, password });

//       if (response.data.token) {
//         // Jeśli otrzymaliśmy token JWT w odpowiedzi, zachowujemy go w Local Storage.
//         localStorage.setItem("jwtToken", response.data.token);

//         // Przekieruj użytkownika do strony roli (na przykład /role).
//         window.location.href = "/role";
//       } else {
//         console.error("Nieprawidłowa odpowiedź serwera.");
//       }
//     } catch (error) {
//       console.error("Błąd logowania: ", error);
//     }
//   };

//   return (
//     <div className="login-form">
//       <div className="login-content">
//         <div className="left-login-content">
//           <img src={imageEducation} className="image-login" alt="Education" />
//         </div>
//         <div className="right-login-content">
//           <h3 className="h3-login">Logowanie</h3>
//           <p className="p-login">Zaloguj się do aplikacji e-dziennik</p>

//           E-mail: <input type="email" id="login" /> <br />
//           <div className="password-container">
//             Hasło:
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//             />
//             {showPassword ? (
//               <span className="password-toggle" onClick={handleShowPasswordChange}>
//                 <FiEyeOff alt="password show/hide eye" className="fi-login-eye" />
//               </span>
//             ) : (
//               <span className="password-toggle" onClick={handleShowPasswordChange}>
//                 <FiEye alt="password show/hide eye" className="fi-login-eye" />
//               </span>
//             )}
//             <br />
//           </div>
//           <button
//             onClick={handleLogin}
//             type="button"
//             className="loginBttn"
//           >
//             Zaloguj się
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import "./Login.css";
// import imageEducation from "../../images/education.svg";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// // import { Observable } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { catchError, map } from 'rxjs/operators';
// import { of } from 'rxjs';

// export function Login() {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleShowPasswordChange = () => {
//     setShowPassword(!showPassword);
//   };

//   // const handleLogin = () => {
//   //   const email = document.getElementById("login").value;
//   //   const password = document.getElementById("password").value;

//   //   const loginData = { email, password };

//   //   console.log("loginData: ", loginData); 

//   //   const login$ = ajax.post("http://localhost:3001/REST/login/REST/login", loginData, {
//   //     "Content-Type": "application/json",
//   //   });

//   //   login$
//   //     .pipe(
//   //       map((response) => response.response), // Dostęp do odpowiedzi.
//   //       catchError((error) => {
//   //         // Obsłuż błąd.
//   //         console.error("Błąd logowania: ", error);
//   //         return of(null); // Zwróć pustą wartość w przypadku błędu.
//   //       })
//   //     )
//   //     // .subscribe((data) => {
//   //     //   if (data && data.token) {
//   //     //     localStorage.setItem("jwtToken", data.token);
//   //     //     window.location.href = "/role";
//   //     //   } else {
//   //     //     console.error("Nieprawidłowa odpowiedź serwera.");
//   //     //   }
//   //     // });
//   //     .subscribe((data) => {
//   //       if (data) {
//   //         window.location.href = "/role";
//   //       } else {
//   //         console.error("Nieprawidłowa odpowiedź serwera.");
//   //       }
//   //     });
//   // };

//   const handleLogin = () => {
//     const email = document.getElementById("login").value;
//     const password = document.getElementById("password").value;
  
//     const loginData = { email, password };
  
//     console.log("loginData: ", loginData);
  
//     const login$ = ajax.post("http://localhost:3001/REST/login/REST/login", loginData, {
//       "Content-Type": "application/json",
//     });
  
//     login$
//       .pipe(
//         map((response) => response.response),
//         catchError((error) => {
//           console.error("Błąd logowania: ", error);
//           return of(null);
//         })
//       )
//       .subscribe((data) => {
//         if (data) {
//           // Przekierowanie po pomyślnym zalogowaniu
//           window.location.href = "/role"; // Zmienia adres URL na "/role"
//         } else {
//           console.error("Nieprawidłowa odpowiedź serwera.");
//         }
//       });
//   };
  
  

//   return (
//     <div className="login-form">
//       <div className="login-content">
//         <div className="left-login-content">
//           <img src={imageEducation} className="image-login" alt="Education" />
//         </div>
//         <div className="right-login-content">
//           <h3 className="h3-login">Logowanie</h3>
//           <p className="p-login">Zaloguj się do aplikacji e-dziennik</p>

//           E-mail: 
//           <div className="input-label-login">
//           <input type="email" id="login" /> </div> <br />
//           <div className="password-container">
//             Hasło:
//             <div className="input-label-login"><input
//               type={showPassword ? "text" : "password"}
//               id="password"
//             />
//             {showPassword ? (
//               <span className="password-toggle" onClick={handleShowPasswordChange}>
//                 <FiEyeOff alt="password show/hide eye" className="fi-login-eye" />
//               </span>
//             ) : (
//               <span className="password-toggle" onClick={handleShowPasswordChange}>
//                 <FiEye alt="password show/hide eye" className="fi-login-eye" />
//               </span>
//             )}</div>
//             <br />
//           </div>
//           <button onClick={handleLogin} type="button" className="loginBttn">
//             Zaloguj się
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

//-------------------------------------------------

// import React, { useState } from "react";
// import "./Login.css";
// import imageEducation from "../../images/education.svg";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import { ajax } from "rxjs/ajax";
// import { catchError, map } from "rxjs/operators";
// import { of } from "rxjs";
// import { createBrowserHistory } from "history";

// // Utwórz obiekt historii
// const history = createBrowserHistory();

// export function Login() {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleShowPasswordChange = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = () => {
//     const email = document.getElementById("login").value;
//     const password = document.getElementById("password").value;

//     const loginData = { email, password };

//     const login$ = ajax.post("http://localhost:3001/REST/login", loginData, {
//       "Content-Type": "application/json",
//     });

//     login$
//       .pipe(
//         map((response) => response.response),
//         catchError((error) => {
//           console.error("Błąd logowania: ", error);
//           return of(null);
//         })
//       )
//       .subscribe((data) => {
        
//         if (data) {
//           console.log(data);
//           // Sprawdź, czy status odpowiedzi to 200
//           if (data.status === 200) {
//             history.push("http://localhost:3000/role");
//             // window.location.href = 'http://localhost:3000/role';
//           } else {
//             console.error("Nieprawidłowa odpowiedź serwera.");
//           }
//         }
//       });
//   };

//   return (
//     <div className="login-form">
//       <div className="login-content">
//         <div className="left-login-content">
//           <img src={imageEducation} className="image-login" alt="Education" />
//         </div>
//         <div className="right-login-content">
//           <h3 className="h3-login">Logowanie</h3>
//           <p className="p-login">Zaloguj się do aplikacji e-dziennik</p>

//           E-mail:
//           <div className="input-label-login">
//             <input type="email" id="login" />
//           </div>{" "}
//           <br />
//           <div className="password-container">
//             Hasło:
//             <div className="input-label-login">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//               />
//               {showPassword ? (
//                 <span
//                   className="password-toggle"
//                   onClick={handleShowPasswordChange}
//                 >
//                   <FiEyeOff alt="password show/hide eye" className="fi-login-eye" />
//                 </span>
//               ) : (
//                 <span
//                   className="password-toggle"
//                   onClick={handleShowPasswordChange}
//                 >
//                   <FiEye alt="password show/hide eye" className="fi-login-eye" />
//                 </span>
//               )}
//             </div>
//             <br />
//           </div>
//           <button onClick={handleLogin} type="button" className="loginBttn">
//             Zaloguj się
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import "./Login.css";
import imageEducation from "../../images/education.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { createBrowserHistory } from "history";

// Utwórz obiekt historii
const history = createBrowserHistory();

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const loginData = { email, password };

    const login$ = ajax.post("http://localhost:3001/REST/login", loginData, {
      "Content-Type": "application/json",
    });

    login$
      .pipe(
        map((response) => response.response),
        catchError((error) => {
          console.error("Błąd logowania: ", error);
          setError("Nieprawidłowa odpowiedź serwera.");
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          console.log(data);
          // Sprawdź, czy status odpowiedzi to 200
          if (data.status === 200) {
            history.push("/role");
          } else {
            setError("Nieprawidłowa odpowiedź serwera.");
          }
        }
      });
  };

  return (
    <div className="login-form">
      <div className="login-content">
        <div className="left-login-content">
          <img src={imageEducation} className="image-login" alt="Education" />
        </div>
        <div className="right-login-content">
          <h3 className="h3-login">Logowanie</h3>
          <p className="p-login">Zaloguj się do aplikacji e-dziennik</p>

          E-mail:
          <div className="input-label-login">
            <input
              type="email"
              id="login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div className="password-container">
            Hasło:
            <div className="input-label-login">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <span
                  className="password-toggle"
                  onClick={handleShowPasswordChange}
                >
                  <FiEyeOff
                    alt="password show/hide eye"
                    className="fi-login-eye"
                  />
                </span>
              ) : (
                <span
                  className="password-toggle"
                  onClick={handleShowPasswordChange}
                >
                  <FiEye alt="password show/hide eye" className="fi-login-eye" />
                </span>
              )}
            </div>
            <br />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button onClick={handleLogin} type="button" className="loginBttn">
            Zaloguj się
          </button>
        </div>
      </div>
    </div>
  );
}
