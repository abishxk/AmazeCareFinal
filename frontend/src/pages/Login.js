import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('admin');
        localStorage.removeItem('doctor');
        localStorage.removeItem('patient');
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/react/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const user = await response.json();

                switch (user.role) {
                    case "ADMIN":
                        localStorage.setItem("admin", JSON.stringify(user));
                        navigate("/admin-home");
                        break;
                    case "DOCTOR":
                        localStorage.setItem("doctor", JSON.stringify(user));
                        navigate("/doctor-home");
                        break;
                    case "PATIENT":
                        localStorage.setItem("patient", JSON.stringify(user));
                        navigate("/patient-home");
                        break;
                    default:
                        setError("Unknown role detected. Contact support.");
                }
            } else {
                const txt = await response.text();
                setError(txt || "Invalid credentials");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Please try again later.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="login-wrapper">
                <div className="login-card">
                    <h2>Welcome Back</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter email"
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter password"
                        />

                        <button type="submit">Login</button>
                    </form>
                    {error && <div className="error-msg">{error}</div>}
                </div>
            </div>
        </>
    );
}

export default Login;