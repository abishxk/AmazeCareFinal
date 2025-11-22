package com.amaze.repository;

import com.amaze.entity.Patients;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepo extends JpaRepository<Patients, Integer> {
    Patients findByEmail(String email);

    List<Patients> findByIsActiveFalse();

    Patients findByEmailAndPassword(String email, String password);

}
