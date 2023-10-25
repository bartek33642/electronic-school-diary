import React from "react";
import './Register.css';

export function RegisterParent(){
    return (
      <div className="register-form">
        <form action="/register-parent" method="post">
        Adres e-mail: <input type="text" id="email" name="email"/> <br />
        Hasło: <input type="password" id="password-register" name="password"/> <br />
        Imię: <input type="text" name="first-name" id="first-name" /> <br />
        Nazwisko: <input type="text" name="last-name" id="last-name" /> <br />
        Czy aktywny: <input type="checkbox" name="active" id="active" /> <br />
        Szkoła: <select name="school-select" id="school">
            <option value="" name='option-school'></option>
        </select> <br />
        Uczeń: <select name="student-select" id="student-select" >
            <option value="" name='option-student'></option>
        </select> <br />
        Ulica: <input type="text" name="street" id="street" /> <br />
        Numer budynku: <input type="text" name="building_number" id="building_number" /> <br />
        Numer mieszknia: <input type="text" name="apartment_number" id="apartment_number" /> <br />
        Kod pocztowy: <input type="text" name="zip_code" id="zip_code" /> <br />
        Miejscowość: <input type="text" name="town" id="town"/> <br />
        Numer telefonu: <input type="text" name="phone_number" id="phone_number" /> <br />
        <input type="submit" value="Zapisz" />
        </form>
      </div>
    );
    
}