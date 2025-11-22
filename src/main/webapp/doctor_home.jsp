<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<head>
  <title>Doctor Home | AmazeCare</title>
</head>
<body>
<div class="container mt-5">
  <div class="text-center mb-4">
    <h2>Welcome, Dr. ${sessionScope.loggedInDoctor.fullName} 👨‍⚕️</h2>
    <p class="lead text-secondary">Here’s what you can do today</p>
  </div>

  <div class="row g-4">

    <!-- View Appointments -->
    <div class="col-md-6">
      <div class="card text-white bg-primary h-100">
        <div class="card-body text-center">
          <h5 class="card-title">View Appointments</h5>
          <p class="card-text">Check your scheduled patient appointments</p>
          <a href="doctorViewAppointments" class="btn btn-light">View</a>
        </div>
      </div>
    </div>

    <!-- Conduct Consultation -->
    <div class="col-md-6">
      <div class="card text-white bg-success h-100">
        <div class="card-body text-center">
          <h5 class="card-title">Conduct Consultation</h5>
          <p class="card-text">Review and consult scheduled patients</p>
          <a href="/conductConsultation" class="btn btn-light">Start</a>
        </div>
      </div>
    </div>

    <!-- Update Medical Records -->
    <div class="col-md-6">
      <div class="card text-white bg-info h-100">
        <div class="card-body text-center">
          <h5 class="card-title">Update Medical Records</h5>
          <p class="card-text">Add/update treatment details after consultation</p>
          <a href="/updateMedicalRecords" class="btn btn-light">Update</a>
        </div>
      </div>
    </div>

    <!-- Prescribe Medications -->
    <div class="col-md-6">
      <div class="card text-white bg-warning h-100">
        <div class="card-body text-center">
          <h5 class="card-title">Prescribe Medications</h5>
          <p class="card-text">Write and send prescriptions for patients</p>
          <a href="prescribe_medications.jsp" class="btn btn-light">Prescribe</a>
        </div>
      </div>
    </div>

  </div>
</div>
</body>
</html>
