import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function DoctorHome() {
    const navigate = useNavigate();
    const doctor = JSON.parse(localStorage.getItem("doctor"));

    if (!doctor) return null; // Optional: avoid rendering if no doctor found

    return (
        <>
            <Navbar />
            <div className="container py-5" style={{ minHeight: '80vh' }}>
                <div className="text-center mb-5">
                    <h2 className="text-primary fw-bold">Welcome, Dr. {doctor.fullName} 👨‍⚕️</h2>
                    <p className="lead text-secondary">Here’s what you can do today</p>
                </div>

                <div className="row g-4">
                    {/* View Appointments */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow rounded-4 bg-primary text-white">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title fw-semibold">View Appointments</h5>
                                <p className="card-text mb-4">Check your scheduled patient appointments</p>
                                <button
                                    onClick={() => navigate('/doctor-view-appointments')}
                                    className="btn btn-light mx-auto px-4"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Conduct Consultation */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow rounded-4 bg-success text-white">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title fw-semibold">Conduct Consultation</h5>
                                <p className="card-text mb-4">Review and consult scheduled patients</p>
                                <button
                                    onClick={() => navigate('/conduct-consultation')}
                                    className="btn btn-light mx-auto px-4"
                                >
                                    Start
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Update Medical Records */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow rounded-4 bg-info text-white">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title fw-semibold">Update Medical Records</h5>
                                <p className="card-text mb-4">Add/update treatment details after consultation</p>
                                <button
                                    onClick={() => navigate('/update-medical-records')}
                                    className="btn btn-light mx-auto px-4"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Prescribe Medications */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow rounded-4 bg-warning text-white">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title fw-semibold">Prescribe Medications</h5>
                                <p className="card-text mb-4">Write and send prescriptions for patients</p>
                                <button
                                    onClick={() => navigate('/prescribe-medications')}
                                    className="btn btn-light mx-auto px-4"
                                >
                                    Prescribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorHome;
