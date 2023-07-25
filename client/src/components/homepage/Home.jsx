import React from "react";
import myImage from '../../images/students.png';
import '../homepage/Home.css';
import { Footer } from "../footer/Footer";


export function Home(){
    return(
        <div className="container">
             <h3>Elektroniczny dziennik</h3> 
            <div className="image">
                <img src={myImage} alt="boy-student" className="img-student"/> 
            </div>
            <div className="content">
                <p>Witamy na stronie głównej aplikacji Elektroniczny dziennik dla szkół</p>
                <p>Zacznij korzystać z aplikacji. Zaloguj się</p>
                <a href="/login"><button className="bttn-login-homepage">
                    Zaloguj się
                </button></a>
            </div>
            <Footer/>
        </div>
    );
}