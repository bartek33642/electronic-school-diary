// Login.jsx
import React, { useState } from "react";
import "./Login.css";
import imageEducation from "../../images/education.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { useNavigate } from "react-router-dom";
// Utwórz obiekt historii

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const Navigate = useNavigate ()

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const loginData = { email, password };

    const login$ = ajax.post("http://localhost:3001/login", loginData, {
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
        console.log(data);
        if (data) {
          
          console.log("Token: ", data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userEmail", email); // Dodaj to, aby przechować e-mail w Local Storage
          Navigate("/role");
          window.location.reload(); 
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
