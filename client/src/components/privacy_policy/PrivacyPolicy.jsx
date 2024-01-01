import React from "react";
import "./PrivacyPolicy.css";
import { Footer } from "../footer/Footer";

export function PrivacyPolicy() {
  return (
    <>
      <div className="privacy-policy-container">
        <div className="privacy-policy-elements">
          <h1>Polityka prywatności</h1>

          <p>
            W naszej aplikacji dziennika elektronicznego dla szkół, dbamy o
            ochronę prywatności naszych użytkowników. Poniżej przedstawiamy
            naszą politykę prywatności:
            <ol>
              <li>
                {" "}
                <b>Dane osobowe:</b> Gromadzimy tylko niezbędne dane osobowe, takie jak
                imię, nazwisko, adres e-mail, numer telefonu, które są niezbędne
                do świadczenia usług związanych z naszą aplikacją dziennika
                elektronicznego. Nie udostępniamy tych danych osobowych osobom
                trzecim bez wyraźnej zgody użytkownika, chyba że jest to
                wymagane przez prawo.
              </li>
              <li>
                {" "}
                <b>Bezpieczeństwo danych:</b> Stosujemy odpowiednie środki techniczne i
                organizacyjne, aby chronić dane osobowe naszych użytkowników
                przed nieuprawnionym dostępem, utratą, zmianą lub nieuprawnionym
                ujawnieniem. Regularnie przeglądamy nasze procedury
                bezpieczeństwa, aby zapewnić ochronę danych.
              </li>
              <li>
                {" "}
                <b>Wykorzytywanie danych:</b> Dane osobowe użytkowników są
                wykorzystywane wyłącznie, w celu świadczenia usług związanych z
                naszą aplikacją dziennika elektronicznego, takich jak
                udostępnianie informacji o ocenach, frekwencji, planach lekcji
                itp. Nie wykorzystujemy tych danych w celach marketingowych bez
                wyraźnej zgody użytkownika.
              </li>
              <li>
                {" "}
                <b>Pliki cookie:</b> Nasza aplikacja może korzystać z plików cookie, w
                celu poprawy funkcjonalności oraz dostosowania treści do
                preferencji użytkowników. Pliki cookie są małymi plikami
                tekstowymi przechowywanymi na urządzeniu użytkownika. Użytkownik
                ma możliwość zarządzania ustawieniami dotyczącymi plików cookie
                w przeglądarce internetowej.
              </li>
              <li>
                {" "}
                <b>Zewnętrzne linki:</b> Nasza aplikacja może zawierać linki do
                zewnętrznych stron internetowych. NIE ponosimy odpowiedzialności
                za politykę prywatności ani treść tych stron.
              </li>
            </ol>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
