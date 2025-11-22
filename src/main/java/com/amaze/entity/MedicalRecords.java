package com.amaze.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "medical_records")
public class MedicalRecords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private int id;

    @OneToOne
    @JoinColumn(name = "appointment_id", unique = true)
    private Appointments appointment;

    @Column(columnDefinition = "TEXT")
    private String symptoms;

    @Column(name = "examination_notes", columnDefinition = "TEXT")
    private String examinationNotes;

    @Column(name = "treatment_plan", columnDefinition = "TEXT")
    private String treatmentPlan;

    @Column(name = "recommended_tests", columnDefinition = "TEXT")
    private String recommendedTests;

    @Column(columnDefinition = "TEXT")
    private String prescription;

    @Column(name = "created_at", insertable = false, updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @OneToMany(mappedBy = "medicalRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Medication> medications = new ArrayList<>();

    @OneToMany(mappedBy = "medicalRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PrescribedMedication> prescribedMedications = new ArrayList<>();


    public MedicalRecords() {}

    public MedicalRecords(Appointments appointment, String symptoms, String examinationNotes,
                         String treatmentPlan, String recommendedTests, String prescription) {
        this.appointment = appointment;
        this.symptoms = symptoms;
        this.examinationNotes = examinationNotes;
        this.treatmentPlan = treatmentPlan;
        this.recommendedTests = recommendedTests;
        this.prescription = prescription;
    }


    public int getId() {
        return id;
    }

    public Appointments getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointments appointment) {
        this.appointment = appointment;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getExaminationNotes() {
        return examinationNotes;
    }

    public void setExaminationNotes(String examinationNotes) {
        this.examinationNotes = examinationNotes;
    }

    public String getTreatmentPlan() {
        return treatmentPlan;
    }

    public void setTreatmentPlan(String treatmentPlan) {
        this.treatmentPlan = treatmentPlan;
    }

    public String getRecommendedTests() {
        return recommendedTests;
    }

    public void setRecommendedTests(String recommendedTests) {
        this.recommendedTests = recommendedTests;
    }

    public String getPrescription() {
        return prescription;
    }

    public void setPrescription(String prescription) {
        this.prescription = prescription;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public List<Medication> getMedications() {
        return medications;
    }

    public void setMedications(List<Medication> medications) {
        this.medications = medications;
    }
}
