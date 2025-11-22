<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp"/>
<jsp:include page="menu.jsp"/>
<body>
<div class="container mt-5">
  <div class="text-center">
    <h2 class="text-success">✅ Appointment Confirmed</h2>
    <p>Your appointment has been successfully booked.</p>
  </div>

  <div class="card mt-4">
    <div class="card-body">
      <h5 class="card-title">Appointment Summary</h5>
      <p><strong>Doctor:</strong> ${appointment.doctor.fullName} (${appointment.doctor.specialty})</p>
      <p><strong>Date:</strong> ${appointment.appointmentDate}</p>
      <p><strong>Time:</strong> ${appointment.appointmentTime}</p>
      <p><strong>Status:</strong> ${appointment.status}</p>
    </div>
  </div>

  <div class="text-center mt-4">
    <a href="patient_home.jsp" class="btn btn-primary">Return to Home</a>
  </div>
</div>
</body>
</html>
