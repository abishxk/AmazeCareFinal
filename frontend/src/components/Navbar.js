import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const patient = JSON.parse(localStorage.getItem('patient'));
    const doctor = JSON.parse(localStorage.getItem('doctor'));
    const admin = JSON.parse(localStorage.getItem('admin'));

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:8080/api/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }

        localStorage.removeItem('patient');
        localStorage.removeItem('doctor');
        localStorage.removeItem('admin');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <i className="bi bi-hospital me-2 fs-4"></i> AmazeCare Hospital
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center gap-2">
                        {patient && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/patient-home">
                                        <i className="bi bi-house-door-fill me-1"></i> Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/patient-profile">
                                        <i className="bi bi-person-circle me-1"></i> My Profile
                                    </Link>
                                </li>
                            </>
                        )}

                        {doctor && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/doctor-home">
                                        <i className="bi bi-house-door-fill me-1"></i> Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/doctor-profile">
                                        <i className="bi bi-person-circle me-1"></i> My Profile
                                    </Link>
                                </li>
                            </>
                        )}

                        {admin && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin-home">
                                        <i className="bi bi-house-door-fill me-1"></i> Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin-profile">
                                        <i className="bi bi-person-circle me-1"></i> My Profile
                                    </Link>
                                </li>
                            </>
                        )}

                        {(patient || doctor || admin) ? (
                            <li className="nav-item">
                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={handleLogout}
                                >
                                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        <i className="bi bi-house-door-fill me-1"></i> Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/patient-login">
                                        <i className="bi bi-box-arrow-in-right me-1"></i> Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/patient-signup">
                                        <i className="bi bi-person-plus-fill me-1"></i> Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
