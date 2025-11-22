import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PrescribeMedications = () => {
    const [appointments, setAppointments] = useState([]);
    const [medications, setMedications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [selectedAppointmentDetails, setSelectedAppointmentDetails] = useState(null);
    const [selectedMeds, setSelectedMeds] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Load completed appointments
    useEffect(() => {
        fetch('http://localhost:8080/api/react/doctors/unprescribed-appointments', {
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(data => setAppointments(data))
            .catch(() => setError('Failed to load appointments'));
    }, []);


    // Live medication search
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setMedications([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            fetch(`http://localhost:8080/api/react/medications/search?name=${searchTerm}`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => setMedications(data))
                .catch(() => setError('Failed to search medications'));
        }, 400); // debounce for typing

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Load appointment + medical record details
    useEffect(() => {
        if (!selectedAppointment) {
            setSelectedAppointmentDetails(null);
            return;
        }

        fetch(`http://localhost:8080/api/react/doctors/appointment-details/${selectedAppointment}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => setSelectedAppointmentDetails(data))
            .catch(() => setError('Failed to fetch appointment details'));
    }, [selectedAppointment]);

    const addMedication = (med) => {
        if (!selectedMeds.some(m => m.id === med.id)) {
            setSelectedMeds([...selectedMeds, med]);
        }
    };

    const removeMedication = (id) => {
        setSelectedMeds(prev => prev.filter(m => m.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedAppointment || selectedMeds.length === 0) {
            setError('Please select an appointment and at least one medication');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/api/react/doctors/prescribe-meds', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    appointmentId: selectedAppointment,
                    medications: selectedMeds.map(m => ({
                        id: m.id,
                        name: m.name,
                        url: m.url
                    }))
                })
            });

            if (res.ok) {
                alert('Medications prescribed successfully!');
                // Removed navigate('/doctor-home')
                // Instead, optionally reset form:
                setSelectedAppointment('');
                setSelectedAppointmentDetails(null);
                setSelectedMeds([]);
                setSearchTerm('');
                setMedications([]);

                // Reload unprescribed appointments
                const updatedAppointments = await fetch('http://localhost:8080/api/react/doctors/unprescribed-appointments', {
                    credentials: 'include'
                }).then(res => res.json());
                setAppointments(updatedAppointments);

            } else {
                setError('Failed to prescribe medications');
            }
        } catch {
            setError('Something went wrong');
        }
    };


    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h3>Prescribe Medications</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Select Appointment</label>
                        <select
                            className="form-select"
                            value={selectedAppointment}
                            onChange={(e) => setSelectedAppointment(e.target.value)}
                        >
                            <option value="">-- Select --</option>
                            {appointments.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.patient.fullName} | {a.appointmentDate} {a.appointmentTime}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Appointment and record summary */}
                    {selectedAppointmentDetails && (
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5>Appointment Summary</h5>
                                <p><strong>Patient:</strong> {selectedAppointmentDetails.appointment?.patient?.fullName}</p>
                                <p><strong>Date:</strong> {selectedAppointmentDetails.appointment?.date}</p>
                                <p><strong>Time:</strong> {selectedAppointmentDetails.appointment?.time}</p>
                                {selectedAppointmentDetails.medicalRecord && (
                                    <>
                                        <p><strong>Symptoms:</strong> {selectedAppointmentDetails.medicalRecord.symptoms}</p>
                                        <p><strong>Treatment Plan:</strong> {selectedAppointmentDetails.medicalRecord.treatmentPlan}</p>
                                        <p><strong>Prescription:</strong> {selectedAppointmentDetails.medicalRecord.prescription}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mb-3">
                        <label>Search Medications</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type medication name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {medications.length > 0 && (
                        <div className="mb-3">
                            <h6>Search Results:</h6>
                            <ul className="list-group">
                                {medications
                                    .filter((m) => m.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
                                    .map((m) => (

                                        <li
                                        key={m.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <span>
                                            <a href={m.url} target="_blank" rel="noopener noreferrer">{m.name}</a>
                                        </span>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-success"
                                            onClick={() => addMedication(m)}
                                        >
                                            Add
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {selectedMeds.length > 0 && (
                        <div className="mb-3">
                            <h6>Selected Medications:</h6>
                            <ul className="list-group">
                                {selectedMeds.map((m) => (
                                    <li
                                        key={m.id}
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                        <a href={m.url} target="_blank" rel="noopener noreferrer">{m.name}</a>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger"
                                            onClick={() => removeMedication(m.id)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary">
                        Prescribe
                    </button>
                </form>

                <button className="btn btn-secondary mt-3" onClick={() => navigate('/doctor-home')}>
                    Back to Home
                </button>
            </div>
        </>
    );
};

export default PrescribeMedications;
