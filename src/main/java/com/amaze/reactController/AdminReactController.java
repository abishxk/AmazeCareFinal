package com.amaze.reactController;

import com.amaze.entity.*;
import com.amaze.repository.AdminRepo;
import com.amaze.repository.AppointmentsRepo;
import com.amaze.repository.DoctorsRepo;
import com.amaze.repository.PatientRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/react/admin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminReactController {

    @Autowired
    private DoctorsRepo doctorsRepo;

    @Autowired
    private PatientRepo patientsRepo;

    @Autowired
    private AppointmentsRepo appointmentsRepo;

    @Autowired
    private AdminRepo adminRepo;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds, HttpSession session) {
        String email = creds.get("email");
        String password = creds.get("password");

        Admin admin = adminRepo.findByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            session.setAttribute("loggedInAdmin", admin);
            return ResponseEntity.ok(Map.of(
                    "email", admin.getEmail(),
                    "name", admin.getFullName()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }





    @PutMapping("/activate-user/{role}/{id}")
    public ResponseEntity<?> activateUser(@PathVariable String role, @PathVariable int id) {
        if (role.equalsIgnoreCase("DOCTOR")) {
            return doctorsRepo.findById(id).map(doc -> {
                doc.setIsActive(true);
                doctorsRepo.save(doc);
                return ResponseEntity.ok(doc);
            }).orElse(ResponseEntity.notFound().build());
        } else if (role.equalsIgnoreCase("PATIENT")) {
            return patientsRepo.findById(id).map(pat -> {
                pat.setActive(true);
                patientsRepo.save(pat);
                return ResponseEntity.ok(pat);
            }).orElse(ResponseEntity.notFound().build());
        }
        return ResponseEntity.badRequest().body("Invalid role");
    }

    @GetMapping("/appointments")
    public ResponseEntity<?> getAllAppointments(HttpSession session) {
        Admin admin = (Admin) session.getAttribute("loggedInAdmin");

        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        List<Appointments> appointments = appointmentsRepo.findAllWithDoctorAndPatient();
        return ResponseEntity.ok(appointments);
    }


    @PutMapping("/appointments/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable int id,
            @RequestParam String action,
            HttpSession session) {

        Admin admin = (Admin) session.getAttribute("loggedInAdmin");
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        Optional<Appointments> optional = appointmentsRepo.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
        }

        Appointments appointment = optional.get();

        switch (action.toLowerCase()) {
            case "cancel":
                if (appointment.getStatus() == AppointmentStatus.scheduled) {
                    appointment.setStatus(AppointmentStatus.cancelled);
                    appointmentsRepo.save(appointment);
                    return ResponseEntity.ok("Appointment cancelled successfully");
                } else {
                    return ResponseEntity.badRequest().body("Only scheduled appointments can be cancelled");
                }

            case "undo":
                if (appointment.getStatus() == AppointmentStatus.cancelled) {
                    appointment.setStatus(AppointmentStatus.scheduled);
                    appointmentsRepo.save(appointment);
                    return ResponseEntity.ok("Appointment undo-cancelled successfully");
                } else {
                    return ResponseEntity.badRequest().body("Only cancelled appointments can be undone");
                }

            default:
                return ResponseEntity.badRequest().body("Invalid action");
        }
    }

    @PutMapping("/appointments/{id}/cancel")
    public ResponseEntity<String> cancelAppointment(@PathVariable int id) {
        Optional<Appointments> optionalAppointment = appointmentsRepo.findById(id);
        if (optionalAppointment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
        }

        Appointments appt = optionalAppointment.get();
        appt.setStatus(AppointmentStatus.cancelled);
        appointmentsRepo.save(appt);
        return ResponseEntity.ok("Appointment cancelled");
    }

    @PutMapping("/appointments/{id}/undo")
    public ResponseEntity<String> undoCancelAppointment(@PathVariable int id) {
        Optional<Appointments> optionalAppointment = appointmentsRepo.findById(id);
        if (optionalAppointment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
        }

        Appointments appt = optionalAppointment.get();
        // Only allow undo if it's currently cancelled
        if (appt.getStatus() == AppointmentStatus.cancelled) {
            appt.setStatus(AppointmentStatus.scheduled);
            appointmentsRepo.save(appt);
            return ResponseEntity.ok("Cancellation undone");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Appointment is not cancelled");
    }

    @GetMapping("/inactive-users")
    public ResponseEntity<?> getInactiveUsers(HttpSession session) {
        Admin admin = (Admin) session.getAttribute("loggedInAdmin");
        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("inactiveDoctors", doctorsRepo.findByIsActiveFalse());
        response.put("inactivePatients", patientsRepo.findByIsActiveFalse());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/DocRegister")
    public ResponseEntity<Doctors> register(@RequestBody Doctors doctor) {
        if (doctorsRepo.findByEmail(doctor.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(null);
        }
        Doctors saved = doctorsRepo.save(doctor);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/AllDoctors")
    public List<Doctors> getAllDoctors() {
        return doctorsRepo.findAll();
    }

    @PutMapping("/delete-doctor/{id}")
    public ResponseEntity<?> deactivateDoctor(@PathVariable int id) {
        return doctorsRepo.findById(id).map(doctor -> {
            doctor.setIsActive(false); // Soft delete
            doctorsRepo.save(doctor);
            return ResponseEntity.ok("Doctor account deactivated successfully.");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found"));
    }


}