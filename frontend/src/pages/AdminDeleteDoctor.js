import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDeleteDoctor() {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/react/admin/AllDoctors")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch doctors");
                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setDoctors(data);
                } else {
                    console.error("Unexpected response:", data);
                    setError("Unexpected data format from server");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Error fetching doctors");
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/react/admin/delete-doctor/${id}`, {
            method: "PUT",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to delete");
                setDoctors((prev) => prev.filter((doc) => doc.id !== id));
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to delete doctor.");
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Deactivate Doctor</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {doctors.length === 0 ? (
                <p className="text-muted text-center">No doctors available.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {doctors.map((doc) => (
                            <tr key={doc.id}>
                                <td>{doc.fullName}</td>
                                <td>{doc.email}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(doc.id)}
                                    >
                                        Deactivate
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="d-flex justify-content-center">
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin-home')}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default AdminDeleteDoctor;
