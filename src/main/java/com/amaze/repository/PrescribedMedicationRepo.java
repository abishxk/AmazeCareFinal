package com.amaze.repository;

import com.amaze.entity.MedicalRecords;
import com.amaze.entity.PrescribedMedication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface PrescribedMedicationRepo extends JpaRepository<PrescribedMedication, Integer> {

    // Find all prescribed meds for a given medical record
    List<PrescribedMedication> findByMedicalRecord(MedicalRecords medicalRecord);

    // Delete all prescribed meds for a given medical record
    void deleteByMedicalRecord(MedicalRecords medicalRecord);

    List<PrescribedMedication> findByMedicalRecordId(int medicalRecordId);
}
