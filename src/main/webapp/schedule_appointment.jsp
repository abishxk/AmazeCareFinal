<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp"/>
<jsp:include page="menu.jsp"/>

<body>
<div class="container mt-4">
  <h3>Schedule a New Appointment</h3>
  <form method="post" action="schedule">
  <div class="mb-3">
      <label for="doctorId" class="form-label">Select Doctor</label>
      <select class="form-select" id="doctorId" name="doctorId" required>
        <c:forEach var="doctor" items="${doctorList}">
          <option value="${doctor.id}">${doctor.fullName} (${doctor.specialty})</option>
        </c:forEach>
      </select>
    </div>
    <div class="mb-3">
      <label for="date" class="form-label">Appointment Date</label>
      <input type="date" class="form-control" id="date" name="appointmentDate" required>
    </div>
    <div class="mb-3">
      <label for="time" class="form-label">Appointment Time</label>
      <input type="time" class="form-control" id="time" name="appointmentTime" required>
    </div>
    <button type="submit" class="btn btn-success">Book Appointment</button>
  </form>
  <a href="patient_home.jsp" class="btn btn-secondary mt-3">Back to Home</a>
</div>
</body>
</html>
