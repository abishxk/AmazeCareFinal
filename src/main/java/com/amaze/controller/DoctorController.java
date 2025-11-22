package com.amaze.controller;

import com.amaze.entity.AppointmentStatus;
import com.amaze.entity.Appointments;
import com.amaze.entity.Doctors;
import com.amaze.entity.MedicalRecords;
import com.amaze.repository.AppointmentsRepo;
import com.amaze.repository.DoctorsRepo;
import com.amaze.repository.RecordsRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Controller
public class DoctorController {

    @Autowired
    DoctorsRepo repo;

    @Autowired
    AppointmentsRepo appointmentsRepo;

    @Autowired
    RecordsRepo recordsRepo;

    @GetMapping("/doctor_index")
    public String showDoctorSignUp() {
        return "doctor_index.jsp";
    }

    @PostMapping("/doctor_register")
    public String registerDoctor(@ModelAttribute Doctors doctor, RedirectAttributes attributes) {
        try {
            repo.save(doctor);
            return "redirect:/doctor_login";
        } catch (Exception e) {
            attributes.addFlashAttribute("error", "Email already exists or invalid data.");
            return "redirect:/doctor_index";
        }
    }

    @GetMapping("/doctor_login")
    public String showDoctorLoginPage() {
        return "doctor_login.jsp";
    }

    @PostMapping("/doctor_login")
    public String login(@RequestParam String email,
                        @RequestParam String password,
                        HttpSession session,
                        RedirectAttributes attributes) {

        try {
            Doctors doctor = repo.findByEmail(email);
            if (doctor != null && doctor.getPassword().equals(password)) {
                session.setAttribute("loggedInDoctor", doctor);
                return "redirect:/doctor_home.jsp";
            } else {
                attributes.addFlashAttribute("error", "Invalid email or password");
                return "redirect:/doctor_login.jsp";
            }
        } catch (EntityNotFoundException e) {
            attributes.addFlashAttribute("error", "Login error occurred");
            return "redirect:/doctor_login.jsp";
        }
    }

    @RequestMapping("/doctor_logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/index.jsp";
    }

    @GetMapping("/doctorViewAppointments")
    public String viewAppointments(HttpSession session, Model model) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");

        if (doctor != null) {
            List<Appointments> appointments = appointmentsRepo.findByDoctorId(doctor.getId());
            model.addAttribute("appointments", appointments);
            return "doctor_view_appointments.jsp";
        }

        return "redirect:/doctor_login.jsp";
    }

    @GetMapping("/updateMedicalRecords")
    public String showAppointmentsForUpdate(HttpSession session, Model model) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        if (doctor == null) {
            return "redirect:/doctor_login.jsp";
        }

        List<Appointments> appointments = appointmentsRepo.findByDoctorAndStatus(doctor, AppointmentStatus.completed);
        model.addAttribute("appointments", appointments);
        return "update_medical_records.jsp";
    }


    @GetMapping("/editMedicalRecord")
    public String showEditForm(@RequestParam int appointmentId, Model model) {
        Appointments appointment = appointmentsRepo.findById(appointmentId).orElse(null);
        if (appointment == null) {
            return "redirect:/updateMedicalRecords";
        }

        MedicalRecords record = recordsRepo.findByAppointment(appointment);
        if (record == null) {
            record = new MedicalRecords(); // new entry
            record.setAppointment(appointment);
        }

        model.addAttribute("record", record);
        return "edit_medical_record.jsp";
    }

    @PostMapping("/saveMedicalRecord")
    public String saveRecord(@RequestParam int appointmentId,
                             @RequestParam String symptoms,
                             @RequestParam String examinationNotes,
                             @RequestParam String treatmentPlan,
                             @RequestParam String prescription,
                             @RequestParam String recommendedTests) {

        Appointments appointment = appointmentsRepo.findById(appointmentId).orElse(null);
        if (appointment == null) return "redirect:/updateMedicalRecords";

        MedicalRecords record = recordsRepo.findByAppointment(appointment);
        if (record == null) {
            record = new MedicalRecords();
            record.setAppointment(appointment);
        }

        record.setSymptoms(symptoms);
        record.setExaminationNotes(examinationNotes);
        record.setTreatmentPlan(treatmentPlan);
        record.setPrescription(prescription);
        record.setRecommendedTests(recommendedTests);

        recordsRepo.save(record);
        return "redirect:/updateMedicalRecords";
    }

    @GetMapping("/conductConsultation")
    public String showTodayAppointments(HttpSession session, Model model) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        if (doctor == null) {
            return "redirect:/doctor_login.jsp";
        }

        LocalDate today = LocalDate.now();
        List<Appointments> appointments = appointmentsRepo
                .findByDoctorIdAndAppointmentDateAndStatus(doctor.getId(), Date.valueOf(today), AppointmentStatus.scheduled);

        model.addAttribute("appointments", appointments);
        return "conduct_consultation.jsp";
    }


    @GetMapping("/startConsultation")
    public String startConsultation(@RequestParam int appointmentId, Model model, HttpSession session) {
        Appointments appointment = appointmentsRepo.findById(appointmentId).orElse(null);

        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");

        if (appointment == null || doctor == null || appointment.getDoctor().getId() != doctor.getId()) {
            return "redirect:/conductConsultation";
        }

        model.addAttribute("appointment", appointment);
        return "consultation_form.jsp";
    }

    @PostMapping("/completeConsultation")
    public String completeConsultation(@RequestParam int appointmentId,
                                       @RequestParam String symptoms,
                                       @RequestParam String examinationNotes,
                                       @RequestParam(required = false) String treatmentPlan,
                                       @RequestParam(required = false) String recommendedTests,
                                       @RequestParam(required = false) String prescription,
                                       RedirectAttributes redirectAttributes) {

        Appointments appointment = appointmentsRepo.findById(appointmentId).orElse(null);

        if (appointment != null) {
            appointment.setStatus(AppointmentStatus.completed);
            appointmentsRepo.save(appointment);

            MedicalRecords record = new MedicalRecords();
            record.setAppointment(appointment);
            record.setSymptoms(symptoms);
            record.setExaminationNotes(examinationNotes);
            record.setTreatmentPlan(treatmentPlan);
            record.setRecommendedTests(recommendedTests);
            record.setPrescription(prescription);
            recordsRepo.save(record);

            redirectAttributes.addFlashAttribute("success", "Consultation completed & record saved.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Invalid appointment.");
        }

        return "redirect:/conductConsultation";
    }

    @PostMapping("/update_doctor")
    public String updateDoctor(Doctors updatedDoctor, HttpSession session, RedirectAttributes attributes) {
        Doctors current = (Doctors) session.getAttribute("loggedInDoctor");

        if (current == null) {
            return "redirect:/doctor_login.jsp";
        }

        updatedDoctor.setId(current.getId());
        updatedDoctor.setIsActive(true);
        updatedDoctor.setCreatedAt(current.getCreatedAt());
        updatedDoctor.setRole(current.getRole());

        repo.save(updatedDoctor);
        session.setAttribute("loggedInDoctor", updatedDoctor);
        attributes.addFlashAttribute("success", "Profile updated successfully.");
        return "redirect:/doctor_home.jsp";
    }


}
