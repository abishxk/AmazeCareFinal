package com.amaze.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.sql.Timestamp;

@Entity
@Table(name = "admin_users")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private int id;

    @Column(name = "role")
    private String role = "ADMIN";

    @NotBlank
    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @NotBlank
    @Size(min = 6)
    @Column(nullable = false, length = 255)
    private String password;

    @Column(name = "created_at", insertable = false, updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    // Constructors
    public Admin() {}

    public Admin(String fullName, String email, String password) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public int getId() { return id; }

    public String getFullName() { return fullName; }

    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public Timestamp getCreatedAt() { return createdAt; }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
