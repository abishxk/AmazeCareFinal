<%@ page contentType="text/html;charset=UTF-8" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp" />
<jsp:include page="menu.jsp" />
<body>
<div class="container mt-5">
  <h3 class="text-center">Update Medical Records</h3>

  <c:if test="${empty appointments}">
    <div class="alert alert-warning">No appointments found.</div>
  </c:if>

  <c:if test="${not empty appointments}">
    <table class="table table-bordered table-hover mt-3">
      <thead class="table-dark">
      <tr>
        <th>Patient</th>
        <th>Date</th>
        <th>Time</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <c:forEach var="a" items="${appointments}">
        <tr>
          <td>${a.patient.fullName}</td>
          <td>${a.appointmentDate}</td>
          <td>${a.appointmentTime}</td>
          <td>${a.status}</td>
          <td>
            <form action="editMedicalRecord" method="get">
              <input type="hidden" name="appointmentId" value="${a.id}" />
              <button class="btn btn-sm btn-primary">Edit</button>
            </form>
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
