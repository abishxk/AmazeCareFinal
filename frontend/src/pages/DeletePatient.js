import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DeletePatient() {
    const [confirmed, setConfirmed] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [patientId, setPatientId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the currently logged-in patient
        fetch('http://localhost:8080/api/react/patients/me', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data?.id) {
                    setPatientId(data.id);
                } else {
                    alert("Unable to identify user. Please login again.");
                    navigate('/login');
                }
            })
            .catch(() => {
                alert("Server error while retrieving user info.");
                navigate('/login');
            });
    }, [navigate]);

    const handleDelete = () => {
        if (!patientId) {
            alert("User ID not found.");
            return;
        }

        fetch(`http://localhost:8080/api/react/patients/delete/${patientId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    setDeleted(true);
                } else {
                    alert('Something went wrong. Please try again.');
                }
            })
            .catch(() => {
                alert('Server error. Please try again later.');
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body text-center">
                            {!deleted ? (
                                <>
                                    <h3 className="text-danger mb-4">Are you sure you want to delete your account?</h3>
                                    <p className="mb-4">
                                        You cannot <strong>undo</strong> this action.
                                        <br />
                                        To reactivate your account in the future, please contact:
                                        <br />
                                        <strong>admin@amazecare.com</strong>
                                    </p>

                                    {!confirmed ? (
                                        <div className="d-flex justify-content-center gap-3">
                                            <button className="btn btn-danger px-4" onClick={() => setConfirmed(true)}>
                                                Yes, Delete
                                            </button>
                                            <button className="btn btn-secondary px-4" onClick={() => navigate('/patient-profile')}>
                                                No, Go Back
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-warning">This is your last confirmation. Proceed?</p>
                                            <div className="d-flex justify-content-center gap-3">
                                                <button className="btn btn-danger px-4" onClick={handleDelete}>
                                                    Confirm Delete
                                                </button>
                                                <button className="btn btn-secondary px-4" onClick={() => navigate('/patient-profile')}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <h4 className="text-success">Your account has been deleted.</h4>
                                    <p className="mt-3">
                                        If you change your mind and wish to restore your account, please email:
                                        <br />
                                        <strong>admin@amazecare.com</strong>
                                    </p>
                                    <button className="btn btn-primary mt-3 px-4" onClick={() => navigate('/')}>
                                        Return to Home
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeletePatient;
