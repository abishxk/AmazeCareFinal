package com.amaze.entity;

import jakarta.persistence.*;

@Entity
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private String url;

    @ManyToOne
    @JoinColumn(name = "medical_record_id")
    private MedicalRecords medicalRecord;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public MedicalRecords getMedicalRecord() {
        return medicalRecord;
    }

    public void setMedicalRecord(MedicalRecords medicalRecord) {
        this.medicalRecord = medicalRecord;
    }
}