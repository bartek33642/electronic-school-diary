import React from "react";
import './Register.css';

export function RegisterTeacher(){
    return (
      <div className="register-form">
        <form action="/register-teacher" method="post">
        Adres e-mail: <input type="text" id="email" name="email"/> <br />
        Hasło: <input type="password" id="password-register" name="password"/> <br />
        Imię: <input type="text" name="first-name" id="first-name" /> <br />
        Nazwisko: <input type="text" name="last-name" id="last-name" /> <br />
        Czy aktywny: <input type="checkbox" name="active" id="active" /> <br />
        Szkoła: <select name="school" id="school">
            <option value="" name='option-school'></option>
        </select> <br />
        Specjalizacja: <input type="text" name="specialization" /> <br />
        <input type="submit" value="Zapisz"/>
        </form>
      </div>
    );
    
}