import React, { useState } from "react";
import "./Login.css"
import imageEducation from "../../images/education.svg"

export function Login(){
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordChange = () => {
      setShowPassword(!showPassword);
    };

    return(
        <div className="login-form">
            <div className="login-content">
                <div className="left-login-content">
                    <img src={imageEducation} className="image-login" alt="Education" />
                </div>
                    <div className="right-login-content">
                    <h3 className="h3-login">Logowanie</h3>
                    <p className="p-login">Zaloguj się do aplikacji e-dziennik</p>
                
                E-mail: <input type="email" id="login" /> <br />
                Hasło: <input type={showPassword ? "text" : "password" } id="password" /><br />
                Pokaż hasło: <input type="checkbox" id="showPassword" onChange={handleShowPasswordChange} checked={showPassword}/><br />
                <button type="submit" className="loginBttn"><a href="/role" className="loginA">Zaloguj się</a></button><br />

                <a href="/" id="forgotPassword">Zapomniałem hasła</a>
                </div>
            </div>
        </div>
    );
}