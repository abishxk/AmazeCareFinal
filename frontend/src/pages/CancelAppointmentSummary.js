import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CancelAppointmentSummary = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/react/appointments/${appointmentId}`, {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setAppointment(data);
                } else {
                    setError('Appointment not found');
                }
            } catch (err) {
                console.error(err);
                setError('Something went wrong');
            }
        };

        fetchAppointment();
    }, [appointmentId]);

    const handleCancel = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/react/appointments/cancel/${appointmentId}`, {
                method: 'PUT',
                credentials: 'include',
            });
            if (response.ok) {
                alert('Appointment cancelled successfully.');
                navigate('/cancel-appointment');
            } else {
                alert('Failed to cancel appointment.');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h3>Appointment Summary</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                {appointment ? (
                    <table className="table table-bordered">
                        <tbody>
                        <tr><th>Date</th><td>{appointment.appointmentDate}</td></tr>
                        <tr><th>Time</th><td>{appointment.appointmentTime}</td></tr>
                        <tr><th>Doctor</th><td>{appointment.doctor?.fullName}</td></tr>
                        <tr><th>Specialty</th><td>{appointment.doctor?.specialty}</td></tr>
                        <tr><th>Status</th><td>{appointment.status}</td></tr>
                        </tbody>
                    </table>
                ) : (
                    !error && <p>Loading appointment details...</p>
                )}

                <div className="mt-3">
                    <button className="btn btn-danger me-2" onClick={handleCancel}>Cancel Appointment</button>
                    <button className="btn btn-secondary" onClick={() => navigate('/cancel-appointment')}>
                        Back
                    </button>
                </div>
            </div>
        </>
    );
};

export default CancelAppointmentSummary;
