import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from "react";

const AdminCreateDoctor = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        specialty: '',
        experienceYears: '',
        qualification: '',
        designation: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleReset = () => {
        setFormData({
            fullName: '',
            specialty: '',
            experienceYears: '',
            qualification: '',
            designation: '',
            email: '',
            password: '',
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/react/admin/DocRegister", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to register doctor");
            }

            alert("Doctor registered successfully!");
            navigate("/admin-manage-doctors");
        } catch (error) {
            console.error("Error:", error);
            alert("Registration failed. Email may already exist.");
        }
    };

    useEffect(() => {
        // Ensure only admins can access
        const admin = localStorage.getItem('admin');
        if (!admin) {
            navigate('/admin-login');
        }
    }, [navigate]);

    return (
        <>
            <Navbar />
            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    paddingTop: '60px'
                }}
            >
                <div className="bg-white bg-opacity-75 p-5 rounded shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
                    <h3 className="text-center mb-4 fw-bold text-success">Create New Doctor</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="specialty" placeholder="Specialty" value={formData.specialty} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="number" className="form-control" name="experienceYears" placeholder="Experience Years" value={formData.experienceYears} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-success w-50 me-2">
                                <i className="bi bi-person-plus-fill me-1"></i> Create
                            </button>
                            <button type="button" onClick={handleReset} className="btn btn-secondary w-50">
                                <i className="bi bi-x-circle-fill me-1"></i> Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminCreateDoctor;
