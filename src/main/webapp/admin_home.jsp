<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-5">
  <div class="text-center mb-4">
    <h2>Welcome, ${sessionScope.loggedInAdmin.fullName} 👨‍💼</h2>
    <p class="lead text-secondary">Manage your hospital dashboard below</p>
  </div>

  <div class="row g-4">

    <!-- View Patients -->
    <div class="col-md-6">
      <div class="card text-white bg-primary h-100">
        <div class="card-body text-center">
          <h5 class="card-title">View Patients</h5>
          <p class="card-text">Browse and manage all registered patients</p>
          <a href="viewPatients" class="btn btn-light">View</a>
        </div>
      </div>
    </div>

    <!-- View Doctors -->
    <div class="col-md-6">
      <div class="card text-white bg-success h-100">
        <div class="card-body text-center">
          <h5 class="card-title">View Doctors</h5>
          <p class="card-text">Manage doctor profiles and activity status</p>
          <a href="viewDoctors" class="btn btn-light">View</a>
        </div>
      </div>
    </div>

    <!-- View Appointments -->
    <div class="col-md-6">
      <div class="card text-white bg-info h-100">
        <div class="card-body text-center">
          <h5 class="card-title">View Appointments</h5>
          <p class="card-text">Access all scheduled appointments</p>
          <a href="viewAppointmentsAdmin" class="btn btn-light">View</a>
        </div>
      </div>
    </div>

    <!-- Manage Users -->
    <div class="col-md-6">
      <div class="card text-white bg-warning h-100">
        <div class="card-body text-center">
          <h5 class="card-title">Manage Users</h5>
          <p class="card-text">Enable/disable accounts or reset credentials</p>
          <a href="manageUsers" class="btn btn-light">Manage</a>
        </div>
      </div>
    </div>

  </div>
</div>
</body>
</html>


