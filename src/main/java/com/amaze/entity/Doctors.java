package com.amaze.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "doctors")
public class Doctors {

    @Column(name = "role")
    private String role = "DOCTOR";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    private int id;

    @Size(max = 100, message = "Full name must be at most 100 characters")
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Size(max = 100)
    @Column(nullable = false)
    private String specialty;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Size(max = 100)
    private String qualification;

    @Size(max = 100)
    private String designation;

    @Email(message = "Invalid email format")
    @Size(max = 100)
    @Column(nullable = false, unique = true)
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters")
    @Column(nullable = false, length = 255)
    private String password;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at", insertable = false, updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @OneToMany(mappedBy = "doctor")
    @JsonManagedReference
    private List<Appointments> appointments;




    public Doctors() {}

    public Doctors(String fullName, String specialty, Integer experienceYears, String qualification, String designation, String email, String password) {
        this.fullName = fullName;
        this.specialty = specialty;
        this.experienceYears = experienceYears;
        this.qualification = qualification;
        this.designation = designation;
        this.email = email;
        this.password = password;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean active) {
        isActive = active;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public List<Appointments> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointments> appointments) {
        this.appointments = appointments;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Doctors{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", specialty='" + specialty + '\'' +
                ", experienceYears=" + experienceYears +
                ", qualification='" + qualification + '\'' +
                ", designation='" + designation + '\'' +
                ", email='" + email + '\'' +
                ", isActive=" + isActive +
                ", createdAt=" + createdAt +
                '}';
    }
}
