<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-5">
  <div class="text-center">
    <h2>${sessionScope.loggedInAdmin.fullName}'s Profile</h2>
  </div>

  <div class="row mt-4">
    <div class="col-md-6 offset-md-3">
      <div class="card shadow">
        <div class="card-body">
          <p><strong>Email:</strong> ${sessionScope.loggedInAdmin.email}</p>
          <p><strong>Full Name:</strong> ${sessionScope.loggedInAdmin.fullName}</p>

          <a href="edit_admin.jsp" class="btn btn-primary mt-3">Edit Profile</a>
        </div>
      </div>
    </div>
  </div>

  <a href="admin_home.jsp" class="btn btn-secondary mt-3">Back to Home</a>
</div>
</body>
</html>
