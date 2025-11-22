<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp"/>
<jsp:include page="menu.jsp"/>
<body>
<div class="container mt-5">
  <h3>My Scheduled Appointments</h3>

  <c:if test="${empty appointments}">
    <div class="alert alert-warning">No appointments found.</div>
  </c:if>

  <c:if test="${not empty appointments}">
    <table class="table table-bordered table-hover mt-3">
      <thead class="table-dark">
      <tr>
        <th>Patient Name</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <c:forEach var="a" items="${appointments}">
        <tr>
          <td>${a.patient.fullName}</td>
          <td>${a.appointmentDate}</td>
          <td>${a.appointmentTime}</td>
          <td>${a.status}</td>
        </tr>
      </c:forEach>
      </tbody>
    </table>
  </c:if>
  <a href="doctor_home.jsp" class="btn btn-secondary mt-3">Back to Home</a>
</div>
</body>
</html>
