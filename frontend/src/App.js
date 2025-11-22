import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import PatientSignup from './pages/PatientSignup';
import DoctorSignup from './pages/DoctorSignup';
import PatientHome from "./pages/PatientHome";
import ScheduleAppointment from "./pages/ScheduleAppointment";
import PatientViewAppointments from './pages/PatientViewAppointments';
import AdminHome from './pages/AdminHome';
import AdminManagePatients from "./pages/AdminManagePatients";
import AdminManageDoctors from "./pages/AdminManageDoctors";
import AdminInactiveUsers from "./pages/AdminInactiveUsers";
import PatientMedicalHistory from './pages/PatientMedicalHistory';
import CancelAppointmentList from './pages/CancelAppointmentList';
import CancelAppointmentSummary from './pages/CancelAppointmentSummary';
import DoctorHome from "./pages/DoctorHome";
import DoctorViewAppointments from "./pages/DoctorViewAppointments";
import DoctorConsultations from "./pages/DoctorConsultations";
import StartConsultation from "./pages/StartConsultation";
import UpdateMedicalRecords from './pages/UpdateMedicalRecords';
import EditMedicalRecord from "./pages/EditMedicalRecord";
import PrescribeMedications from './pages/PrescribeMedications';
import PatientProfile from "./pages/PatientProfile";
import AdminManageAppointments from "./pages/AdminManageAppointments";
import DoctorProfile from "./pages/DoctorProfile";
import DeletePatient from "./pages/DeletePatient";
import AdminCreateDoctor from "./pages/AdminCreateDoctor";
import AdminDeleteDoctor from "./pages/AdminDeleteDoctor";
import Login from "./pages/Login";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/patient-signup" element={<PatientSignup />} />
                <Route path="/doctor-signup" element={<DoctorSignup />} />
                <Route path="/patient-home" element={<PatientHome />} />
                <Route path="/doctor-home" element={<DoctorHome />} />
                <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
                <Route path="/patient-view-appointments" element={<PatientViewAppointments />} />
                <Route path="/doctor-view-appointments" element={<DoctorViewAppointments />} />
                <Route path="/conduct-consultation" element={<DoctorConsultations/>} />
                <Route path="/doctor-consult/:appointmentId" element={<StartConsultation />} />

                <Route path="/admin-home" element={<AdminHome />} />
                <Route path="/admin-manage-patients" element={<AdminManagePatients />} />
                <Route path="/admin-manage-doctors" element={<AdminManageDoctors />} />
                <Route path="/admin-inactive-users" element={<AdminInactiveUsers />} />
                <Route path="/patient-medical-history" element={<PatientMedicalHistory />} />
                <Route path="/cancel-appointment" element={<CancelAppointmentList />} />
                <Route path="/cancel-summary/:appointmentId" element={<CancelAppointmentSummary />} />
                <Route path="/update-medical-records" element={<UpdateMedicalRecords />} />
                <Route path="/edit-medical-record/:id" element={<EditMedicalRecord />} />
                <Route path="/prescribe-medications" element={<PrescribeMedications />} />
                <Route path="/patient-profile" element={<PatientProfile />} />
                <Route path="/confirm-delete-patient" element={<DeletePatient />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
                <Route path="/admin-manage-appointments" element={<AdminManageAppointments/>} />
                <Route path="/admin-create-doctor" element={<AdminCreateDoctor/>} />
                <Route path="/admin-delete-doctor" element={<AdminDeleteDoctor/>} />
            </Routes>
        </Router>
    );
}

export default App;
