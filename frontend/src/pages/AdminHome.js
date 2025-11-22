import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminHome = () => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        } else {
            navigate("/admin-login"); // redirect if not logged in
        }
    }, [navigate]);

    if (!admin) return null;

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="text-center mb-4">
                    <h2>Welcome, {admin.name} 👋</h2>
                    <p className="lead text-secondary">What would you like to manage today?</p>
                </div>

                <div className="row g-4">
                    {/* Manage Patients */}
                    <div className="col-md-6">
                        <div className="card text-white bg-primary h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Manage Patients</h5>
                                <p className="card-text">View and manage registered patients</p>
                                <button onClick={() => navigate('/admin-manage-patients')} className="btn btn-light">View</button>
                            </div>
                        </div>
                    </div>

                    {/* Manage Doctors */}
                    <div className="col-md-6">
                        <div className="card text-white bg-success h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Manage Doctors</h5>
                                <p className="card-text">Add or update doctor profiles</p>
                                <button onClick={() => navigate('/admin-manage-doctors')} className="btn btn-light">Manage</button>
                            </div>
                        </div>
                    </div>

                    {/* Create Doctor */}
                    <div className="col-md-6">
                        <div className="card text-white bg-dark h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Create Doctor</h5>
                                <p className="card-text">Add a new doctor profile to the system</p>
                                <button onClick={() => navigate('/admin-create-doctor')} className="btn btn-light">Create</button>
                            </div>
                        </div>
                    </div>

                    {/* Delete Doctor */}
                    <div className="col-md-6">
                        <div className="card text-white bg-warning h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Delete Doctor</h5>
                                <p className="card-text">Remove an existing doctor profile</p>
                                <button onClick={() => navigate('/admin-delete-doctor')} className="btn btn-light">Delete</button>
                            </div>
                        </div>
                    </div>

                    {/* Manage Appointments */}
                    <div className="col-md-6">
                        <div className="card text-white bg-info h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Manage Appointments</h5>
                                <p className="card-text">View all appointments and statuses</p>
                                <button onClick={() => navigate('/admin-manage-appointments')} className="btn btn-light">Manage</button>
                            </div>
                        </div>
                    </div>

                    {/* Inactive Users */}
                    <div className="col-md-6">
                        <div className="card text-white bg-danger h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Manage Inactive Users</h5>
                                <p className="card-text">View and manage deactivated users</p>
                                <button onClick={() => navigate("/admin-inactive-users")} className="btn btn-light">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;
