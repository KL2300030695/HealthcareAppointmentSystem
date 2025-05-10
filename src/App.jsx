import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AllDoctors from './pages/AllDoctors';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorSchedule from './pages/DoctorSchedule';
import PatientRecords from './pages/PatientRecords';
import EarningsReport from './pages/EarningsReport';
import MedicalRecords from './pages/MedicalRecords';
import HealthTips from './pages/HealthTips';
import Prescriptions from './pages/Prescriptions';
import BookAppointment from './pages/BookAppointment';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Payment from './pages/payment';
import { isAuthenticated, getCurrentUser } from './utils/auth';
import './styles/backgrounds.css';
import MyAppointments from './pages/MyAppointments';

// Background component
const Background = () => {
  const location = useLocation();
  const path = location.pathname;
  
  let backgroundClass = 'home-background';
  
  if (path === '/') backgroundClass = 'home-background';
  else if (path.startsWith('/patient/dashboard')) backgroundClass = 'patient-dashboard-background';
  else if (path.startsWith('/doctor')) backgroundClass = 'doctor-dashboard-background';
  else if (path === '/patient/medical-records') backgroundClass = 'medical-records-background';
  else if (path === '/patient/health-tips') backgroundClass = 'health-tips-background';
  else if (path === '/patient/prescriptions') backgroundClass = 'prescriptions-background';
  else if (path === '/all-doctors') backgroundClass = 'all-doctors-background';
  else if (path === '/signin' || path === '/signup') backgroundClass = 'auth-background';
  else if (path.startsWith('/admin')) backgroundClass = 'admin-dashboard-background';

  return <div className={`page-background ${backgroundClass}`} />;
};

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles) {
    const user = getCurrentUser();
    if (!allowedRoles.includes(user.type)) {
      return <Navigate to="/" />;
    }
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Background />
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/all-doctors" element={<AllDoctors />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
          <Route path="/payment" element={<Payment />} />

          {/* Protected routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div>Admin Dashboard (Coming Soon)</div>
              </ProtectedRoute>
            }
          />
          
          {/* Doctor routes */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/schedule"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorSchedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/patients"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <PatientRecords />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/earnings"
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <EarningsReport />
              </ProtectedRoute>
            }
          />

          {/* Patient routes */}
          <Route
            path="/patient"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/medical-records"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <MedicalRecords />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/health-tips"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <HealthTips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/prescriptions"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Prescriptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/appointments"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <MyAppointments />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
