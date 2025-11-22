import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ScheduleAppointment = () => {
    const [doctorList, setDoctorList] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        doctorId: '',
        appointmentDate: '',
        appointmentTime: ''
    });

    const navigate = useNavigate();
    const patient = JSON.parse(localStorage.getItem('patient'));

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/react/doctors/all');
                const data = await response.json();
                setDoctorList(data);
                setFilteredDoctors(data);
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = doctorList.filter(
            doc =>
                doc.fullName.toLowerCase().includes(value) ||
                doc.specialty.toLowerCase().includes(value)
        );
        setFilteredDoctors(filtered);
    };

    const handleSelectDoctor = (doctorId) => {
        setFormData(prev => ({ ...prev, doctorId }));
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const appointmentData = {
            ...formData,
            patientId: patient?.id
        };

        try {
            const response = await fetch('http://localhost:8080/api/react/appointments/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            });

            if (response.ok) {
                alert('Appointment scheduled successfully!');
                navigate('/patient-home');
            } else {
                alert('Failed to schedule appointment.');
            }
        } catch (error) {
            console.error('Error scheduling appointment:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div
                className="container py-5"
                style={{ maxWidth: '700px', minHeight: '80vh' }}
            >
                <h3 className="text-center text-primary fw-bold mb-4">
                    Schedule a New Appointment
                </h3>

                {/* Search Bar */}
                <input
                    type="text"
                    className="form-control mb-4 rounded-3"
                    placeholder="Search by name or specialty..."
                    value={searchTerm}
                    onChange={handleSearch}
                    aria-label="Search doctors"
                />

                {/* Doctor Cards */}
                <div className="row mb-4">
                    {filteredDoctors.length === 0 && (
                        <p className="text-center text-muted">No doctors found.</p>
                    )}
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="col-md-6 mb-3">
                            <div
                                className={`card h-100 shadow rounded-4 ${
                                    formData.doctorId === doctor.id ? 'border border-3 border-success' : ''
                                }`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSelectDoctor(doctor.id)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') handleSelectDoctor(doctor.id);
                                }}
                            >
                                <div className="card-body">
                                    <h5 className="card-title fw-semibold">{doctor.fullName}</h5>
                                    <p className="card-text text-muted">{doctor.specialty}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="doctorId" value={formData.doctorId} />

                    <div className="mb-3">
                        <label htmlFor="appointmentDate" className="form-label fw-semibold">
                            Appointment Date
                        </label>
                        <input
                            type="date"
                            className="form-control rounded-3"
                            id="appointmentDate"
                            name="appointmentDate"
                            value={formData.appointmentDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="appointmentTime" className="form-label fw-semibold">
                            Appointment Time
                        </label>
                        <input
                            type="time"
                            className="form-control rounded-3"
                            id="appointmentTime"
                            name="appointmentTime"
                            value={formData.appointmentTime}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-between">
                        <button
                            type="submit"
                            className="btn btn-success px-4"
                            disabled={!formData.doctorId}
                        >
                            Book Appointment
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary px-4"
                            onClick={() => navigate('/patient-home')}
                        >
                            Back to Home
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ScheduleAppointment;
