package com.amaze.repository;

import com.amaze.entity.MedicalRecords;
import com.amaze.entity.Medication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicationsRepo extends JpaRepository<Medication, Integer> {
    List<Medication> findByMedicalRecord(MedicalRecords record);
    List<Medication> findByNameStartingWithIgnoreCase(String name);

}
