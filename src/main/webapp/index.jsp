<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome | AmazeCare</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <jsp:include page="bootstrap_links.jsp" />

    <style>
        body {
            background-color: #f8f9fa;
        }
        .welcome-box {
            margin-top: 80px;
            padding: 40px;
            border-radius: 15px;
            background-color: white;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
        }
        .role-card {
            border: none;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease-in-out;
        }
        .role-card:hover {
            transform: scale(1.02);
        }
        .role-img {
            max-height: 300px;
            border-radius: 10px;
        }
    </style>
</head>
<body>

<div class="container text-center">
    <div class="welcome-box">
        <h2 class="mb-4 fw-bold">Welcome to AmazeCare Hospital</h2>
        <img src="images/Hos.jpg" alt="Hospital Staff" class="img-fluid role-img mb-4">

        <div class="row justify-content-center mt-4">
            <div class="col-md-4 mb-4">
                <div class="card role-card">
                    <div class="card-body">
                        <h4 class="card-title">Login</h4>
                        <p class="card-text">Choose your role</p>
                        <button onclick="window.location.href='/patient_login.jsp'" class="btn btn-outline-primary w-100 mb-2">Patient</button>
                        <button onclick="window.location.href='/doctor_login.jsp'" class="btn btn-outline-success w-100">Doctor</button>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card role-card">
                    <div class="card-body">
                        <h4 class="card-title">Sign Up</h4>
                        <p class="card-text">Choose your role</p>
                        <button onclick="window.location.href='/patient_index.jsp'" class="btn btn-outline-primary w-100 mb-2">Patient</button>
                        <button onclick="window.location.href='/doctor_index.jsp'" class="btn btn-outline-success w-100">Doctor</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

</body>
</html>
