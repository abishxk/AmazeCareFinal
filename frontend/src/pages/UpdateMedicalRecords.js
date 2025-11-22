import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function UpdateMedicalRecords() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompletedAppointments = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/react/doctors/completed-appointments', {
                    credentials: 'include',
                });

                if (res.ok) {
                    const data = await res.json();
                    setAppointments(data);
                } else if (res.status === 401) {
                    navigate('/doctor-login');
                } else {
                    setError('Failed to load appointments');
                }
            } catch (err) {
                console.error(err);
                setError('Something went wrong. Try again later.');
            }
        };

        fetchCompletedAppointments();
    }, [navigate]);

    return (
        <>
            <Navbar />
            <div className="container py-5" style={{ maxWidth: '900px', minHeight: '80vh' }}>
                <h3 className="text-primary fw-bold mb-4 text-center">Update Medical Records</h3>

                {error && (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                )}

                {appointments.length === 0 ? (
                    <p className="text-center text-muted fs-5">No appointments found.</p>
                ) : (
                    <div className="table-responsive shadow rounded">
                        <table className="table table-bordered align-middle mb-0">
                            <thead className="table-dark">
                            <tr>
                                <th style={{ width: '30%' }}>Patient</th>
                                <th style={{ width: '15%' }}>Date</th>
                                <th style={{ width: '15%' }}>Time</th>
                                <th style={{ width: '20%' }}>Status</th>
                                <th style={{ width: '20%' }}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {appointments.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.patient?.fullName || 'N/A'}</td>
                                    <td>{a.appointmentDate}</td>
                                    <td>{a.appointmentTime}</td>
                                    <td>{a.status}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => navigate(`/edit-medical-record/${a.id}`)}
                                        >
                                            Edit
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

export default UpdateMedicalRecords;
