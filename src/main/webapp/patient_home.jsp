<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-5">
    <div class="text-center mb-4">
        <h2>Welcome, ${sessionScope.loggedInPatient.fullName} 👋</h2>
        <p class="lead text-secondary">What would you like to do today?</p>
    </div>

    <div class="row g-4">

        <!-- Schedule Appointment -->
        <div class="col-md-6">
            <div class="card text-white bg-success h-100">
                <div class="card-body text-center">
                    <h5 class="card-title">Schedule Appointment</h5>
                    <p class="card-text">Book a visit with a doctor</p>
                    <a href="scheduleAppointment" class="btn btn-light">Schedule</a>

                </div>
            </div>
        </div>

        <!-- View Appointments -->
        <div class="col-md-6">
            <div class="card text-white bg-info h-100">
                <div class="card-body text-center">
                    <h5 class="card-title">View Appointments</h5>
                    <p class="card-text">See your upcoming and past appointments</p>
                    <a href="PatientViewAppointments" class="btn btn-light">View</a>

                </div>
            </div>
        </div>

        <!-- Medical History -->
        <div class="col-md-6">
            <div class="card text-white bg-secondary h-100">
                <div class="card-body text-center">
                    <h5 class="card-title">Medical History</h5>
                    <p class="card-text">Access your diagnosis and prescriptions</p>
                    <a href="medicalHistory" class="btn btn-light">View</a>
                </div>
            </div>
        </div>

        <!-- Cancel Appointment -->
        <div class="col-md-6">
            <div class="card text-white bg-danger h-100">
                <div class="card-body text-center">
                    <h5 class="card-title">Cancel Appointment</h5>
                    <p class="card-text">Cancel an upcoming appointment</p>
                    <a href="cancelAppointment" class="btn btn-light">Cancel</a>
                </div>
            </div>
        </div>

    </div>
</div>
</body>
</html>
