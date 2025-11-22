package com.amaze.repository;

import com.amaze.entity.Appointments;
import com.amaze.entity.MedicalRecords;
import com.amaze.entity.Patients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MedicalRecordRepo extends JpaRepository<MedicalRecords, Integer> {
    MedicalRecords findByAppointmentId(int appointmentId);

    @Query("SELECT r FROM MedicalRecords r WHERE r.appointment.patient.id = :patientId")
    List<MedicalRecords> findByPatientId(@Param("patientId") int patientId);


    MedicalRecords findByAppointment(Appointments appointments);

    List<MedicalRecords> findByAppointment_Patient(Patients patient);
}
