package com.amaze.repository;

import com.amaze.entity.AppointmentStatus;
import com.amaze.entity.Appointments;
import com.amaze.entity.Doctors;
import com.amaze.entity.Patients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface AppointmentsRepo extends JpaRepository<Appointments, Integer> {
    @Query("SELECT a FROM Appointments a JOIN FETCH a.doctor WHERE a.patient.id = :patientId")
    List<Appointments> findByPatientId(@Param("patientId") int patientId);

    List<Appointments> findByPatientAndStatus(Patients patient, AppointmentStatus status);
    List<Appointments> findByDoctorId(int id);

    List<Appointments> findByDoctorIdAndAppointmentDateAndStatus(int doctorId, Date date, AppointmentStatus scheduled);

    List<Appointments> findByDoctorAndStatus(Doctors doctor, AppointmentStatus appointmentStatus);

    List<Appointments> findByDoctorIdAndStatus(int doctorId, AppointmentStatus appointmentStatus);

    @Query("SELECT a FROM Appointments a LEFT JOIN FETCH a.doctor LEFT JOIN FETCH a.patient")
    List<Appointments> findAllWithDoctorAndPatient();

}
