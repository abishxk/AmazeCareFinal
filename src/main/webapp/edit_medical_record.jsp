<%@ page contentType="text/html;charset=UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-5">
  <h3>Edit Medical Record</h3>

  <form action="saveMedicalRecord" method="post">
    <input type="hidden" name="appointmentId" value="${record.appointment.id}" />

    <div class="mb-3">
      <label>Symptoms</label>
      <textarea class="form-control" name="symptoms">${record.symptoms}</textarea>
    </div>
    <div class="mb-3">
      <label>Examination Notes</label>
      <textarea class="form-control" name="examinationNotes">${record.examinationNotes}</textarea>
    </div>
    <div class="mb-3">
      <label>Treatment Plan</label>
      <textarea class="form-control" name="treatmentPlan">${record.treatmentPlan}</textarea>
    </div>
    <div class="mb-3">
      <label>Prescription</label>
      <textarea class="form-control" name="prescription">${record.prescription}</textarea>
    </div>
    <div class="mb-3">
      <label>Recommended Tests</label>
      <textarea class="form-control" name="recommendedTests">${record.recommendedTests}</textarea>
    </div>

    <button class="btn btn-success">Save</button>
  </form>
  <a href="doctor_home.jsp" class="btn btn-secondary mt-3">Back to Home</a>
</div>
</body>
</html>
