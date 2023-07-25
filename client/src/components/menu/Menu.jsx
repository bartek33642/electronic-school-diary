import React from "react";
import "./Menu.css";

export function Menu(){
    return (
      <div class="vertical-menu">

<ul>
        <li><a class="active" href="/">Home</a></li>
        <li><a href="/news">News</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/about">About</a></li>
  </ul>
      </div>
    );
}

// import React from 'react';
// import { Link, Route, Routes } from 'react-router-dom';
// import { Home } from '../homepage/Home';

// export function Menu() {
//     return (
//         <div style={{ display: 'flex' }}>
//       <div
//         style={{
//           width: '200px',
//           backgroundColor: 'navy',
//           color: 'white',
//           padding: '20px',
//         }}
//       >
//         <ul style={{ listStyleType: 'none', textDecoration: 'none', backgroundColor: 'navy', padding: 0 }}>
//           <li>
//             <Link to="/">Strona główna</Link>
//           </li>
//           <li>
//             <Link to="/users">Użytkownicy</Link>
//           </li>
//           <li>
//             <Link to="/classes">Klasy</Link>
//           </li>
//           <li>
//             <Link to="/grades">Oceny</Link>
//           </li>
//           <li>
//             <Link to="/schedule">Plan zajęć</Link>
//           </li>
//           <li>
//             <Link to="/attendance">Frekwencja</Link>
//           </li>
//           <li>
//             <Link to="/settings">Ustawienia</Link>
//           </li>
//         </ul>
//         <button style={{ marginBottom: '20px' }}>Wyloguj</button>
//       </div>
//       <div style={{ flex: 1, padding: '20px' }}>
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/users" element="" />
//                 <Route path="/classes" element="" />
//                 <Route path="/grades" element="" />
//                 <Route path="/schedule" element="" />
//                 <Route path="/attendance" element="" />
//                 <Route path="/settings" element="" />
//               </Routes>
//             </div>
//           </div>
//       );
//     };

    
   