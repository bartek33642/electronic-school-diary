import React from "react";

export function Login(){
    return(
        <div className="login-form">
            Login: <input type="text" id="login" /> <br />
            Password: <input type="password" id="password" /><br />
            <button type="submit" className="loginBttn">Zaloguj się</button>
        </div>
    );
}