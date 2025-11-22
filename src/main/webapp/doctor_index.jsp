<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-5">
  <div class="row">
    <div class="col-sm-6">
      <img src="images/Hos.jpg" class="img-thumbnail" alt="Doctor Registration">
    </div>
    <div class="col-sm-6">
      <h3>Doctor Registration</h3>
      <form action="doctor_register" method="post">
        <input type="text" name="fullName" placeholder="Full Name" class="form-control mb-3" required>
        <input type="text" name="specialty" placeholder="Specialty" class="form-control mb-3" required>
        <input type="number" name="experienceYears" placeholder="Experience Years" class="form-control mb-3">
        <input type="text" name="qualification" placeholder="Qualification" class="form-control mb-3">
        <input type="text" name="designation" placeholder="Designation" class="form-control mb-3">
        <input type="email" name="email" placeholder="Email" class="form-control mb-3" required>
        <input type="password" name="password" placeholder="Password" class="form-control mb-3" required>
        <div class="mb-3 text-danger">
          <c:if test="${not empty error}">
            ${error}
          </c:if>
        </div>
        <button type="submit" class="btn btn-success">Sign Up</button>
        <button type="reset" class="btn btn-secondary">Reset</button>
      </form>
    </div>
  </div>
</div>
</body>
</html>
