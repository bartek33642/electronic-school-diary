import React from "react";

export function RegisterAdmin(){
    return (
      <div className="register-form">
        Login: <input type="text" id="login" /> <br />
        Password: <input type="password" id="password" />
        <br />
        Wybór roli:
        <select name="role" id="role">
          <option value="admin">Admin</option>
          <option value="principal">Dyrektor</option>
          <option value="teacher">Nauczyciel</option>
          <option value="student">Uczeń</option>
          <option value="parent">Rodzic</option>
        </select><br />
        <div>
            Wybór klasy ucznia:
            <select name="student-class">
                <option value=""></option>
            </select><br/>
            Imię i nazwisko ucznia
            <select name="student-name">
                <option value=""></option>
            </select><br/>
            <button type="submit" className="loginBttn">
            Zarejestruj użytkownika
            </button>
        </div>
      </div>
    );
    
}