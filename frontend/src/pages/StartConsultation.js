import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function StartConsultation() {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [formData, setFormData] = useState({
        symptoms: '',
        examinationNotes: '',
        treatmentPlan: '',
        recommendedTests: '',
        prescription: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/react/appointments/${appointmentId}`, {
                    credentials: 'include'
                });

                if (res.ok) {
                    const data = await res.json();
                    setAppointment(data);
                } else {
                    setError('Unable to fetch appointment');
                }
            } catch (err) {
                console.error(err);
                setError('Something went wrong.');
            }
        };

        fetchAppointment();
    }, [appointmentId]);

    const handleChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:8080/api/react/doctors/consultation/complete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ appointmentId: parseInt(appointmentId), ...formData })
            });

            if (res.ok) {
                alert('Consultation submitted!');
                navigate('/doctor-home');
            } else {
                setError('Submission failed');
            }
        } catch (err) {
            console.error(err);
            setError('Server error during submission');
        }
    };

    // Common style for inputs and textareas to match height and padding
    const inputStyle = { height: '45px', fontSize: '1rem' };

    return (
        <>
            <Navbar />
            <div className="container py-5" style={{ maxWidth: '700px', minHeight: '80vh' }}>
                <h3 className="mb-2 text-primary fw-bold">
                    Consultation for {appointment?.patient?.fullName || 'Patient'}
                </h3>
                <p className="mb-4 text-secondary">
                    <strong>Date:</strong> {appointment?.appointmentDate || 'N/A'} &nbsp; | &nbsp; <strong>Time:</strong>{' '}
                    {appointment?.appointmentTime || 'N/A'}
                </p>

                {error && (
                    <div className="alert alert-danger text-center" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-3">
                        <label htmlFor="symptoms" className="form-label fw-semibold">
                            Symptoms <span className="text-danger">*</span>
                        </label>
                        <textarea
                            id="symptoms"
                            name="symptoms"
                            className="form-control"
                            style={{ ...inputStyle, resize: 'none' }}
                            required
                            onChange={handleChange}
                            value={formData.symptoms}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="examinationNotes" className="form-label fw-semibold">
                            Examination Notes <span className="text-danger">*</span>
                        </label>
                        <textarea
                            id="examinationNotes"
                            name="examinationNotes"
                            className="form-control"
                            style={{ ...inputStyle, resize: 'none' }}
                            required
                            onChange={handleChange}
                            value={formData.examinationNotes}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="treatmentPlan" className="form-label fw-semibold">
                            Treatment Plan
                        </label>
                        <textarea
                            id="treatmentPlan"
                            name="treatmentPlan"
                            className="form-control"
                            style={{ ...inputStyle, resize: 'none' }}
                            onChange={handleChange}
                            value={formData.treatmentPlan}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="recommendedTests" className="form-label fw-semibold">
                            Recommended Tests
                        </label>
                        <input
                            type="text"
                            id="recommendedTests"
                            name="recommendedTests"
                            className="form-control"
                            style={inputStyle}
                            onChange={handleChange}
                            value={formData.recommendedTests}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="prescription" className="form-label fw-semibold">
                            Prescription
                        </label>
                        <textarea
                            id="prescription"
                            name="prescription"
                            className="form-control"
                            style={{ ...inputStyle, resize: 'none' }}
                            onChange={handleChange}
                            value={formData.prescription}
                        />
                    </div>

                    <button type="submit" className="btn btn-success px-4">
                        Complete Consultation
                    </button>
                </form>

                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate('/doctor-home')}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </>
    );
}

export default StartConsultation;
