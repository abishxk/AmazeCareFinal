import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminManagePatients = () => {
    const [patients, setPatients] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/react/patients/all", {
                credentials: "include",
            });
            if(res.ok) {
                const data = await res.json();
                setPatients(data);
            } else {
                setError('Failed to fetch patients');
            }
        } catch (err) {
            console.error("Error fetching patients:", err);
            setError('Error fetching patients');
        }
    };

    const handleEditClick = (patient) => {
        setEditingId(patient.id);
        setFormData({ ...patient });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/react/patients/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("Patient updated successfully!");
                setEditingId(null);
                fetchPatients();
            } else {
                alert("Failed to update patient.");
            }
        } catch (err) {
            console.error("Error updating patient:", err);
        }
    };

    // Toggle active/inactive status
    const toggleStatus = async (patient) => {
        try {
            const updatedPatient = { ...patient, isActive: !patient.isActive };
            const res = await fetch(`http://localhost:8080/api/react/patients/${patient.id}/status`, {
                method: "PATCH",  // or PUT if you prefer
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ isActive: updatedPatient.isActive }),
            });

            if (res.ok) {
                // Update UI immediately
                setPatients((prev) =>
                    prev.map((p) => (p.id === patient.id ? updatedPatient : p))
                );
            } else {
                alert("Failed to update status.");
            }
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h3 className="text-center mb-4 fw-bold text-primary">Manage Patients</h3>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="table-responsive shadow rounded border">
                    <table className="table table-bordered table-hover align-middle mb-0">
                        <thead className="table-primary text-center">
                        <tr>
                            <th style={{ width: "3%" }}>#</th>
                            <th style={{ width: "15%" }}>Full Name</th>
                            <th style={{ width: "8%" }}>Gender</th>
                            <th style={{ width: "10%" }}>DOB</th>
                            <th style={{ width: "18%" }}>Email</th>
                            <th style={{ width: "12%" }}>Mobile</th>
                            <th style={{ width: "15%" }}>Address</th>
                            <th style={{ width: "15%" }}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {patients.length > 0 ? (
                            patients.map((patient, index) => (
                                <tr key={patient.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td>
                                        {editingId === patient.id ? (
                                            <input
                                                name="fullName"
                                                value={formData.fullName || ""}
                                                onChange={handleChange}
                                                className="form-control form-control-sm"
                                            />
                                        ) : (
                                            patient.fullName
                                        )}
                                    </td>
                                    <td className="text-center">
                                        {editingId === patient.id ? (
                                            <select
                                                name="gender"
                                                value={formData.gender || ""}
                                                onChange={handleChange}
                                                className="form-select form-select-sm"
                                            >
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        ) : (
                                            patient.gender
                                        )}
                                    </td>
                                    <td className="text-center">
                                        {editingId === patient.id ? (
                                            <input
                                                type="date"
                                                name="dob"
                                                value={formData.dob || ""}
                                                onChange={handleChange}
                                                className="form-control form-control-sm"
                                            />
                                        ) : (
                                            patient.dob
                                        )}
                                    </td>
                                    <td>
                                        {editingId === patient.id ? (
                                            <input
                                                name="email"
                                                value={formData.email || ""}
                                                onChange={handleChange}
                                                className="form-control form-control-sm"
                                            />
                                        ) : (
                                            patient.email
                                        )}
                                    </td>
                                    <td>
                                        {editingId === patient.id ? (
                                            <input
                                                name="mobileNumber"
                                                value={formData.mobileNumber || ""}
                                                onChange={handleChange}
                                                className="form-control form-control-sm"
                                            />
                                        ) : (
                                            patient.mobileNumber
                                        )}
                                    </td>
                                    <td>
                                        {editingId === patient.id ? (
                                            <input
                                                name="address"
                                                value={formData.address || ""}
                                                onChange={handleChange}
                                                className="form-control form-control-sm"
                                            />
                                        ) : (
                                            patient.address
                                        )}
                                    </td>

                                    <td className="text-center">
                                        {editingId === patient.id ? (
                                            <>
                                                <button
                                                    onClick={handleSave}
                                                    className="btn btn-sm btn-success me-2"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="btn btn-sm btn-secondary"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleEditClick(patient)}
                                                className="btn btn-sm btn-warning"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-3">
                                    No patients found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate("/admin-home")}
                        className="btn btn-secondary px-4"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminManagePatients;
