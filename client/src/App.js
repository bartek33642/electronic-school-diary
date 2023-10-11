import React from 'react'
import "./App.css"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './components/homepage/Home';
import { Login } from './components/login/Login';
import { NotFound } from './components/404/NotFound';
import { RegisterAdmin } from './components/Register/RegisterAdmin';
import { AdminDashboard } from './components/dashboard/admin/AdminDashboard';
import { Role } from './components/role/Role';
import { AdminMarks } from '../src/components/marks/admin/AdminMarks';
import { ParentDashboard } from './components/dashboard/parent/ParentDasboard';

function App() {
  return (

    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          {/* Do zmiany dodać zabezpieczeni ścieżek*/}
          <Route path='/role' element={< Role/>} />
          <Route path="/register" element={<RegisterAdmin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/grades" element={<AdminMarks />} />
          <Route path="/parent" element={<ParentDashboard />} />


         
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;