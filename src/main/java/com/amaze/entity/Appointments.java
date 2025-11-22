package com.amaze.entity;
import com.amaze.entity.AppointmentStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "appointments")
public class Appointments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private int id;


    @ManyToOne
    @JoinColumn(name = "doctor_id")
    @JsonBackReference
    private Doctors doctor;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    @JsonIgnoreProperties({"appointments"})
    private Patients patient;


    @Column(name = "appointment_date", nullable = false)
    private Date appointmentDate;

    @Column(name = "appointment_time", nullable = false)
    private Time appointmentTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, columnDefinition = "enum('scheduled','completed','cancelled') default 'scheduled'")
    private AppointmentStatus status = AppointmentStatus.scheduled;

    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private MedicalRecords medicalRecord;

    @OneToMany(mappedBy = "appointment", fetch = FetchType.LAZY)
    private List<PrescribedMedication> medications;


    public MedicalRecords getMedicalRecord() {
        return medicalRecord;
    }

    public void setMedicalRecord(MedicalRecords medicalRecord) {
        this.medicalRecord = medicalRecord;
    }

    @Column(name = "created_at", insertable = false, updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    public Appointments() {}

    public Appointments(Patients patient, Doctors doctor, Date appointmentDate, Time appointmentTime, AppointmentStatus status) {
        this.patient = patient;
        this.doctor = doctor;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Patients getPatient() {
        return patient;
    }

    public void setPatient(Patients patient) {
        this.patient = patient;
    }

    public Doctors getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctors doctor) {
        this.doctor = doctor;
    }

    public Date getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(Date appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public Time getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(Time appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public List<PrescribedMedication> getMedications() {
        return medications;
    }

    public void setMedications(List<PrescribedMedication> medications) {
        this.medications = medications;
    }
}
