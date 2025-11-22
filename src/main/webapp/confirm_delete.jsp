<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />

<body>
<div class="container mt-5">
  <div class="alert alert-warning text-center">
    <h4>Are you sure you want to delete your account?</h4>
    <p class="text-muted">This will deactivate your account but your medical records and appointments will remain safely stored.</p>
    <p>If you wish to reinstate your account in the future, please contact <strong>admin@amazecare.com</strong></p>

    <form method="post" action="delete_profile">
      <button type="submit" class="btn btn-danger">Yes, Delete My Account</button>
      <a href="patient_home.jsp" class="btn btn-secondary">Cancel</a>
    </form>
  </div>

</div>
</body>
</html>
