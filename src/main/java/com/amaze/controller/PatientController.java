package com.amaze.controller;
import com.amaze.entity.AppointmentStatus;
import com.amaze.entity.Appointments;
import com.amaze.entity.Patients;
import com.amaze.repository.AppointmentsRepo;
import com.amaze.repository.PatientRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class PatientController {

    @Autowired
    PatientRepo repo;
    @Autowired
    AppointmentsRepo appointmentsRepo;


    @RequestMapping("/register")
    public String register(Patients patients, Model model) {
        repo.save(patients);
        model.addAttribute("p1", patients);
        return "patient_login.jsp";
    }

    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password,
                        HttpSession session,
                        RedirectAttributes attributes) {

        Patients patient = repo.findByEmail(email);

        try {
            if (patient != null && patient.getPassword().equals(password)) {
                session.setAttribute("loggedInPatient", patient);
                return "redirect:/patient_home.jsp";
            } else {
                attributes.addFlashAttribute("error", "Invalid email or password");
                return "redirect:/patient_login.jsp";
            }
        } catch (EntityNotFoundException e) {
            System.err.println(e);
            attributes.addFlashAttribute("error", "Invalid email or password");
            return "redirect:/patient_login.jsp";
        }
    }

    @PostMapping("/delete_profile")
    public String deleteProfile(HttpSession session) {
        Patients patient = (Patients) session.getAttribute("loggedInPatient");

        if (patient != null) {
            patient.setActive(false); // Soft delete
            repo.save(patient);         // Save updated status
            session.invalidate();       // Log out the user
        }

        return "redirect:/index.jsp";  // Go back to home
    }

    @GetMapping("/PatientViewAppointments")
    public String viewAppointments(HttpSession session, Model model) {
        Patients patient = (Patients) session.getAttribute("loggedInPatient");

        if (patient == null) {
            return "redirect:/patient_login.jsp";
        }

        model.addAttribute("appointments", appointmentsRepo.findByPatientId(patient.getId()));
        return "patient_view_appointments.jsp";
    }

    @GetMapping("/cancelAppointment")
    public String showCancelPage(HttpSession session, Model model) {
        Patients patient = (Patients) session.getAttribute("loggedInPatient");
        if (patient == null) {
            return "redirect:/patient_login.jsp";
        }

        List<Appointments> appointments = appointmentsRepo.findByPatientAndStatus(patient, AppointmentStatus.scheduled);
        model.addAttribute("appointments", appointments);
        return "cancel_appointment.jsp";
    }

    @PostMapping("/cancel")
    public String cancelAppointment(@RequestParam int appointmentId, HttpSession session, RedirectAttributes redirectAttributes) {
        Appointments appointment = appointmentsRepo.findById(appointmentId).orElse(null);
        Patients patient = (Patients) session.getAttribute("loggedInPatient");

        if (appointment != null && patient != null && appointment.getPatient().getId() == patient.getId()) {
            appointment.setStatus(AppointmentStatus.cancelled);
            appointmentsRepo.save(appointment);
            redirectAttributes.addFlashAttribute("success", "Appointment cancelled successfully.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Cancellation failed.");
        }

        return "redirect:/cancelAppointment";
    }

    @GetMapping("/cancelDetails")
    public String showCancelDetails(@RequestParam int appointmentId, Model model, HttpSession session) {
        Appointments appointment = appointmentsRepo.findById(appointmentId).orElse(null);
        Patients patient = (Patients) session.getAttribute("loggedInPatient");

        if (appointment == null || patient == null || appointment.getPatient().getId() != patient.getId()) {
            model.addAttribute("error", "Appointment not found or access denied.");
            return "redirect:/cancelAppointment";
        }

        model.addAttribute("appointment", appointment);
        return "cancel_details.jsp";
    }

    @PostMapping("/update_patient")
    public String updatePatient(Patients updatedPatient, HttpSession session, RedirectAttributes attributes) {
        Patients current = (Patients) session.getAttribute("loggedInPatient");

        if (current == null) {
            return "redirect:/patient_login.jsp";
        }

        updatedPatient.setId(current.getId());
        updatedPatient.setActive(true);
        updatedPatient.setCreatedAt(current.getCreatedAt());
        updatedPatient.setRole(current.getRole());

        repo.save(updatedPatient);
        session.setAttribute("loggedInPatient", updatedPatient); // Update session
        attributes.addFlashAttribute("success", "Profile updated successfully.");
        return "redirect:/patient_home.jsp";
    }


}
