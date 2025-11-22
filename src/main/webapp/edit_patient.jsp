<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-5">
  <h2>Edit Patient Profile</h2>
  <form method="post" action="update_patient">
    <input type="hidden" name="id" value="${sessionScope.loggedInPatient.id}" />

    <div class="mb-3">
      <label>Full Name</label>
      <input type="text" name="fullName" class="form-control" value="${sessionScope.loggedInPatient.fullName}" required>
    </div>

    <div class="mb-3">
      <label>Email</label>
      <input type="email" name="email" class="form-control" value="${sessionScope.loggedInPatient.email}" required>
    </div>

    <div class="mb-3">
      <label>Mobile Number</label>
      <input type="text" name="mobileNumber" class="form-control" value="${sessionScope.loggedInPatient.mobileNumber}" required>
    </div>

    <div class="mb-3">
      <label>Gender</label>
      <select name="gender" class="form-select" required>
        <option value="male" ${sessionScope.loggedInPatient.gender == 'male' ? 'selected' : ''}>Male</option>
        <option value="female" ${sessionScope.loggedInPatient.gender == 'female' ? 'selected' : ''}>Female</option>
        <option value="other" ${sessionScope.loggedInPatient.gender == 'other' ? 'selected' : ''}>Other</option>
      </select>
    </div>

    <div class="mb-3">
      <label>Date of Birth</label>
      <input type="date" name="dob" class="form-control" value="${sessionScope.loggedInPatient.dob}" required>
    </div>

    <div class="mb-3">
      <label>Address</label>
      <input type="text" name="address" class="form-control" value="${sessionScope.loggedInPatient.address}" required>
    </div>

    <div class="mb-3">
      <label>Password</label>
      <input type="password" name="password" class="form-control" value="${sessionScope.loggedInPatient.password}" required>
    </div>

    <button type="submit" class="btn btn-primary">Update</button>
    <a href="patient_home.jsp" class="btn btn-secondary">Cancel</a>
  </form>
</div>
</body>
</html>
