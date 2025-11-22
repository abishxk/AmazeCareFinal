import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorProfile() {
    const [doctor, setDoctor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/react/doctors/me', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setDoctor(data))
            .catch(err => console.error(err));
    }, []);

    if (!doctor) {
        return <div className="text-center fs-4 mt-5 text-muted">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h2>Dr. {doctor.fullName}'s Profile</h2>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <p><strong>Email:</strong> {doctor.email}</p>
                            <p><strong>Specialty:</strong> {doctor.specialty}</p>
                            <p><strong>Qualification:</strong> {doctor.qualification}</p>
                            <p><strong>Designation:</strong> {doctor.designation}</p>
                            <p><strong>Experience:</strong> {doctor.experienceYears} years</p>

                            {/* Button Group */}
                            <div className="d-flex justify-content-center gap-3 mt-4">
                                <button
                                    className="btn btn-success px-4"
                                    onClick={() => navigate('/edit-doctor')}
                                >
                                    Edit Profile
                                </button>
                                <button
                                    className="btn btn-danger px-4"
                                    onClick={() => navigate('/confirm-delete')}
                                >
                                    Delete Account
                                </button>
                            </div>

                            <div className="d-flex justify-content-center mt-3">
                                <button
                                    className="btn btn-secondary px-4"
                                    onClick={() => navigate('/doctor-home')}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorProfile;
