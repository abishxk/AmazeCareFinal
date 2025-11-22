import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AdminInactiveUsers() {
    const [inactiveDoctors, setInactiveDoctors] = useState([]);
    const [inactivePatients, setInactivePatients] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchInactiveUsers();
    }, []);

    const fetchInactiveUsers = () => {
        fetch("http://localhost:8080/api/react/admin/inactive-users", {
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch inactive users");
                return res.json();
            })
            .then(data => {
                setInactiveDoctors(data.inactiveDoctors || []);
                setInactivePatients(data.inactivePatients || []);
            })
            .catch(err => setError(err.message));
    };

    const activateUser = (role, id) => {
        fetch(`http://localhost:8080/api/react/admin/activate-user/${role}/${id}`, {
            method: 'PUT',
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to activate user");
                fetchInactiveUsers();
            })
            .catch(err => setError(err.message));
    };

    const renderUserTable = (users, role) => (
        <div className="card mb-5 shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Inactive {role}s</h5>
                <span className="badge bg-light text-dark">{users.length} {role.toLowerCase()}(s)</span>
            </div>
            <div className="card-body p-0">
                {users.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                            <tr>
                                <th scope="col">#ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-success btn-sm"
                                            onClick={() => activateUser(role.toUpperCase(), user.id)}
                                        >
                                            Activate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-3 text-muted">No inactive {role.toLowerCase()}s found.</div>
                )}
            </div>
        </div>
    );

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <h2 className="mb-4 text-center text-primary">Manage Inactive Users</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                {renderUserTable(inactiveDoctors, "Doctor")}
                {renderUserTable(inactivePatients, "Patient")}

                <div className="text-center mt-4">
                    <button className="btn btn-secondary" onClick={() => navigate('/admin-home')}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminInactiveUsers;
