<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp"></jsp:include>
<jsp:include page="menu.jsp" />
<body>
<div class="container-fluid">
  <div class="row">
    <!-- Left image section -->
    <div class="col-sm-6">
      <img alt="AmazeCare Hospital image" class="img img-thumbnail" src="images/Hos.jpg">
    </div>

    <!-- Right login form -->
    <div class="col-sm-6">
      <h3>Patient Login</h3>
      <form action="login" method="post">
        <div class="mb-3">
          <input type="email" class="form-control" name="email" placeholder="Email:" required>
        </div>

        <div class="mb-3">
          <input type="password" class="form-control" name="password" placeholder="Password:" required>
        </div>

        <div class="mb-3">
          <button type="submit" class="btn btn-primary">Login</button>
          <button type="reset" class="btn btn-danger">Reset</button>
        </div>
        <div>${error}</div>


      </form>
    </div>
  </div>
</div>
</body>
</html>
