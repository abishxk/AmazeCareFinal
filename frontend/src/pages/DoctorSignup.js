import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from "react";

const DoctorSignup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        specialty: '',
        experienceYears: '',
        qualification: '',
        designation: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/react/doctors/doctor_register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to register doctor");
            }

            alert("Doctor registered!");
            navigate("/doctor-login");
        } catch (error) {
            console.error("Error:", error);
            alert("Email already exists or invalid data.");
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
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-sm-6">
                        <img src="/images/Hos.jpg" alt="AmazeCare Hospital" className="img img-thumbnail" />
                    </div>
                    <div className="col-sm-6">
                        <h3 className="mb-4">Doctor Registration</h3>
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
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary me-2">Sign Up</button>
                                <button type="button" onClick={handleReset} className="btn btn-danger">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DoctorSignup;
