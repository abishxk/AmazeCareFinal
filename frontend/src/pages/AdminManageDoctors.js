import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminManageDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/react/doctors/all", {
                credentials: "include",
            });
            const data = await res.json();
            setDoctors(data);
        } catch (err) {
            console.error("Error fetching doctors:", err);
        }
    };

    const handleEditClick = (doctor) => {
        setEditingId(doctor.id);
        setFormData({ ...doctor });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({});
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleSave = async () => {
        try {
            const {
                fullName,
                specialty,
                designation,
                email,
                experienceYears,
                qualification,
                isActive
            } = formData;

            const updatedDoctor = {
                fullName,
                specialty,
                designation,
                email,
                experienceYears,
                qualification,
                isActive
            };

            const res = await fetch(`http://localhost:8080/api/react/doctors/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(updatedDoctor)
            });

            if (res.ok) {
                alert("Doctor updated successfully!");
                setEditingId(null);
                await fetchDoctors();
            } else {
                alert("Failed to update doctor.");
            }
        } catch (err) {
            console.error("Error updating doctor:", err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h3 className="text-center mb-4">Manage Doctors</h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-info text-center">
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Designation</th>
                            <th>Experience</th>
                            <th>Qualification</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {doctors.map((doctor, index) => (
                            <tr key={doctor.id}>
                                <td className="text-center">{index + 1}</td>
                                <td>
                                    {editingId === doctor.id ? (
                                        <input
                                            name="fullName"
                                            value={formData.fullName || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    ) : doctor.fullName}
                                </td>
                                <td>
                                    {editingId === doctor.id ? (
                                        <input
                                            name="email"
                                            value={formData.email || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    ) : doctor.email}
                                </td>
                                <td>
                                    {editingId === doctor.id ? (
                                        <input
                                            name="specialty"
                                            value={formData.specialty || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    ) : doctor.specialty}
                                </td>
                                <td>
                                    {editingId === doctor.id ? (
                                        <input
                                            name="designation"
                                            value={formData.designation || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    ) : doctor.designation}
                                </td>
                                <td>
                                    {editingId === doctor.id ? (
                                        <input
                                            name="experienceYears"
                                            type="number"
                                            value={formData.experienceYears || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    ) : doctor.experienceYears}
                                </td>
                                <td>
                                    {editingId === doctor.id ? (
                                        <input
                                            name="qualification"
                                            value={formData.qualification || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    ) : doctor.qualification}
                                </td>
                                <td className="text-center">
                                    {editingId === doctor.id ? (
                                        <div className="d-flex justify-content-center gap-2">
                                            <button onClick={handleSave} className="btn btn-sm btn-success">
                                                Save
                                            </button>
                                            <button onClick={handleCancelEdit} className="btn btn-sm btn-secondary">
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleEditClick(doctor)}
                                            className="btn btn-sm btn-warning"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {doctors.length === 0 && (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    No doctors found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="text-center mt-4">
                    <button onClick={() => navigate("/admin-home")} className="btn btn-secondary">
                        Back to Home
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminManageDoctors;
