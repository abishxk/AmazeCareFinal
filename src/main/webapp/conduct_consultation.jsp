<%@ page contentType="text/html;charset=UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp"/>
<jsp:include page="menu.jsp"/>
<body>
<div class="container mt-5">
  <h3 class="text-center">Today's Consultations</h3>

  <c:if test="${empty appointments}">
    <div class="alert alert-info">No appointments scheduled for today.</div>
  </c:if>

  <c:if test="${not empty appointments}">
    <table class="table table-striped mt-3">
      <thead>
      <tr>
        <th>Patient</th>
        <th>Time</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <c:forEach var="a" items="${appointments}">
        <tr>
          <td>${a.patient.fullName}</td>
          <td>${a.appointmentTime}</td>
          <td>${a.status}</td>
          <td>
            <a href="startConsultation?appointmentId=${a.id}" class="btn btn-sm btn-primary">Start Consultation</a>
          </td>
        </tr>
      </c:forEach>
      </tbody>
    </table>
  </c:if>
  <a href="doctor_home.jsp" class="btn btn-secondary mt-3">Back to Home</a>
</div>
</body>
</html>
