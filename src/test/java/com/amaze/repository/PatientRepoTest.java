package com.amaze.repository;

import com.amaze.entity.Patients;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class PatientRepoTest {

    @Autowired
    private PatientRepo repo;

    @Test
    public void testUserExistsByEmail() {
        Patients patient = new Patients("Test User", "1990-01-01", "male",
                "9999999999", "test@example.com", "pass123", "Chennai");
        repo.save(patient);
        Patients found = repo.findByEmail("test@example.com");
        assertNotNull(found);
        assertEquals("Test User", found.getFullName());
    }

    @Test
    public void testUserDoesNotExist() {
        Patients found = repo.findByEmail("abishekpro@gmail.com");
        assertNull(found);
    }

}
