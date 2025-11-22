import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
                <div className="container">
                    <a className="navbar-brand fw-bold" href="#">AmazeCare</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#departments">Departments</a></li>
                            <li className="nav-item"><a className="nav-link" href="#about">About Us</a></li>
                            <li className="nav-item"><a className="nav-link" href="#doctors">Our Doctors</a></li>
                        </ul>
                        <div className="d-flex">
                            <a href="/login" className="btn btn-outline-light me-2">
                                <i className="bi bi-box-arrow-in-right me-1"></i> Login
                            </a>
                            <a href="/patient-signup" className="btn btn-light text-primary">
                                <i className="bi bi-person-plus me-1"></i> Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            </nav>


            {/* Hero Section */}
            <section className="hero-section text-white d-flex align-items-center" style={{
                backgroundImage: `url('/images/hero-bg.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh'
            }}>
                <div className="container text-center">
                    <h1 className="display-4 fw-bold">Welcome to AmazeCare Hospital</h1>
                    <p className="lead mt-3">Where Compassion Meets Excellence</p>
                </div>
            </section>

            {/* Departments Section */}
            <section id="departments" className="py-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-5 fw-bold text-primary">Our Departments</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img src="/images/cardio.png" className="card-img-top" alt="Cardiology" />
                                <div className="card-body">
                                    <h5 className="card-title">Cardiology</h5>
                                    <p className="card-text text-muted">Advanced care for heart health by leading cardiologists and modern diagnostics.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img src="/images/neuro.png" className="card-img-top" alt="Neurology" />
                                <div className="card-body">
                                    <h5 className="card-title">Neurology</h5>
                                    <p className="card-text text-muted">Expert neurological support for brain, spine, and nervous system conditions.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img src="/images/pedi.png" className="card-img-top" alt="Pediatrics" />
                                <div className="card-body">
                                    <h5 className="card-title">Pediatrics</h5>
                                    <p className="card-text text-muted">Compassionate care for infants and children by experienced pediatricians.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <img src="/images/aboutus.jpg" alt="About Us" className="img-fluid rounded shadow" />
                        </div>
                        <div className="col-md-6">
                            <h2 className="mb-4 fw-bold text-primary">About AmazeCare Hospital</h2>
                            <p className="text-muted mb-3">
                                At <strong>AmazeCare Hospital</strong>, we believe in providing exceptional healthcare with compassion and innovation.
                                Founded in 2005, our hospital has grown into a state-of-the-art medical facility with an unwavering commitment to patient well-being.
                            </p>
                            <p className="text-muted mb-3">
                                Our team of highly skilled doctors, nurses, and staff work together to offer advanced medical services across multiple departments including cardiology, neurology, pediatrics, and more.
                                We combine technology with a human touch to ensure every patient receives personalized and effective treatment.
                            </p>
                            <p className="text-muted">
                                AmazeCare isn’t just a hospital — it's a promise of trust, care, and excellence. From emergency care to long-term recovery, we’re here for you at every step.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Doctors Section */}
            <section id="doctors" className="py-5 text-white" style={{ backgroundColor: '#007bff' }}>
                <div className="container text-center">
                    <h2 className="mb-5 fw-bold">Meet Our Doctors</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card bg-light text-dark h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <i className="bi bi-person-circle display-4 text-primary mb-3"></i>
                                    <h5 className="card-title">Dr. Priya Sharma</h5>
                                    <p className="card-text">Senior Cardiologist</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card bg-light text-dark h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <i className="bi bi-person-circle display-4 text-primary mb-3"></i>
                                    <h5 className="card-title">Dr. Arjun Mehta</h5>
                                    <p className="card-text">Neurology Specialist</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card bg-light text-dark h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <i className="bi bi-person-circle display-4 text-primary mb-3"></i>
                                    <h5 className="card-title">Dr. Nisha Iyer</h5>
                                    <p className="card-text">Pediatric Consultant</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-4">
                <div className="container">
                    <p className="mb-1">&copy; {new Date().getFullYear()} AmazeCare Hospital. All Rights Reserved.</p>
                    <p className="mb-0">
                        <i className="bi bi-geo-alt-fill"></i> Chennai, India &nbsp;|&nbsp;
                        <i className="bi bi-telephone-fill"></i> +91 98765 43210 &nbsp;|&nbsp;
                        <i className="bi bi-envelope-fill"></i> admin@amazecare.com
                    </p>
                </div>
            </footer>

        </div>
    );
}

export default App;
