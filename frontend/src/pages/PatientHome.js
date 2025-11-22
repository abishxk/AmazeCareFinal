import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PatientHome = () => {
    const [patient, setPatient] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedPatient = localStorage.getItem("patient");
        if (storedPatient) {
            setPatient(JSON.parse(storedPatient));
        } else {
            navigate("/patient-login");
        }
    }, [navigate]);

    if (!patient) return null;

    return (
        <>
            <Navbar />
            <div className="container py-5" style={{ minHeight: '80vh' }}>
                <div className="text-center mb-5">
                    <h2 className="text-primary fw-bold">Welcome, {patient.fullName} 👋</h2>
                    <p className="lead text-secondary">What would you like to do today?</p>
                </div>

                <div className="row g-4">
                    {/* Schedule Appointment */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow rounded-4 bg-success text-white">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title fw-semibold">Schedule Appointment</h5>
                                <p className="card-text mb-4">Book a visit with a doctor</p>
                                <button
                                    onClick={() => navigate('/schedule-appointment')}
                                    className="btn btn-light mx-auto px-4"
                                >
                                    Schedule
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* View Appointments */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow rounded-4 bg-info text-white">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title fw-semibold">View Appointments</h5>
                                <p className="card-text mb-4">See your upcoming and past appointments</p>
                                <button
                                    onClick={() => navigate('/patient-view-appointments')}
                                    className="btn btn-light mx-auto px-4"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Medical History */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow rounded-4 bg-secondary text-white">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title fw-semibold">Medical History</h5>
                                <p className="card-text mb-4">Access your diagnosis and prescriptions</p>
                                <button
                                    onClick={() => navigate('/patient-medical-history')}
                                    className="btn btn-light mx-auto px-4"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cancel Appointment */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow rounded-4 bg-danger text-white">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title fw-semibold">Cancel Appointment</h5>
                                <p className="card-text mb-4">Cancel an upcoming appointment</p>
                                <button
                                    onClick={() => navigate('/cancel-appointment')}
                                    className="btn btn-light mx-auto px-4"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PatientHome;
