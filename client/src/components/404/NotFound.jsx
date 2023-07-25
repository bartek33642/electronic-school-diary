import React from "react";
import { Link } from "react-router-dom";


export function NotFound(){
    return(
        <div className="view-404">
            <h1>404</h1>
            <h2>Strona nie istnieje</h2><br />
            <button type="button" ><Link to="/" className="button-404-text">Wróć na stronę główną</Link></button>
        </div>
    );
}
