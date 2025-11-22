package com.amaze.reactController;

import com.amaze.entity.*;
import com.amaze.repository.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/react/doctors")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class DoctorReactController {

    @Autowired
    private DoctorsRepo doctorsRepo;

    @Autowired
    private AppointmentsRepo appointmentsRepo;

    @Autowired
    private MedicalRecordRepo medicalRecordRepo;

    @Autowired
    private PrescribedMedicationRepo prescribedMedicationRepo;

    @PostMapping("/login")
    public ResponseEntity<?> loginDoctor(@RequestBody Map<String, String> payload, HttpSession session) {
        String email = payload.get("email");
        String password = payload.get("password");

        Doctors doctor = doctorsRepo.findByEmail(email);
        if (doctor != null && doctor.getPassword().equals(password)) {
            session.setAttribute("loggedInDoctor", doctor);
            return ResponseEntity.ok(doctor);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/doctor_register")
    public ResponseEntity<String> registerDoctor(@RequestBody Doctors doctor) {
        try {
            doctorsRepo.save(doctor);
            return ResponseEntity.ok("Doctor registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Email already exists or invalid data.");
        }
    }


    @GetMapping("/{id}")
    public Doctors getDoctorById(@PathVariable int id) {
        return doctorsRepo.findById(id).orElse(null);
    }

    @GetMapping("/all")
    public List<Doctors> getAllDoctors() {
        return doctorsRepo.findAll();
    }

    @GetMapping("/me")
    public ResponseEntity<?> getLoggedInDoctor(HttpSession session) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        return doctor != null ?
                ResponseEntity.ok(doctor) :
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
    }

    @GetMapping("/appointments")
    public ResponseEntity<?> getAppointmentsForDoctor(HttpSession session) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        if (doctor == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");

        List<Appointments> appointments = appointmentsRepo.findByDoctorId(doctor.getId());
        return ResponseEntity.ok(convertAppointments(appointments));
    }

    @PostMapping("/consultation/complete")
    public ResponseEntity<?> completeConsultation(@RequestBody Map<String, String> payload, HttpSession session) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        try {
            int appointmentId = Integer.parseInt(payload.get("appointmentId"));
            Optional<Appointments> apptOpt = appointmentsRepo.findById(appointmentId);

            if (apptOpt.isEmpty() || apptOpt.get().getDoctor().getId() != doctor.getId()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized appointment access");
            }

            Appointments appointment = apptOpt.get();
            appointment.setStatus(com.amaze.entity.AppointmentStatus.completed);
            appointmentsRepo.save(appointment);

            // Save medical record
            com.amaze.entity.MedicalRecords record = new com.amaze.entity.MedicalRecords();
            record.setAppointment(appointment);
            record.setSymptoms(payload.get("symptoms"));
            record.setExaminationNotes(payload.get("examinationNotes"));
            record.setTreatmentPlan(payload.get("treatmentPlan"));
            record.setRecommendedTests(payload.get("recommendedTests"));
            record.setPrescription(payload.get("prescription"));

            medicalRecordRepo.save(record);

            return ResponseEntity.ok("Consultation completed and record saved");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error completing consultation");
        }
    }

    @GetMapping("/completed-appointments")
    public ResponseEntity<?> getCompletedAppointments(HttpSession session) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        if (doctor == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");

        List<Appointments> appointments = appointmentsRepo.findByDoctorAndStatus(doctor, AppointmentStatus.completed);
        return ResponseEntity.ok(convertAppointments(appointments));
    }

    @GetMapping("/edit-medical-record/{appointmentId}")
    public ResponseEntity<?> getMedicalRecord(@PathVariable int appointmentId, HttpSession session) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        if (doctor == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");

        Optional<Appointments> opt = appointmentsRepo.findById(appointmentId);
        if (opt.isEmpty() || opt.get().getDoctor().getId() != doctor.getId())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized");

        MedicalRecords record = medicalRecordRepo.findByAppointment(opt.get());
        Map<String, Object> data = new HashMap<>();
        if (record != null) {
            data.put("symptoms", record.getSymptoms());
            data.put("examinationNotes", record.getExaminationNotes());
            data.put("treatmentPlan", record.getTreatmentPlan());
            data.put("prescription", record.getPrescription());
            data.put("recommendedTests", record.getRecommendedTests());
        }
        return ResponseEntity.ok(data);
    }

    @PostMapping("/edit-medical-record")
    public ResponseEntity<?> saveMedicalRecord(@RequestBody Map<String, String> payload, HttpSession session) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        if (doctor == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");

        try {
            int appointmentId = Integer.parseInt(payload.get("appointmentId"));
            Optional<Appointments> opt = appointmentsRepo.findById(appointmentId);
            if (opt.isEmpty() || opt.get().getDoctor().getId() != doctor.getId())
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized");

            Appointments appointment = opt.get();
            MedicalRecords record = medicalRecordRepo.findByAppointment(appointment);
            if (record == null) record = new MedicalRecords();

            record.setAppointment(appointment);
            record.setSymptoms(payload.get("symptoms"));
            record.setExaminationNotes(payload.get("examinationNotes"));
            record.setTreatmentPlan(payload.get("treatmentPlan"));
            record.setPrescription(payload.get("prescription"));
            record.setRecommendedTests(payload.get("recommendedTests"));

            medicalRecordRepo.save(record);
            return ResponseEntity.ok("Medical record saved successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error saving record");
        }
    }

    private List<Map<String, Object>> convertAppointments(List<Appointments> appointments) {
        List<Map<String, Object>> result = new ArrayList<>();
        for (Appointments appt : appointments) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", appt.getId());
            map.put("appointmentDate", appt.getAppointmentDate().toString());
            map.put("appointmentTime", appt.getAppointmentTime().toString());
            map.put("status", appt.getStatus().toString());

            Map<String, Object> patientMap = new HashMap<>();
            patientMap.put("fullName", appt.getPatient().getFullName());
            map.put("patient", patientMap);
            result.add(map);
        }
        return result;
    }

    @PostMapping("/prescribe-meds")
    public ResponseEntity<?> prescribeMedications(@RequestBody Map<String, Object> payload, HttpSession session) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        if (doctor == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");

        try {
            // ✅ FIXED HERE
            int appointmentId = Integer.parseInt(payload.get("appointmentId").toString());

            List<Map<String, String>> medsPayload = (List<Map<String, String>>) payload.get("medications");

            Optional<Appointments> opt = appointmentsRepo.findById(appointmentId);
            if (opt.isEmpty() || opt.get().getDoctor().getId() != doctor.getId())
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized");

            Appointments appointment = opt.get();
            MedicalRecords record = medicalRecordRepo.findByAppointment(appointment);

            if (record == null) {
                record = new MedicalRecords();
                record.setAppointment(appointment);
                record = medicalRecordRepo.save(record);
            }

            prescribedMedicationRepo.deleteByMedicalRecord(record);

            for (Map<String, String> med : medsPayload) {
                if (med.get("name") == null || med.get("url") == null) continue;

                PrescribedMedication medication = new PrescribedMedication();
                medication.setName(med.get("name"));
                medication.setUrl(med.get("url"));
                medication.setMedicalRecord(record);
                prescribedMedicationRepo.save(medication);
            }

            return ResponseEntity.ok("Medications prescribed successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error saving medications: " + e.getMessage());
        }
    }



    @GetMapping("/appointment-details/{appointmentId}")
    public ResponseEntity<?> getAppointmentWithMedicalRecord(@PathVariable int appointmentId, HttpSession session) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        if (doctor == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");

        Optional<Appointments> opt = appointmentsRepo.findById(appointmentId);
        if (opt.isEmpty() || opt.get().getDoctor().getId() != doctor.getId())
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized");

        Appointments appt = opt.get();
        MedicalRecords record = medicalRecordRepo.findByAppointment(appt);

        Map<String, Object> response = new HashMap<>();
        Map<String, Object> apptMap = new HashMap<>();
        apptMap.put("id", appt.getId());
        apptMap.put("date", appt.getAppointmentDate().toString());
        apptMap.put("time", appt.getAppointmentTime().toString());

        Map<String, Object> patientMap = new HashMap<>();
        patientMap.put("fullName", appt.getPatient().getFullName());
        apptMap.put("patient", patientMap);

        response.put("appointment", apptMap);

        if (record != null) {
            Map<String, Object> recordMap = new HashMap<>();
            recordMap.put("symptoms", record.getSymptoms());
            recordMap.put("treatmentPlan", record.getTreatmentPlan());
            recordMap.put("prescription", record.getPrescription());
            response.put("medicalRecord", recordMap);
        }

        return ResponseEntity.ok(response);
    }

    // In your DoctorReactController or a suitable controller
    @GetMapping("/unprescribed-appointments")
    public ResponseEntity<?> getUnprescribedAppointments(HttpSession session) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        List<Appointments> completedAppointments = appointmentsRepo.findByDoctorIdAndStatus(doctor.getId(), AppointmentStatus.valueOf("completed"));

        // Filter appointments whose medical records do not yet have prescribed medications
        List<Appointments> unprescribed = completedAppointments.stream()
                .filter(a -> {
                    MedicalRecords record = medicalRecordRepo.findByAppointmentId(a.getId());
                    if (record == null) return false;
                    return prescribedMedicationRepo.findByMedicalRecordId(record.getId()).isEmpty();
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(unprescribed);
    }


    @GetMapping("/patients/medical-history")
    public ResponseEntity<?> getPatientMedicalHistory(HttpSession session) {
        Patients patient = (Patients) session.getAttribute("loggedInPatient");
        if (patient == null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");

        List<MedicalRecords> records = medicalRecordRepo.findByAppointment_Patient(patient);

        List<Map<String, Object>> response = new ArrayList<>();
        for (MedicalRecords record : records) {
            Map<String, Object> map = new HashMap<>();

            // Add record info
            map.put("id", record.getId());
            map.put("symptoms", record.getSymptoms());
            map.put("examinationNotes", record.getExaminationNotes());
            map.put("treatmentPlan", record.getTreatmentPlan());
            map.put("prescription", record.getPrescription());
            map.put("recommendedTests", record.getRecommendedTests());

            // Add appointment info
            Appointments appt = record.getAppointment();
            if (appt != null) {
                Map<String, Object> apptMap = new HashMap<>();
                apptMap.put("appointmentDate", appt.getAppointmentDate().toString());
                apptMap.put("appointmentTime", appt.getAppointmentTime().toString());

                Map<String, Object> doctorMap = new HashMap<>();
                doctorMap.put("fullName", appt.getDoctor().getFullName());
                apptMap.put("doctor", doctorMap);

                map.put("appointment", apptMap);
            }

            // Add prescribed medications
            List<PrescribedMedication> meds = prescribedMedicationRepo.findByMedicalRecord(record);
            List<Map<String, String>> medsList = new ArrayList<>();
            for (PrescribedMedication med : meds) {
                Map<String, String> medMap = new HashMap<>();
                medMap.put("name", med.getName());
                medMap.put("url", med.getUrl());
                medsList.add(medMap);
            }
            map.put("prescribedMedications", medsList);

            response.add(map);
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/today-appointments")
    public ResponseEntity<?> getTodaysAppointments(HttpSession session) {
        Doctors doctor = (Doctors) session.getAttribute("loggedInDoctor");
        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        LocalDate today = LocalDate.now();
        Date sqlDate = Date.valueOf(today);

        List<Appointments> todayAppointments = appointmentsRepo
                .findByDoctorIdAndAppointmentDateAndStatus(doctor.getId(), sqlDate, AppointmentStatus.scheduled);

        List<Map<String, Object>> result = todayAppointments.stream().map(appt -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", appt.getId());
            map.put("appointmentTime", appt.getAppointmentTime().toString());
            map.put("status", appt.getStatus().toString());

            Map<String, Object> patientMap = new HashMap<>();
            patientMap.put("fullName", appt.getPatient().getFullName());
            map.put("patient", patientMap);

            return map;
        }).toList();

        return ResponseEntity.ok(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDoctor(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        return doctorsRepo.findById(id).map(doctor -> {
            if (updates.containsKey("fullName")) {
                doctor.setFullName((String) updates.get("fullName"));
            }
            if (updates.containsKey("email")) {
                doctor.setEmail((String) updates.get("email"));
            }
            if (updates.containsKey("specialty")) {
                doctor.setSpecialty((String) updates.get("specialty"));
            }
            if (updates.containsKey("designation")) {
                doctor.setDesignation((String) updates.get("designation"));
            }
            if (updates.containsKey("experienceYears")) {
                Object value = updates.get("experienceYears");
                if (value instanceof Number) {
                    doctor.setExperienceYears(((Number) value).intValue());
                } else if (value instanceof String) {
                    doctor.setExperienceYears(Integer.parseInt((String) value));
                }
            }
            if (updates.containsKey("qualification")) {
                doctor.setQualification((String) updates.get("qualification"));
            }

            doctorsRepo.save(doctor);
            return ResponseEntity.ok("Doctor updated successfully.");
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found"));
    }

}
