package com.amaze.reactController;

import com.amaze.entity.MedicalRecords;
import com.amaze.entity.Patients;
import com.amaze.repository.MedicalRecordRepo;
import com.amaze.repository.PatientRepo;
import com.amaze.repository.PrescribedMedicationRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/react/patients")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PatientReactController {

    @Autowired
    private PatientRepo repo;

    @Autowired
    private MedicalRecordRepo recordRepo;

    @Autowired
    private PrescribedMedicationRepo prescribedMedicationRepo;


    @PostMapping("/register")
    public ResponseEntity<Patients> register(@RequestBody Patients patient) {
        Patients saved = repo.save(patient);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload, HttpSession session) {
        String email = payload.get("email");
        String password = payload.get("password");

        Patients patient = repo.findByEmail(email);

        if (patient == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        Boolean isActive = patient.getActive(); // may be null

        if (isActive != null && !isActive) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Account is deactivated. Please contact admin@amazecare.com to reactivate.");
        }

        if (!patient.getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        session.setAttribute("loggedInPatient", patient);
        return ResponseEntity.ok(patient);
    }





    @GetMapping("/me")
    public ResponseEntity<?> getLoggedInPatient(HttpSession session) {
        Patients patient = (Patients) session.getAttribute("loggedInPatient");
        if (patient == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }
        return ResponseEntity.ok(patient);
    }


    @GetMapping("/all")
    public List<Patients> getAllPatients() {
        return repo.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePatient(@PathVariable int id, @RequestBody Patients updatedPatient) {
        return repo.findById(id).map(patient -> {
            patient.setFullName(updatedPatient.getFullName());
            patient.setDob(updatedPatient.getDob());
            patient.setGender(updatedPatient.getGender());
            patient.setMobileNumber(updatedPatient.getMobileNumber());
            patient.setEmail(updatedPatient.getEmail());
            patient.setAddress(updatedPatient.getAddress());
            repo.save(patient);
            return ResponseEntity.ok(patient);
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/medical-history")
    public ResponseEntity<?> getMedicalHistory(HttpSession session) {
        Patients patient = (Patients) session.getAttribute("loggedInPatient");
        if (patient == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        List<MedicalRecords> records = recordRepo.findByPatientId(patient.getId());

        List<Map<String, Object>> response = records.stream().map(record -> {
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", record.getId());
            map.put("symptoms", record.getSymptoms());
            map.put("prescription", record.getPrescription());
            map.put("examinationNotes", record.getExaminationNotes());
            map.put("recommendedTests", record.getRecommendedTests());
            map.put("treatmentPlan", record.getTreatmentPlan());
            map.put("appointment", record.getAppointment());

            // Fetch and add prescribed medications
            map.put("prescribedMedications", prescribedMedicationRepo.findByMedicalRecord(record));

            return map;
        }).toList();

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updatePatientStatus(@PathVariable int id, @RequestBody Map<String, Boolean> statusPayload) {
        Boolean isActive = statusPayload.get("isActive");
        if (isActive == null) {
            return ResponseEntity.badRequest().body("Missing isActive field");
        }

        return repo.findById(id).map(patient -> {
            patient.setActive(isActive);
            repo.save(patient);
            return ResponseEntity.ok(patient);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable int id, HttpSession session) {
        Patients loggedInPatient = (Patients) session.getAttribute("loggedInPatient");

        if (loggedInPatient == null || loggedInPatient.getId() != id) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        return repo.findById(id).map(patient -> {
            patient.setActive(false);  // Soft delete by deactivating
            session.invalidate(); // Invalidate session after delete
            repo.save(patient);
            return ResponseEntity.ok("Your account has been deactivated. To reactivate, please contact admin@amazecare.com");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Patient not found"));
    }

}
