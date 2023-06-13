package org.clrb.editiontracker.controller;

import org.clrb.editiontracker.constants.EditionConstants;
import org.clrb.editiontracker.model.HTMLFormInformation;
import org.clrb.editiontracker.model.YearEdition;
import org.clrb.editiontracker.service.EditionService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class EditionController {

    private final EditionService editionService;

    public EditionController(EditionService editionService) {
        this.editionService = editionService;
    }

    @GetMapping("/")
    public String home() {
        System.out.println("EditionController.java: @GetMapping(\"/\")");
        return "index.html";
    }

    @PostMapping("/postData")
    public String processData(@ModelAttribute HTMLFormInformation htmlFormInformation, Model model) {
        editionService.getModel(htmlFormInformation, model, "index");
        return "redirect:/index.html";
    }
}
