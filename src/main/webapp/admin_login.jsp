<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<body>
<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow">
        <div class="card-header bg-primary text-white">
          <h4 class="text-center">Admin Login</h4>
        </div>
        <div class="card-body">
          <form action="admin_login" method="post">
            <div class="mb-3">
              <input type="email" name="email" class="form-control" placeholder="Email" required>
            </div>
            <div class="mb-3">
              <input type="password" name="password" class="form-control" placeholder="Password" required>
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary">Login</button>
            </div>
            <c:if test="${not empty error}">
              <div class="alert alert-danger mt-3">${error}</div>
            </c:if>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
