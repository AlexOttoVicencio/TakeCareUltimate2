import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Product from './pages/Product.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Faq from './pages/Faq.jsx';
import App from './App.jsx';
import ControlPanel from './pages/ControlPanel.jsx';
import PatientRegister from './pages/PatientRegister.jsx';
import PatientDailyReview from './pages/PatientDailyReview.jsx';
import PatientsList from './pages/PatientsList.jsx';
import PrivacyPolicy from './pages/privacyPolicy.jsx';
import AdminUsersControl from './pages/AdminUsersControl.jsx';
import AdminCreateUsers from './pages/AdminCreateUsers.jsx';
import AdminEditUsers from './pages/AdminEditUsers.jsx';
import LandingPage from './components/main/LandingPage.jsx';
import AdminPatientsControl from './pages/AdminPatientsControl.jsx';
import './index.css';

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const usuarioLogeado = () => {
    if (localStorage(token) != null) {
      setIsLoggedIn(true);
    }      
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product" element={<Product />} />
        <Route path="/register" element={<Register />} />
        {usuarioLogeado ? (
          <Route path="/login" element={<Navigate to="/cp" />} />
        ) : (
          <Route path="/login" element={<Login logeoCorrecto={usuarioLogeado} />} />
        )}
        <Route path="/faq" element={<Faq />} />
        {isLoggedIn ? (
          <Route path="/cp" element={<ControlPanel />} />
        ) : (
          <Route path="/cp" element={<Navigate to="/login" />} />
        )}
        <Route path="/signup-patient" element={<PatientRegister />} />
        <Route path="/patient-check" element={<PatientDailyReview />} />
        <Route path="/patients-list" element={<PatientsList />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/admin-users-control" element={<AdminUsersControl />} />
        <Route path="/admin-create-users" element={<AdminCreateUsers />} />
        <Route path="/admin-edit-users" element={<AdminEditUsers />} />
        <Route path="/admin-patients-control" element={<AdminPatientsControl />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);