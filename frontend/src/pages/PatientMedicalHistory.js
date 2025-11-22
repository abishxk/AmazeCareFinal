import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const PatientMedicalHistory = () => {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState('');
    const [selectedMeds, setSelectedMeds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/react/patients/medical-history', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setRecords(data);
                } else if (response.status === 401) {
                    navigate('/patient-login');
                } else {
                    setError('Failed to load medical history');
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Something went wrong. Please try again later.');
            }
        };

        fetchHistory();
    }, [navigate]);

    const openModal = (medications) => {
        setSelectedMeds(medications);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMeds([]);
    };

    // Format date nicely as "MM/DD/YYYY"
    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString();
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h3 className="mb-4">Medical History</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                {records.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-bordered align-middle">
                            <thead className="table-dark">
                            <tr>
                                <th style={{ width: '3%' }}>#</th>
                                <th style={{ width: '9%', whiteSpace: 'nowrap', textAlign: 'center' }}>Date</th>
                                <th style={{ width: '12%' }}>Doctor</th>
                                <th>Symptoms</th>
                                <th>Prescription</th>
                                <th>Examination Notes</th>
                                <th>Recommended Tests</th>
                                <th>Treatment Plan</th>
                                <th style={{ width: '10%' }}>Buy Medications</th>
                            </tr>
                            </thead>
                            <tbody>
                            {records.map((record, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                                        {formatDate(record.appointment?.appointmentDate)}
                                    </td>
                                    <td>{record.appointment?.doctor?.fullName || 'N/A'}</td>
                                    <td>{record.symptoms || '—'}</td>
                                    <td>{record.prescription || '—'}</td>
                                    <td>{record.examinationNotes || '—'}</td>
                                    <td>{record.recommendedTests || '—'}</td>
                                    <td>{record.treatmentPlan || '—'}</td>
                                    <td>
                                        {record.prescribedMedications && record.prescribedMedications.length > 0 ? (
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => openModal(record.prescribedMedications)}
                                            >
                                                Buy Now
                                            </button>
                                        ) : (
                                            <span>Link yet to be added</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No medical history found.</p>
                )}

                <button className="btn btn-secondary mt-3" onClick={() => navigate('/patient-home')}>
                    Back to Home
                </button>
            </div>

            {/* Bootstrap Modal */}
            {showModal && (
                <div className="modal show fade" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Prescribed Medications</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                {selectedMeds.map((med, idx) => (
                                    <div key={idx} className="mb-2">
                                        <strong>{med.name}</strong>
                                        <a
                                            href={med.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-primary ms-2"
                                        >
                                            Go to Link
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PatientMedicalHistory;
