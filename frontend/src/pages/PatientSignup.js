import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from "react";

const PatientSignup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        gender: '',
        mobileNumber: '',
        email: '',
        password: '',
        address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleReset = () => {
        setFormData({
            fullName: '',
            dob: '',
            gender: '',
            mobileNumber: '',
            email: '',
            password: '',
            address: '',
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/react/patients/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to register patient");
            }
            const result = await response.json();
            alert("Patient registered!");
            navigate("/login");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        localStorage.removeItem('patient');
        localStorage.removeItem('doctor');
        localStorage.removeItem('admin');
    }, []);

    return (
        <>
            <Navbar />
            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    backgroundImage: "url('/images/hero-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    paddingTop: '60px'
                }}
            >
                <div className="bg-white bg-opacity-75 p-5 rounded shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
                    <h3 className="text-center mb-4 fw-bold text-primary">Patient Registration</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input type="text" className="form-control" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input type="date" className="form-control" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label d-block">Gender</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required />
                                <label className="form-check-label">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} required />
                                <label className="form-check-label">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleChange} required />
                                <label className="form-check-label">Other</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <input type="tel" className="form-control" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" name="address" placeholder="Address" rows="3" value={formData.address} onChange={handleChange} required></textarea>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary w-50 me-2">
                                <i className="bi bi-person-plus-fill me-1"></i> Sign Up
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

export default PatientSignup;
