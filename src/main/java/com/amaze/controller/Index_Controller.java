package com.amaze.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Index_Controller {
    @GetMapping("/")
    public String home() {
        return "index.jsp";
    }

    @GetMapping("/patient_index")
    public String patientHome() {
        return "patient_index.jsp";
    }

    @RequestMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("loggedInPatient");
        session.removeAttribute("loggedInDoctor");
        session.removeAttribute("loggedInAdmin");
        session.invalidate();
        return "redirect:/index.jsp";
    }

}
