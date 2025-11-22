package com.amaze.restapi;

import com.amaze.entity.Appointments;
import com.amaze.entity.AppointmentStatus;
import com.amaze.repository.AppointmentsRepo;
import com.amaze.repository.PatientRepo;
import com.amaze.repository.DoctorsRepo;
import com.amaze.entity.Doctors;
import com.amaze.entity.Patients;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Map;

import static com.amaze.entity.Appointments.*;

//@RestController
//@RequestMapping("/api/appointments")
public class AppointmentApi {

    @Autowired
    private AppointmentsRepo appointmentsRepo;

    @Autowired
    private PatientRepo patientRepo;

    @Autowired
    private DoctorsRepo doctorRepo;

    @GetMapping
    public List<Appointments> getAllAppointments() {
        return appointmentsRepo.findAll();
    }

    @GetMapping("/{id}")
    public Appointments getAppointmentById(@PathVariable int id) {
        return appointmentsRepo.findById(id).orElse(null);
    }

    @PostMapping
    public Appointments createAppointment(@RequestBody Appointments appointment) {
        if (appointment.getPatient() == null || appointment.getDoctor() == null) {
            return null;
        }

        Patients patient = patientRepo.findById(appointment.getPatient().getId()).orElse(null);
        Doctors doctor = doctorRepo.findById(appointment.getDoctor().getId()).orElse(null);

        if (patient != null && doctor != null) {
            appointment.setPatient(patient);
            appointment.setDoctor(doctor);
            return appointmentsRepo.save(appointment);
        }

        return null;
    }

    @PutMapping("/{id}")
    public Appointments updateAppointment(@PathVariable int id, @RequestBody Appointments updated) {
        Appointments existing = appointmentsRepo.findById(id).orElse(null);

        if (existing != null) {
            existing.setAppointmentDate(updated.getAppointmentDate());
            existing.setAppointmentTime(updated.getAppointmentTime());
            existing.setStatus(updated.getStatus());

            if (updated.getPatient() != null) {
                Patients patient = patientRepo.findById(updated.getPatient().getId()).orElse(null);
                if (patient != null) {
                    existing.setPatient(patient);
                }
            }

            if (updated.getDoctor() != null) {
                Doctors doctor = doctorRepo.findById(updated.getDoctor().getId()).orElse(null);
                if (doctor != null) {
                    existing.setDoctor(doctor);
                }
            }

            return appointmentsRepo.save(existing);
        }
        return null;
    }


    @DeleteMapping("/{id}")
    public String deleteAppointment(@PathVariable int id) {
        if (appointmentsRepo.existsById(id)) {
            appointmentsRepo.deleteById(id);
            return "Deleted appointment with ID: " + id;
        }
        return "Appointment not found";
    }

}
