package com.amaze.reactController;

import com.amaze.entity.*;
import com.amaze.repository.AppointmentsRepo;
import com.amaze.repository.MedicalRecordRepo;
import com.amaze.repository.MedicationsRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/react/medical-records")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MedicalRecordsReactController {

    @Autowired
    private MedicalRecordRepo medicalRecordRepo;

    @Autowired
    private AppointmentsRepo appointmentsRepo;

    @Autowired
    private MedicationsRepo medicationRepo;

    @GetMapping("/patient")
    public ResponseEntity<?> getMedicalHistoryForPatient(HttpSession session) {
        Patients patient = (Patients) session.getAttribute("loggedInPatient");

        if (patient == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        List<MedicalRecords> records = medicalRecordRepo.findByPatientId(patient.getId());

        List<Map<String, Object>> result = new ArrayList<>();
        for (MedicalRecords record : records) {
            Map<String, Object> map = new HashMap<>();
            map.put("symptoms", record.getSymptoms());
            map.put("examinationNotes", record.getExaminationNotes());
            map.put("treatmentPlan", record.getTreatmentPlan());
            map.put("recommendedTests", record.getRecommendedTests());
            map.put("prescription", record.getPrescription());
            map.put("createdAt", record.getCreatedAt() != null ? record.getCreatedAt().toString() : null);

            // Appointment info
            Appointments appt = record.getAppointment();
            if (appt != null) {
                Map<String, Object> apptMap = new HashMap<>();
                apptMap.put("appointmentDate", appt.getAppointmentDate().toString());
                apptMap.put("appointmentTime", appt.getAppointmentTime().toString());

                Doctors doc = appt.getDoctor();
                Map<String, Object> docMap = new HashMap<>();
                docMap.put("fullName", doc.getFullName());
                docMap.put("specialty", doc.getSpecialty());

                apptMap.put("doctor", docMap);
                map.put("appointment", apptMap);
            }

            // ✅ Add medications
            List<Map<String, String>> medList = new ArrayList<>();
            List<Medication> meds = medicationRepo.findByMedicalRecord(record);
            for (Medication m : meds) {
                Map<String, String> mMap = new HashMap<>();
                mMap.put("name", m.getName());
                mMap.put("url", m.getUrl());
                medList.add(mMap);
            }
            map.put("medications", medList);

            result.add(map);
        }

        return ResponseEntity.ok(result);
    }


    // ✅ 2. Insert medical record after consultation
    @PostMapping("/complete")
    public ResponseEntity<?> completeConsultation(@RequestBody Map<String, String> data, HttpSession session) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");

        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        try {
            int appointmentId = Integer.parseInt(data.get("appointmentId"));
            Optional<Appointments> optional = appointmentsRepo.findById(appointmentId);

            if (optional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found");
            }

            Appointments appointment = optional.get();

            if (appointment.getDoctor().getId() != doctor.getId()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }

            MedicalRecords record = new MedicalRecords();
            record.setAppointment(appointment);
            record.setSymptoms(data.get("symptoms"));
            record.setExaminationNotes(data.get("examinationNotes"));
            record.setTreatmentPlan(data.get("treatmentPlan"));
            record.setRecommendedTests(data.get("recommendedTests"));
            record.setPrescription(data.get("prescription"));

            medicalRecordRepo.save(record);

            appointment.setStatus(AppointmentStatus.completed);
            appointmentsRepo.save(appointment);

            return ResponseEntity.ok("Consultation completed and record saved.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

}
