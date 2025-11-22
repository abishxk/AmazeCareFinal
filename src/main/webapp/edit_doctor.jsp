<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-5">
  <h2>Edit Doctor Profile</h2>
  <form method="post" action="update_doctor">
    <input type="hidden" name="id" value="${sessionScope.loggedInDoctor.id}" />

    <div class="mb-3">
      <label>Full Name</label>
      <input type="text" name="fullName" class="form-control" value="${sessionScope.loggedInDoctor.fullName}" required>
    </div>

    <div class="mb-3">
      <label>Email</label>
      <input type="email" name="email" class="form-control" value="${sessionScope.loggedInDoctor.email}" required>
    </div>

    <div class="mb-3">
      <label>Password</label>
      <input type="password" name="password" class="form-control" value="${sessionScope.loggedInDoctor.password}" required>
    </div>

    <div class="mb-3">
      <label>Specialty</label>
      <input type="text" name="specialty" class="form-control" value="${sessionScope.loggedInDoctor.specialty}" required>
    </div>

    <div class="mb-3">
      <label>Designation</label>
      <input type="text" name="designation" class="form-control" value="${sessionScope.loggedInDoctor.designation}" required>
    </div>

    <div class="mb-3">
      <label>Qualification</label>
      <input type="text" name="qualification" class="form-control" value="${sessionScope.loggedInDoctor.qualification}" required>
    </div>

    <div class="mb-3">
      <label>Years of Experience</label>
      <input type="number" name="experienceYears" class="form-control" value="${sessionScope.loggedInDoctor.experienceYears}" required>
    </div>

    <button type="submit" class="btn btn-primary">Update</button>
    <a href="doctor_home.jsp" class="btn btn-secondary">Cancel</a>
  </form>
</div>
</body>
</html>
