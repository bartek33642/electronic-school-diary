// import React from "react";
// import "./Role.css";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from 'axios';

// export function Role() {
//     const [roles, setRoles] = useState([]);

//     useEffect(() => {
//         const token = localStorage.getItem('jwtToken');
//         if (token) {
//           axios.get('/getUserRoles', { headers: { Authorization: `Bearer ${token}` } })
//             .then((response) => {
//               const roles = response.data;
//               setRoles(roles); // Ustawianie roli w stanie komponentu.
//             })
//             .catch((error) => {
//               // Obsłużenine błędu.
//             });
//         }
//       }, []);

//     return(
//         <div className="role-container">
//             {roles.includes('admin') && <Link to="/admin">
//                 <button className="btnBoxRole">
//                 <div className="boxRole">
//                     <span className="roleName">
//                         Administrator
//                     </span>
//                     <span className="userName">
//                         Jan Kowalski
//                     </span>
//                 </div>
//                 </button>
//             </Link>}

//             {roles.includes('principal') && <Link to="/principal">
//                 <button className="btnBoxRole">
//                 <div className="boxRole">
//                     <span className="roleName">
//                         Dyrektor
//                     </span>
//                     <span className="userName">
//                         Jadwiga Kowalska
//                     </span>
//                 </div>
//                 </button>
//             </Link>}

//             {roles.includes('teacher') && <Link to="/teacher">
//                 <button className="btnBoxRole">
//                 <div className="boxRole">
//                     <span className="roleName">
//                         Nauczyciel
//                     </span>
//                     <span className="userName">
//                         Zofia Nowak
//                     </span>
//                 </div>
//                 </button>
//             </Link> }

//             {roles.includes('student') && <Link to="/student">
//                 <button className="btnBoxRole">
//                 <div className="boxRole">
//                     <span className="roleName">
//                         Uczeń
//                     </span>
//                     <span className="userName">
//                         Julian Kowalski
//                     </span>
//                 </div>
//                 </button>
//             </Link> }

//             {roles.includes('parent') && <Link to="/parent">
//                 <button className="btnBoxRole">
//                 <div className="boxRole">
//                     <span className="roleName">
//                         Rodzic
//                     </span>
//                     <span className="userName">
//                         uczeń: Julian Kowalski
//                     </span>
//                 </div>
//                 </button>
//             </Link> }

//         </div>
//     );
// }

//---------------------------------------------------------------

// import React from "react";
// import "./Role.css";
// import { Link } from "react-router-dom";
// // import { Observable } from 'rxjs';
// import { ajax } from 'rxjs/ajax';
// import { catchError, map } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { useState, useEffect } from "react";


// export function Role() {
//     const [roles, setRoles] = useState([]);
  
//     useEffect(() => {
//       const token = localStorage.getItem('jwtToken');
  
//       if (token) {
//         const roles$ = ajax.get('/getUserRoles', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
  
//         roles$
//           .pipe(
//             map((response) => response.response),
//             catchError((error) => {
//               // Obsłużenie błędu
//               console.error(error);
//               return of(null);             
//             })
//           )
//           .subscribe((data) => {
//             if (data !== null) {
//               setRoles(data); // Ustawianie roli w stanie komponentu.
//             }
//           });
//       }
//     }, []);
  
//     return (
//       <div className="role-container">
//         {/* {roles.includes('admin') && ( */}
//           <Link to="/admin">
//             <button className="btnBoxRole">
//               <div className="boxRole">
//                 <span className="roleName">Administrator</span>
//                 <span className="userName">Jan Kowalski</span>
//               </div>
//             </button>
//           </Link>
//         {/* )} */}
  
//         {roles.includes('principal') && (
//           <Link to="/principal">
//             <button className="btnBoxRole">
//               <div className="boxRole">
//                 <span className="roleName">Dyrektor</span>
//                 <span className="userName">Jadwiga Kowalska</span>
//               </div>
//             </button>
//           </Link>
//         )}
  
//         {roles.includes('teacher') && (
//           <Link to="/teacher">
//             <button className="btnBoxRole">
//               <div className="boxRole">
//                 <span className="roleName">Nauczyciel</span>
//                 <span className="userName">Zofia Nowak</span>
//               </div>
//             </button>
//           </Link>
//         )}
  
//         {roles.includes('student') && (
//           <Link to="/student">
//             <button className="btnBoxRole">
//               <div className="boxRole">
//                 <span className="roleName">Uczeń</span>
//                 <span className="userName">Julian Kowalski</span>
//               </div>
//             </button>
//           </Link>
//         )}
  
//         {roles.includes('parent') && (
//           <Link to="/parent">
//             <button className="btnBoxRole">
//               <div className="boxRole">
//                 <span className="roleName">Rodzic</span>
//                 <span className="userName">uczeń: Julian Kowalski</span>
//               </div>
//             </button>
//           </Link>
//         )}
//       </div>
//     );
//   }
  


import React, { useState, useEffect } from "react";
import "./Role.css";
import { Link } from "react-router-dom";
import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";

export function Role() {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const roles$ = ajax.get('/getUserRoles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      roles$
        .pipe(
          map((response) => response.response),
          catchError((err) => {
            // Obsługa błędu
            console.error(err);
            setError("Wystąpił błąd podczas pobierania ról użytkownika.");
            return of([]);
          })
        )
        .subscribe((data) => {
          setRoles(data); // Ustawienie ról w stanie komponentu
        });
    }
  }, []);

  return (
    <div className="role-container">
      {error && <div className="error-message">{error}</div>}
      
      {roles.includes('admin') && (
        <Link to="/admin">
          <button className="btnBoxRole">
            <div className="boxRole">
              <span className="roleName">Administrator</span>
              <span className="userName">Jan Kowalski</span>
            </div>
          </button>
        </Link>
      )}

      {roles.includes('principal') && (
        <Link to="/principal">
          <button className="btnBoxRole">
            <div className="boxRole">
              <span className="roleName">Dyrektor</span>
              <span className="userName">Jadwiga Kowalska</span>
            </div>
          </button>
        </Link>
      )}

      {roles.includes('teacher') && (
        <Link to="/teacher">
          <button className="btnBoxRole">
            <div className="boxRole">
              <span className="roleName">Nauczyciel</span>
              <span className="userName">Zofia Nowak</span>
            </div>
          </button>
        </Link>
      )}

      {roles.includes('student') && (
        <Link to="/student">
          <button className="btnBoxRole">
            <div className="boxRole">
              <span className="roleName">Uczeń</span>
              <span className="userName">Julian Kowalski</span>
            </div>
          </button>
        </Link>
      )}

      {roles.includes('parent') && (
        <Link to="/parent">
          <button className="btnBoxRole">
            <div className="boxRole">
              <span className="roleName">Rodzic</span>
              <span className="userName">uczeń: Julian Kowalski</span>
            </div>
          </button>
        </Link>
      )}
    </div>
  );
}
