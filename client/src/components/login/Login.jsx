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

import React, { useState } from "react";
import "./Login.css";
import imageEducation from "../../images/education.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios"; // Dodajemy bibliotekę Axios do obsługi żądań HTTP.

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    const email = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    try {
      // Wyślij żądanie logowania do serwera.
      const response = await axios.post("http://localhost:3001/REST/login", { email, password });

      if (response.data.token) {
        // Jeśli otrzymaliśmy token JWT w odpowiedzi, zachowujemy go w Local Storage.
        localStorage.setItem("jwtToken", response.data.token);

        // Przekieruj użytkownika do strony roli (na przykład /role).
        window.location.href = "/role";
      } else {
        console.error("Nieprawidłowa odpowiedź serwera.");
      }
    } catch (error) {
      console.error("Błąd logowania: ", error);
    }
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

          E-mail: <input type="email" id="login" /> <br />
          <div className="password-container">
            Hasło:
            <input
              type={showPassword ? "text" : "password"}
              id="password"
            />
            {showPassword ? (
              <span className="password-toggle" onClick={handleShowPasswordChange}>
                <FiEyeOff alt="password show/hide eye" className="fi-login-eye" />
              </span>
            ) : (
              <span className="password-toggle" onClick={handleShowPasswordChange}>
                <FiEye alt="password show/hide eye" className="fi-login-eye" />
              </span>
            )}
            <br />
          </div>
          <button
            onClick={handleLogin}
            type="button"
            className="loginBttn"
          >
            Zaloguj się
          </button>
        </div>
      </div>
    </div>
  );
}
