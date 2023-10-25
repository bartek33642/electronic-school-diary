import React from "react";
import './Register.css';

export function RegisterAdmin(){
    return (
      <div className="register-form">
        <form action="/register-admin" method="post">
        Adres e-mail: <input type="text" id="email" name="email"/> <br />
        Hasło: <input type="password" id="password-register" name="password"/> <br />
        Imię: <input type="text" name="first-name" id="first-name" /> <br />
        Nazwisko: <input type="text" name="last-name" id="last-name" /><br />
        Czy aktywny: <input type="checkbox" name="active" id="active" />  <br />
        <input type="submit" value="Zapisz" />
        </form>
      </div>
    );
    
}