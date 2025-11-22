import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function AdminManageAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAppointments();
    }, [navigate]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/react/admin/appointments', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setAppointments(data);
            } else if (response.status === 401) {
                navigate('/admin-login');
            } else {
                setError('Failed to load appointments');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Something went wrong. Please try again later.');
        }
    };

    const handleCancel = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/react/admin/appointments/${appointmentId}/cancel`, {
                method: 'PUT',
                credentials: 'include'
            });
            if (response.ok) {
                fetchAppointments();
            } else {
                alert('Failed to cancel appointment');
            }
        } catch (err) {
            console.error('Cancel error:', err);
            alert('Something went wrong while cancelling.');
        }
    };

    const handleUndo = async (appointmentId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/react/admin/appointments/${appointmentId}/undo`, {
                method: 'PUT',
                credentials: 'include'
            });
            if (response.ok) {
                fetchAppointments();
            } else {
                alert('Failed to undo cancel');
            }
        } catch (err) {
            console.error('Undo error:', err);
            alert('Something went wrong while undoing cancel.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="card shadow">
                    <div className="card-body">
                        <h3 className="card-title text-center mb-4">All Appointments</h3>

                        {error && <div className="alert alert-danger text-center">{error}</div>}

                        {appointments.length === 0 ? (
                            <div className="alert alert-warning text-center">No appointments found.</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead className="table-dark text-center">
                                    <tr>
                                        <th>Doctor</th>
                                        <th>Patient</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-center align-middle">
                                    {appointments.map((appt, index) => (
                                        <tr key={index}>
                                            <td>{appt.doctor?.fullName || 'N/A'}</td>
                                            <td>{appt.patient?.fullName || 'N/A'}</td>
                                            <td>{appt.appointmentDate}</td>
                                            <td>{appt.appointmentTime}</td>
                                            <td>
                                                    <span className={`badge ${appt.status === 'scheduled' ? 'bg-success' : 'bg-danger'}`}>
                                                        {appt.status}
                                                    </span>
                                            </td>
                                            <td>
                                                <button
                                                    className={`btn btn-sm me-2 ${appt.status === 'scheduled' ? 'btn-danger' : 'btn-outline-secondary disabled-btn'}`}
                                                    disabled={appt.status !== 'scheduled'}
                                                    onClick={() => handleCancel(appt.id)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className={`btn btn-sm ${appt.status === 'cancelled' ? 'btn-warning' : 'btn-outline-secondary disabled-btn'}`}
                                                    disabled={appt.status !== 'cancelled'}
                                                    onClick={() => handleUndo(appt.id)}
                                                >
                                                    Undo
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="text-center mt-4">
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate('/admin-home')}
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminManageAppointments;
