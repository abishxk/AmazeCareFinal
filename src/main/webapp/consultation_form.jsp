<%@ page contentType="text/html;charset=UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp"/>
<jsp:include page="menu.jsp"/>
<body>
<div class="container mt-4">
  <h3>Consultation for ${appointment.patient.fullName}</h3>
  <p><strong>Date:</strong> ${appointment.appointmentDate} | <strong>Time:</strong> ${appointment.appointmentTime}</p>

  <form method="post" action="completeConsultation">
    <input type="hidden" name="appointmentId" value="${appointment.id}" />

    <div class="mb-3">
      <label>Symptoms</label>
      <textarea name="symptoms" class="form-control" required></textarea>
    </div>

    <div class="mb-3">
      <label>Examination Notes</label>
      <textarea name="examinationNotes" class="form-control" required></textarea>
    </div>

    <div class="mb-3">
      <label>Treatment Plan</label>
      <textarea name="treatmentPlan" class="form-control"></textarea>
    </div>

    <div class="mb-3">
      <label>Recommended Tests</label>
      <input type="text" name="recommendedTests" class="form-control"/>
    </div>

    <div class="mb-3">
      <label>Prescription</label>
      <textarea name="prescription" class="form-control"></textarea>
    </div>

    <button type="submit" class="btn btn-success">Complete Consultation</button>
  </form>
  <a href="doctor_home.jsp" class="btn btn-secondary mt-3">Back to Home</a>
</div>
</body>
</html>
