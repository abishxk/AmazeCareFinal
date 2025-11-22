import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function DoctorConsultations() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:8080/api/react/doctors/today-appointments', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data);
                } else if (response.status === 401) {
                    navigate('/doctor-login');
                } else {
                    setError('Failed to load consultations');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Something went wrong. Please try again later.');
            }
        })();
    }, [navigate]);

    return (
        <>
            <Navbar />
            <div className="container py-5" style={{ maxWidth: '900px', minHeight: '80vh' }}>
                <h3 className="text-primary fw-bold mb-4 text-center">Today's Consultations</h3>

                {error && (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                )}

                {appointments.length === 0 ? (
                    <div className="alert alert-info text-center mt-3">
                        No appointments scheduled for today.
                    </div>
                ) : (
                    <div className="table-responsive shadow rounded">
                        <table className="table table-striped table-bordered align-middle mb-0">
                            <thead className="table-dark">
                            <tr>
                                <th style={{ width: '45%' }}>Patient</th>
                                <th style={{ width: '20%' }}>Time</th>
                                <th style={{ width: '15%' }}>Status</th>
                                <th style={{ width: '20%' }}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {appointments.map((a, index) => (
                                <tr key={a.id || index}>
                                    <td>{a.patient?.fullName || 'N/A'}</td>
                                    <td>{a.appointmentTime}</td>
                                    <td>
                                            <span
                                                className={`badge ${
                                                    a.status?.toLowerCase() === 'confirmed'
                                                        ? 'bg-success'
                                                        : a.status?.toLowerCase() === 'pending'
                                                            ? 'bg-warning text-dark'
                                                            : 'bg-secondary'
                                                }`}
                                            >
                                                {a.status}
                                            </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => navigate(`/doctor-consult/${a.id}`)}
                                        >
                                            Start Consultation
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="d-flex justify-content-center mt-4">
                    <button
                        className="btn btn-secondary px-4"
                        onClick={() => navigate('/doctor-home')}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </>
    );
}

export default DoctorConsultations;
