package com.amaze.reactController;

import com.amaze.entity.Admin;
import com.amaze.entity.Doctors;
import com.amaze.entity.Patients;
import com.amaze.repository.AdminRepo;
import com.amaze.repository.DoctorsRepo;
import com.amaze.repository.PatientRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/react")
@CrossOrigin(origins = "http://localhost:3000")  // Adjust if needed
public class AuthController {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private DoctorsRepo doctorRepo;

    @Autowired
    private PatientRepo patientRepo;

    @PostMapping("/login")
    public ResponseEntity<?> unifiedLogin(@RequestBody Map<String, String> payload, HttpSession session) {
        String email = payload.get("email");
        String password = payload.get("password");

        Admin admin = adminRepo.findByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            session.setAttribute("loggedInAdmin", admin);
            return ResponseEntity.ok(Map.of(
                    "role", "ADMIN",
                    "email", admin.getEmail(),
                    "name", admin.getFullName()
            ));
        }

        Doctors doctor = doctorRepo.findByEmail(email);
        if (doctor != null && doctor.getPassword().equals(password)) {
            session.setAttribute("loggedInDoctor", doctor);
            return ResponseEntity.ok(Map.of(
                    "role", "DOCTOR",
                    "id", doctor.getId(),
                    "email", doctor.getEmail(),
                    "name", doctor.getFullName()
            ));
        }

        Patients patient = patientRepo.findByEmail(email);
        if (patient != null && patient.getPassword().equals(password)) {
            Boolean isActive = patient.getActive();
            if (isActive != null && !isActive) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("Account is deactivated. Please contact admin@amazecare.com to reactivate.");
            }
            session.setAttribute("loggedInPatient", patient);
            return ResponseEntity.ok(Map.of(
                    "role", "PATIENT",
                    "id", patient.getId(),
                    "email", patient.getEmail(),
                    "name", patient.getFullName()
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

}
