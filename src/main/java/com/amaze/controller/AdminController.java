package com.amaze.controller;

import com.amaze.entity.Admin;
import com.amaze.repository.AdminRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class AdminController {

    @Autowired
    private AdminRepo adminRepo;

    @GetMapping("/admin_login")
    public String showAdminLoginPage() {
        return "admin_login.jsp";
    }

    @PostMapping("/admin_login")
    public String adminLogin(@RequestParam String email,
                             @RequestParam String password,
                             HttpSession session) {
        Admin admin = adminRepo.findByEmail(email);

        if (admin != null && admin.getPassword().equals(password)) {
            session.setAttribute("loggedInAdmin", admin);
            return "redirect:/admin_home.jsp";
        } else {
            session.setAttribute("error", "Invalid admin credentials");
            return "redirect:/admin_login.jsp";
        }
    }

    @PostMapping("/updateAdmin")
    public String updateAdmin(@RequestParam String fullName,
                              @RequestParam String email,
                              @RequestParam String password,
                              HttpSession session) {

        Admin admin = (Admin) session.getAttribute("loggedInAdmin");

        if (admin != null) {
            admin.setFullName(fullName);
            admin.setEmail(email);
            admin.setPassword(password);
            adminRepo.save(admin);

            // Update session
            session.setAttribute("loggedInAdmin", admin);
        }

        return "redirect:/admin_profile.jsp";
    }

}
