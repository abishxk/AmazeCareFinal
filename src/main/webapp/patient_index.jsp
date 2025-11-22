<%--
  Created by IntelliJ IDEA.
  User: abishek
  Date: 6/16/2025
  Time: 4:47 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
    <jsp:include page="bootstrap_links.jsp" />
    <jsp:include page="menu.jsp" />
<body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <img alt="AmazeCare Hospital image" class="img img-thumbnail" src="images/Hos.jpg">
                </div>
                <div class="col-sm-6">
                    <h3>Patient Registration</h3>
                    <form action="register" method="post">
                        <div class="mb-3">
                            <input type="text" class="form-control" name="fullName" placeholder="Full Name:" required>
                        </div>

                        <div class="mb-3">
                            <label for="dob" class="form-label">Date of Birth</label>
                            <input type="date" class="form-control" id="dob" name="dob" required>
                        </div>


                        <div class="mb-3">
                            <label><input type="radio" name="gender" value="male" required> Male</label>
                            <label><input type="radio" name="gender" value="female" required> Female</label>
                            <label><input type="radio" name="gender" value="other" required> Other</label>
                        </div>

                        <div class="mb-3">
                            <input type="tel" class="form-control" name="mobileNumber" placeholder="Mobile Number:" required>
                        </div>

                        <div class="mb-3">
                            <input type="email" class="form-control" name="email" placeholder="Email:" required>
                        </div>

                        <div class="mb-3">
                            <input type="password" class="form-control" name="password" placeholder="Password:" required>
                        </div>

                        <div class="mb-3">
                            <textarea class="form-control" name="address" placeholder="Address:" rows="3" cols="30" required></textarea>
                        </div>

                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Sign up</button>
                            <button type="reset" class="btn btn-danger">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</body>
</html>
