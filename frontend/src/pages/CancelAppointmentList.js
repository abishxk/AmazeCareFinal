import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CancelAppointmentList = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/react/appointments/patient', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    const upcoming = data.filter(appt => appt.status === 'scheduled');
                    setAppointments(upcoming);
                } else if (response.status === 401) {
                    navigate('/patient-login');
                } else {
                    setError('Unable to fetch appointments');
                }
            } catch (err) {
                console.error(err);
                setError('Something went wrong');
            }
        };

        fetchAppointments();
    }, [navigate]);

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h3>Cancel Appointment</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                {appointments.length === 0 ? (
                    <div className="alert alert-info">You have no scheduled appointments to cancel.</div>
                ) : (
                    <table className="table table-bordered">
                        <thead className="table-dark">
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Doctor</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.map(appt => (
                            <tr key={appt.id}>
                                <td>{appt.appointmentDate}</td>
                                <td>{appt.appointmentTime}</td>
                                <td>{appt.doctor?.fullName || 'N/A'}</td>
                                <td>{appt.status}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => navigate(`/cancel-summary/${appt.id}`)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                <button className="btn btn-secondary mt-3" onClick={() => navigate('/patient-home')}>
                    Back to Home
                </button>
            </div>
        </>
    );
};

export default CancelAppointmentList;
