import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function DoctorViewAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://localhost:8080/api/react/doctors/appointments', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data);
                } else if (response.status === 401) {
                    navigate('/doctor-login');
                } else {
                    setError('Failed to load appointments');
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
                <h3 className="text-primary fw-bold mb-4 text-center">My Scheduled Appointments</h3>

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
                                <th scope="col" style={{ width: '5%' }}>#</th>
                                <th scope="col" style={{ width: '30%' }}>Patient Name</th>
                                <th scope="col" style={{ width: '20%' }}>Date</th>
                                <th scope="col" style={{ width: '20%' }}>Time</th>
                                <th scope="col" style={{ width: '25%' }}>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {appointments.map((appt, index) => (
                                <tr key={appt.id || index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{appt.patient?.fullName || 'N/A'}</td>
                                    <td>{appt.appointmentDate}</td>
                                    <td>{appt.appointmentTime}</td>
                                    <td>
                                            <span
                                                className={`badge ${
                                                    appt.status?.toLowerCase() === 'confirmed'
                                                        ? 'bg-success'
                                                        : appt.status?.toLowerCase() === 'pending'
                                                            ? 'bg-warning text-dark'
                                                            : 'bg-secondary'
                                                }`}
                                            >
                                                {appt.status}
                                            </span>
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

export default DoctorViewAppointments;
