package com.amaze.controller;

import com.amaze.entity.MedicalRecords;
import com.amaze.entity.Patients;
import com.amaze.repository.MedicalRecordRepo;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class MedicalHistoryController {

    @Autowired
    private MedicalRecordRepo recordsRepo;

    @GetMapping("/medicalHistory")
    public String showHistory(HttpSession session, Model model) {
        Patients patient = (Patients) session.getAttribute("loggedInPatient");
        if (patient == null) {
            return "redirect:/patient_login.jsp";
        }

        List<MedicalRecords> records = recordsRepo.findByPatientId(patient.getId());
        model.addAttribute("records", records);
        return "medical_history.jsp";
    }


}
