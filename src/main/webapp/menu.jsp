<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" href="/index.jsp">AmazeCare Hospital</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">

                <!-- PATIENT LOGGED IN -->
                <c:if test="${not empty sessionScope.loggedInPatient}">
                    <li class="nav-item"><a class="nav-link" href="/patient_home.jsp">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/myprofile_patient.jsp">My Profile</a></li>
                    <li class="nav-item"><a class="nav-link text-warning" href="/logout">Logout</a></li>
                </c:if>

                <!-- DOCTOR LOGGED IN -->
                <c:if test="${not empty sessionScope.loggedInDoctor}">
                    <li class="nav-item"><a class="nav-link" href="/doctor_home.jsp">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/myprofile_doctor.jsp">My Profile</a></li>
                    <li class="nav-item"><a class="nav-link text-warning" href="/logout">Logout</a></li>
                </c:if>

                <!-- ADMIN LOGGED IN -->
                <c:if test="${not empty sessionScope.loggedInAdmin}">
                    <li class="nav-item"><a class="nav-link" href="/admin_home.jsp">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/myprofile_admin.jsp">My Profile</a></li>
                    <li class="nav-item"><a class="nav-link text-warning" href="/logout">Logout</a></li>
                </c:if>

                <!-- DEFAULT: NOT LOGGED IN -->
                <c:if test="${empty sessionScope.loggedInPatient and empty sessionScope.loggedInDoctor and empty sessionScope.loggedInAdmin}">
                    <li class="nav-item"><a class="nav-link" href="/index.jsp">Home</a></li>

                    <c:choose>
                        <c:when test="${fn:contains(pageContext.request.requestURI, 'doctor')}">
                            <li class="nav-item"><a class="nav-link" href="/doctor_login.jsp">Login</a></li>
                            <li class="nav-item"><a class="nav-link" href="/doctor_index.jsp">Register</a></li>
                        </c:when>
                        <c:when test="${fn:contains(pageContext.request.requestURI, 'patient')}">
                            <li class="nav-item"><a class="nav-link" href="/patient_login.jsp">Login</a></li>
                            <li class="nav-item"><a class="nav-link" href="/patient_index.jsp">Register</a></li>
                        </c:when>
                        <c:otherwise>
                            <li class="nav-item"><a class="nav-link" href="/index.jsp#login-options">Login</a></li>
                            <li class="nav-item"><a class="nav-link" href="/index.jsp#signup-options">Register</a></li>
                        </c:otherwise>
                    </c:choose>
                </c:if>

            </ul>
        </div>
    </div>
</nav>
