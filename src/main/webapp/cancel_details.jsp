<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-4">
  <h3>Appointment Summary</h3>

  <table class="table table-bordered">
    <tr><th>Date</th><td>${appointment.appointmentDate}</td></tr>
    <tr><th>Time</th><td>${appointment.appointmentTime}</td></tr>
    <tr><th>Doctor</th><td>${appointment.doctor.fullName}</td></tr>
    <tr><th>Specialty</th><td>${appointment.doctor.specialty}</td></tr>
    <tr><th>Status</th><td>${appointment.status}</td></tr>
  </table>

  <form method="post" action="cancel">
    <input type="hidden" name="appointmentId" value="${appointment.id}" />
    <button type="submit" class="btn btn-danger">Cancel Appointment</button>
    <a href="cancelAppointment" class="btn btn-secondary">Back</a>
  </form>
</div>
</body>
</html>
