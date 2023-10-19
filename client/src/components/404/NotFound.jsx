import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css';
import ErrorImage  from "../../images/error.png";


export function NotFound(){
    return(
        <div className="view-404">
            <h2 className="h2-404">Strona nie istnieje</h2><br />
            <img src={ErrorImage} alt='Error 404' className="img-404" />
            
            <button type="button" className="button-404" ><Link to="/" className="button-404-text">Wróć na stronę główną</Link></button>
        </div>
    );
}
