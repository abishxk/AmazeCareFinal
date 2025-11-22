package com.amaze.restapi;

import com.amaze.entity.Appointments;
import com.amaze.entity.MedicalRecords;
import com.amaze.repository.AppointmentsRepo;
import com.amaze.repository.MedicalRecordRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
public class MedicalRecordApi {

    @Autowired
    private MedicalRecordRepo recordsRepo;

    @Autowired
    private AppointmentsRepo appointmentsRepo;

    @GetMapping
    public List<MedicalRecords> getAllRecords() {
        return recordsRepo.findAll();
    }

    @GetMapping("/{id}")
    public MedicalRecords getById(@PathVariable int id) {
        return recordsRepo.findById(id).orElse(null);
    }

    @PostMapping
    public MedicalRecords create(@RequestBody MedicalRecords record) {
        if (record.getAppointment() == null || record.getAppointment().getId() == 0) {
            return null;
        }

        Appointments appointment = appointmentsRepo.findById(record.getAppointment().getId()).orElse(null);
        if (appointment != null) {
            record.setAppointment(appointment);
            return recordsRepo.save(record);
        }

        return null;
    }

    @PutMapping("/{id}")
    public MedicalRecords update(@PathVariable int id, @RequestBody MedicalRecords updated) {
        MedicalRecords existing = recordsRepo.findById(id).orElse(null);

        if (existing != null) {
            existing.setSymptoms(updated.getSymptoms());
            existing.setExaminationNotes(updated.getExaminationNotes());
            existing.setTreatmentPlan(updated.getTreatmentPlan());
            existing.setRecommendedTests(updated.getRecommendedTests());
            existing.setPrescription(updated.getPrescription());

            if (updated.getAppointment() != null && updated.getAppointment().getId() != 0) {
                Appointments appointment = appointmentsRepo.findById(updated.getAppointment().getId()).orElse(null);
                if (appointment != null) {
                    existing.setAppointment(appointment);
                }
            }

            return recordsRepo.save(existing);
        }

        return null;
    }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        if (recordsRepo.existsById(id)) {
            recordsRepo.deleteById(id);
            return "Deleted medical record with ID: " + id;
        }
        return "Medical record not found";
    }
}
