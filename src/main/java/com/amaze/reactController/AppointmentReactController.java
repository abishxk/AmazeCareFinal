package com.amaze.reactController;

import com.amaze.entity.*;
import com.amaze.repository.AppointmentsRepo;
import com.amaze.repository.DoctorsRepo;
import com.amaze.repository.MedicalRecordRepo;
import com.amaze.repository.PatientRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.*;

@RestController
@RequestMapping("/api/react/appointments")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AppointmentReactController {

    @Autowired
    private AppointmentsRepo appointmentsRepo;

    @Autowired
    private DoctorsRepo doctorsRepo;

    @Autowired
    private PatientRepo patientsRepo;

    @Autowired
    private MedicalRecordRepo medicalRecordRepo;

    // ✅ Get appointments for logged-in patient
    @GetMapping("/patient")
    public ResponseEntity<?> getAppointmentsForPatient(HttpSession session) {
        Patients patient = (Patients) session.getAttribute("loggedInPatient");

        if (patient == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        List<Appointments> appointments = appointmentsRepo.findByPatientId(patient.getId());

        List<Map<String, Object>> result = appointments.stream().map(appt -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", appt.getId());
            map.put("appointmentDate", appt.getAppointmentDate().toString());
            map.put("appointmentTime", appt.getAppointmentTime().toString());
            map.put("status", appt.getStatus().toString());

            Doctors doc = appt.getDoctor();
            Map<String, Object> docMap = new HashMap<>();
            docMap.put("fullName", doc.getFullName());
            docMap.put("specialty", doc.getSpecialty());
            map.put("doctor", docMap);

            return map;
        }).toList();

        return ResponseEntity.ok(result);
    }

    // ✅ Schedule appointment
    @PostMapping("/schedule")
    public ResponseEntity<?> scheduleAppointment(@RequestBody Map<String, String> data) {
        try {
            int patientId = Integer.parseInt(data.get("patientId"));
            int doctorId = Integer.parseInt(data.get("doctorId"));
            Date date = Date.valueOf(data.get("appointmentDate"));
            Time time = Time.valueOf(data.get("appointmentTime") + ":00");

            Optional<Patients> patientOpt = patientsRepo.findById(patientId);
            Optional<Doctors> doctorOpt = doctorsRepo.findById(doctorId);

            if (patientOpt.isPresent() && doctorOpt.isPresent()) {
                Appointments appointment = new Appointments();
                appointment.setPatient(patientOpt.get());
                appointment.setDoctor(doctorOpt.get());
                appointment.setAppointmentDate(date);
                appointment.setAppointmentTime(time);
                appointment.setStatus(AppointmentStatus.scheduled);

                appointmentsRepo.save(appointment);
                return ResponseEntity.ok("Appointment scheduled successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid patient or doctor ID.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error scheduling appointment: " + e.getMessage());
        }
    }

    // ✅ Get appointment by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable int id) {
        return appointmentsRepo.findById(id)
                .map(appointment -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", appointment.getId());
                    map.put("appointmentDate", appointment.getAppointmentDate().toString());
                    map.put("appointmentTime", appointment.getAppointmentTime().toString());
                    map.put("status", appointment.getStatus().toString());

                    Map<String, Object> docMap = new HashMap<>();
                    docMap.put("fullName", appointment.getDoctor().getFullName());
                    docMap.put("specialty", appointment.getDoctor().getSpecialty());

                    map.put("doctor", docMap);

                    return ResponseEntity.ok(map);
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("error", "Appointment not found")));

    }

    // ✅ Cancel appointment (set status to "cancelled")
    @PutMapping("/cancel/{id}")
    public ResponseEntity<?> cancelAppointment(@PathVariable int id) {
        return appointmentsRepo.findById(id).map(appt -> {
            appt.setStatus(AppointmentStatus.cancelled);
            appointmentsRepo.save(appt);
            return ResponseEntity.ok("Appointment cancelled");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found"));
    }



}
