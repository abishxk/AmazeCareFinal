package com.amaze.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
public class Patients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private int id;

    @Column(nullable = false, length = 255)
    private String fullName;

    @Column(nullable = false)
    private String dob;

    @Column(nullable = false)
    @Pattern(regexp = "male|female|other", message = "Gender must be 'male', 'female', or 'other'")
    private String gender;

    @Column(name = "mobile_number", nullable = false, unique = true, length = 15)
    @Size(min = 10, max = 15, message = "Mobile number must be between 10 and 15 digits")
    private String mobileNumber;

    @Column(nullable = false, unique = true, length = 255)
    @Email(message = "Email must be valid")
    private String email;

    @Column(nullable = false, length = 255)
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @Column(nullable = false)
    private String address;

    @Column(name = "is_active",nullable = false)
    private Boolean isActive = true;

    @Column(name = "role")
    private String role = "PATIENT";

    @Column(name = "created_at", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore //@JsonBackReference
    private List<Appointments> appointments;


    public Patients(String fullName, String dob, String gender, String mobileNumber, String email, String password, String address) {
        this.fullName = fullName;
        this.dob = dob;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.password = password;
        this.address = address;
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

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
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

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }



    public Patients() {
    }

    @Override
    public String toString() {
        return "Patients{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", dob='" + dob + '\'' +
                ", gender='" + gender + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", address='" + address + '\'' +
                ", isActive=" + isActive +
                ", createdAt=" + createdAt +
                '}';
    }


}
