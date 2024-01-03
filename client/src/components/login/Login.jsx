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
import { backendServer } from "../../config";


import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const Navigate = useNavigate ()

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const loginData = { email, password };

    const login$ = ajax.post(`${backendServer}/login`, loginData, {
      "Content-Type": "application/json",
    });

    login$
      .pipe(
        map((response) => response.response),
        catchError((error) => {
          console.error("Błąd logowania: ", error);
          // setError("Nieprawidłowa odpowiedź serwera.");
          setSnackbarSeverity("error");
          setSnackbarMessage("Błąd logowania");
          setSnackbarOpen(true);
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
          setSnackbarSeverity("success");
          setSnackbarMessage("Pomyślnie zalogowano.");
          setSnackbarOpen(true); 
          window.location.reload();
        }
      });
      
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePasswordOrEmailKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
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

          E-mail:
          <div className="input-label-login">
            <input
              type="email"
              id="login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handlePasswordOrEmailKeyPress}
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
                onKeyPress={handlePasswordOrEmailKeyPress}
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
          <button onClick={handleLogin} onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }} 
          type="button" className="loginBttn">
            Zaloguj się
          </button>
        </div>

        <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
      </Snackbar>

      </div>
    </div>
  );
}
