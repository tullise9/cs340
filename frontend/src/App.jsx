// Citation for the following function:
// Date: 11/05/2025
// Copied from /OR/ Adapted from /OR/ Based on:
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131

import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import BloodOrders from './pages/BloodOrders';
import Nurses from './pages/Nurses';
import Patients from './pages/Patients';
import SpecialRequirements from './pages/SpecialRequirements';
import PatientsBloodRequirements from './pages/PatientsBloodRequirements';


// Components
import Navigation from './components/Navigation';
import ChoosePatient from './components/ChoosePatient';
import CreateAppointment from './components/CreateAppointment';
import AddSpecialRequirement from './components/AddSpecialRequirement';
import CreateBloodOrder from './components/CreateBloodOrder';
import EditPatient from './components/EditPatient';


// Define the backend port and URL for API requests
const backendPort = 6391;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {
  const navigate = useNavigate()

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home backendURL={backendURL} />} />
        <Route path="/Appointments" element={<Appointments backendURL={backendURL} />} />
        <Route path="/Patients" element={<Patients backendURL={backendURL} />} />
        <Route path="/Nurses" element={<Nurses backendURL={backendURL} />} />
        <Route path="/BloodOrders" element={<BloodOrders backendURL={backendURL} />} />
        <Route path="/SpecialRequirements" element={<SpecialRequirements backendURL={backendURL} />} />
        <Route path="/PatientsBloodRequirements" element={<PatientsBloodRequirements backendURL={backendURL} />} />
        <Route path="/appointments/new" element={<ChoosePatient backendURL={backendURL} onSelect={(id) => navigate(`/appointments/new/${id}`)} />} />
        <Route path="/appointments/new/:patientId" element={<CreateAppointment backendURL={backendURL} />} />
        <Route path="/requirements/new:patientId" element={<AddSpecialRequirement backendURL={backendURL} />} />
        <Route path="/bloodorder/new" element={<CreateBloodOrder />} />
        <Route path="/EditPatient/:patientId" element={<EditPatient backendURL={backendURL} />} />





      </Routes>
    </>
  );

} export default App;
