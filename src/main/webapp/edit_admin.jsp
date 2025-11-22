<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />

<body>
<div class="container mt-5">
  <div class="col-md-6 offset-md-3">
    <h3>Edit Admin Profile</h3>
    <form method="post" action="updateAdmin">
      <div class="mb-3">
        <label>Full Name</label>
        <input type="text" class="form-control" name="fullName" value="${sessionScope.loggedInAdmin.fullName}" required />
      </div>

      <div class="mb-3">
        <label>Email</label>
        <input type="email" class="form-control" name="email" value="${sessionScope.loggedInAdmin.email}" required />
      </div>

      <div class="mb-3">
        <label>Password</label>
        <input type="password" class="form-control" name="password" value="${sessionScope.loggedInAdmin.password}" required />
      </div>

      <button type="submit" class="btn btn-success">Update</button>
      <a href="myprofile_admin.jsp" class="btn btn-secondary ms-2">Cancel</a>
    </form>
  </div>
</div>
</body>
</html>
