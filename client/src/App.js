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

function App() {
  return (

    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          {/* Do zmiany*/}
          <Route path="/register" element={<RegisterAdmin />} />
          <Route path="/admin" element={<AdminDashboard />} />



         
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;