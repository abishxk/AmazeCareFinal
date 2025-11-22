import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function EditMedicalRecord() {
    const { id } = useParams(); // appointmentId from the route
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        appointmentId: id,
        symptoms: '',
        examinationNotes: '',
        treatmentPlan: '',
        prescription: '',
        recommendedTests: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch existing medical record (if any)
    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/react/doctors/edit-medical-record/${id}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData({
                        appointmentId: id,
                        symptoms: data.symptoms || '',
                        examinationNotes: data.examinationNotes || '',
                        treatmentPlan: data.treatmentPlan || '',
                        prescription: data.prescription || '',
                        recommendedTests: data.recommendedTests || ''
                    });
                } else if (response.status === 401) {
                    navigate('/doctor-login');
                } else {
                    setError('Failed to load medical record.');
                }
            } catch (err) {
                setError('Something went wrong.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecord();
    }, [id, navigate]);

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/react/doctors/edit-medical-record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Medical record saved.');
                navigate('/update-medical-records');
            } else {
                setError('Failed to save medical record.');
            }
        } catch (err) {
            setError('Error while saving.');
        }
    };

    if (loading) return <div className="container mt-5">Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h3>Edit Medical Record</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="appointmentId" value={formData.appointmentId} />

                    <div className="mb-3">
                        <label>Symptoms</label>
                        <textarea className="form-control" name="symptoms" value={formData.symptoms} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label>Examination Notes</label>
                        <textarea className="form-control" name="examinationNotes" value={formData.examinationNotes} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label>Treatment Plan</label>
                        <textarea className="form-control" name="treatmentPlan" value={formData.treatmentPlan} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label>Prescription</label>
                        <textarea className="form-control" name="prescription" value={formData.prescription} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label>Recommended Tests</label>
                        <textarea className="form-control" name="recommendedTests" value={formData.recommendedTests} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-success">Save</button>
                </form>

                <button className="btn btn-secondary mt-3" onClick={() => navigate('/update-medical-records')}>
                    Back
                </button>
            </div>
        </>
    );
}

export default EditMedicalRecord;
