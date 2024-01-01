import React from "react";
import './Contact.css';
import { Footer } from "../footer/Footer";

export function Contact() {
    return(
        <>
        <div className="contact-container">
            <div className="contact-elements">
            <h1>Kontakt</h1>

            <p><b>Adres email:</b> <a href="mailto:example@example.com" className="contact-mail">example@example.com</a></p>
            <p><b>Kontakt telefoniczny:</b> <a href="tel:+48000000000" className="contact-phone">(+48) 000-000-000</a></p> 
            <p><b>Adres:</b> ul. Przykładowa 123, 00-000 Przykładowo</p>
            <p><b>Godziny pracy działu kontaktowego:</b> poniedziałek - piątek, 8:00 - 16:00</p>
            </div>
            
        </div>
        <Footer />
        </>
    );
}