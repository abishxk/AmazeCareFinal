package com.amaze.reactController;
import com.amaze.repository.MedicationsRepo;
import com.amaze.entity.Medication;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/react/medications")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class MedicationsReactController {

    @Autowired
    private MedicationsRepo medicationsRepo;

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String name, HttpSession session) {
        if (session.getAttribute("loggedInDoctor") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }
        List<Medication> meds = medicationsRepo.findByNameStartingWithIgnoreCase(name);
        List<Map<String, Object>> list = meds.stream().map(m -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", m.getId());
            map.put("name", m.getName());
            map.put("url", m.getUrl());
            return map;
        }).toList();
        return ResponseEntity.ok(list);
    }
}