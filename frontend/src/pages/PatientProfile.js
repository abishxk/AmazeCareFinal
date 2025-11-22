import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ViewPatientProfile() {
    const [patient, setPatient] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/react/patients/me', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setPatient(data))
            .catch(err => console.error(err));
    }, []);

    if (!patient) {
        return <div className="text-center fs-4 mt-5 text-muted">Loading...</div>;
    }

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="card-title text-center text-primary mb-4">Patient Profile</h2>
                <div className="card-body">
                    <p><strong>Full Name:</strong> {patient.fullName}</p>
                    <p><strong>Email:</strong> {patient.email}</p>
                    <p><strong>Mobile:</strong> {patient.mobileNumber}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Date of Birth:</strong> {patient.dob}</p>
                    <p><strong>Address:</strong> {patient.address}</p>

                    <div className="row mt-4">
                        <div className="col-6">
                            <button
                                onClick={() => navigate('/edit-profile')}
                                className="btn btn-success w-100"
                            >
                                Edit Profile
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                onClick={() => navigate('/confirm-delete-patient')}
                                className="btn btn-danger w-100"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-3">
                        <button
                            onClick={() => navigate('/patient-home')}
                            className="btn btn-secondary"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPatientProfile;
