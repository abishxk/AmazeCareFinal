<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp"/>
<jsp:include page="menu.jsp"/>
<body>
<div class="container mt-4">
  <h3>Cancel Appointment</h3>

  <c:if test="${empty appointments}">
    <div class="alert alert-info">You have no scheduled appointments to cancel.</div>
  </c:if>

  <c:if test="${not empty appointments}">
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Date</th>
        <th>Time</th>
        <th>Doctor</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <c:forEach var="appt" items="${appointments}">
        <tr>
          <td>${appt.appointmentDate}</td>
          <td>${appt.appointmentTime}</td>
          <td>${appt.doctor.fullName}</td>
          <td>${appt.status}</td>
          <td>
            <a href="cancelDetails?appointmentId=${appt.id}" class="btn btn-info btn-sm">View</a>
          </td>
        </tr>
      </c:forEach>

      </tbody>
    </table>
  </c:if>

  <a href="patient_home.jsp" class="btn btn-secondary mt-3">Back to Home</a>
</div>
</body>
</html>
