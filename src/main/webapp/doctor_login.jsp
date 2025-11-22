<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-5">
  <div class="row">
    <div class="col-sm-6">
      <img src="images/Hos.jpg" class="img-thumbnail" alt="Doctor Login">
    </div>
    <div class="col-sm-6">
      <h3>Doctor Login</h3>
      <form action="doctor_login" method="post">
        <input type="email" name="email" placeholder="Email" class="form-control mb-3" required>
        <input type="password" name="password" placeholder="Password" class="form-control mb-3" required>
        <div class="mb-3 text-danger">
          <c:if test="${not empty error}">
            ${error}
          </c:if>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <button type="reset" class="btn btn-secondary">Reset</button>
      </form>
    </div>
  </div>
</div>
</body>
</html>
