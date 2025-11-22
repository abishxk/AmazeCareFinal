package com.amaze.repository;

import com.amaze.entity.Appointments;
import com.amaze.entity.MedicalRecords;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordsRepo extends JpaRepository<MedicalRecords, Integer> {
    MedicalRecords findByAppointment(Appointments appointment);
}
