<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<jsp:include page="bootstrap_links.jsp"/>
<jsp:include page="menu.jsp"/>

<body>
<div class="container mt-4">
    <h3>Medical History</h3>

    <c:choose>
        <c:when test="${not empty records}">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Symptoms</th>
                    <th>Prescription</th>
                </tr>
                </thead>
                <tbody>
                <c:forEach var="record" items="${records}">
                    <tr>
                        <td>${record.appointment.appointmentDate}</td>
                        <td>${record.appointment.doctor.fullName}</td>
                        <td>${record.symptoms}</td>
                        <td>${record.prescription}</td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
        </c:when>
        <c:otherwise>
            <p>No medical history found.</p>
        </c:otherwise>
    </c:choose>

    <a href="patient_home.jsp" class="btn btn-secondary mt-3">Back to Home</a>
</div>
</body>
</html>
