package com.amaze.controller;

import com.amaze.entity.AppointmentStatus;
import com.amaze.entity.Appointments;
import com.amaze.entity.Doctors;
import com.amaze.entity.Patients;
import com.amaze.repository.AppointmentsRepo;
import com.amaze.repository.DoctorsRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Controller
public class AppointmentController {

    @Autowired
    private AppointmentsRepo appointmentsRepo;

    @Autowired
    private DoctorsRepo doctorsRepo;



    @GetMapping("/scheduleAppointment")
    public String showScheduleForm(Model model) {

        model.addAttribute("doctorList", doctorsRepo.findByIsActive(true)); // Or filter only active doctors
        return "schedule_appointment.jsp";
    }

    @PostMapping("/schedule")
    public String bookAppointment(@RequestParam int doctorId,
                                  @RequestParam String appointmentDate,
                                  @RequestParam String appointmentTime,
                                  HttpSession session,
                                  Model model,
                                  RedirectAttributes redirectAttributes) {

        Patients patient = (Patients) session.getAttribute("loggedInPatient");

        if (patient == null) {
            redirectAttributes.addFlashAttribute("error", "You must be logged in to book an appointment.");
            return "redirect:/patient_login.jsp";
        }

        Doctors doctor = doctorsRepo.findById(doctorId).orElse(null);
        if (doctor == null) {
            redirectAttributes.addFlashAttribute("error", "Doctor not found.");
            return "redirect:/scheduleAppointment";
        }

        Appointments appointment = new Appointments();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(Date.valueOf(appointmentDate));
        appointment.setAppointmentTime(Time.valueOf(appointmentTime + ":00"));
        appointment.setStatus(com.amaze.entity.AppointmentStatus.scheduled);
        appointmentsRepo.save(appointment);

        model.addAttribute("appointment", appointment);
        return "appointment_confirmation.jsp";
    }

}
