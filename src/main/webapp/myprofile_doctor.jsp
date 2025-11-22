<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-5">
  <div class="text-center">
    <h2>Dr. ${sessionScope.loggedInDoctor.fullName}'s Profile</h2>
  </div>

  <div class="row mt-4">
    <div class="col-md-6 offset-md-3">
      <div class="card shadow">
        <div class="card-body">
          <p><strong>Email:</strong> ${sessionScope.loggedInDoctor.email}</p>
          <p><strong>Specialty:</strong> ${sessionScope.loggedInDoctor.specialty}</p>
          <p><strong>Qualification:</strong> ${sessionScope.loggedInDoctor.qualification}</p>
          <p><strong>Designation:</strong> ${sessionScope.loggedInDoctor.designation}</p>
          <p><strong>Experience:</strong> ${sessionScope.loggedInDoctor.experienceYears} years</p>

          <a href="edit_doctor.jsp" class="btn btn-primary mt-3">Edit Profile</a>
          <a href="confirm_delete.jsp" class="btn btn-danger mt-3 ms-2">Delete Profile</a>
        </div>
      </div>
    </div>
  </div>
  <a href="doctor_home.jsp" class="btn btn-secondary mt-3">Back to Home</a>
</div>
</body>
</html>
