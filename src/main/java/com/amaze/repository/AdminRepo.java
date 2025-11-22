package com.amaze.repository;

import com.amaze.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, Integer> {
    Admin findByEmail(String email);

    Admin findByEmailAndPassword(String email, String password);
}
