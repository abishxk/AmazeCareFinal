<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-5">
  <div class="text-center">
    <h2>My Profile</h2>
    <p class="lead text-secondary">Review your personal information</p>
  </div>

  <div class="row mt-4">
    <div class="col-md-6 offset-md-3">
      <div class="card shadow">
        <div class="card-body">
          <h5 class="card-title text-primary">Your Info</h5>
          <p><strong>Full Name:</strong> ${sessionScope.loggedInPatient.fullName}</p>
          <p><strong>Email:</strong> ${sessionScope.loggedInPatient.email}</p>
          <p><strong>Mobile:</strong> ${sessionScope.loggedInPatient.mobileNumber}</p>
          <p><strong>Gender:</strong> ${sessionScope.loggedInPatient.gender}</p>
          <p><strong>DOB:</strong> ${sessionScope.loggedInPatient.dob}</p>
          <p><strong>Address:</strong> ${sessionScope.loggedInPatient.address}</p>

          <a href="edit_patient.jsp" class="btn btn-primary mt-3">Edit Profile</a>
          <a href="confirm_delete.jsp" class="btn btn-danger mt-3 ms-2">Delete Profile</a>

        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
