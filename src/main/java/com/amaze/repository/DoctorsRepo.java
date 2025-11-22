package com.amaze.repository;

import com.amaze.entity.Doctors;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorsRepo extends JpaRepository<Doctors, Integer> {
    Doctors findByEmail(String email);

    List<Doctors> findByIsActive(boolean active);

    List<Doctors> findBySpecialtyIgnoreCase(String specialty);

    List<Doctors> findByIsActiveFalse();

    Doctors findByEmailAndPassword(String email, String password);
}
