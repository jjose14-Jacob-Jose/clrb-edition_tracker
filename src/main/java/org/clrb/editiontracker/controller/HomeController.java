package org.clrb.editiontracker.controller;

import org.clrb.editiontracker.model.HTMLFormInformation;
import org.clrb.editiontracker.service.EditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HomeController {

    private final EditionService editionService;

    public HomeController(EditionService editionService) {
        this.editionService = editionService;
    }

    @GetMapping("/")
    public String home() {
        System.out.println("HomeController.java: @GetMapping(\"/\")");
        return "index.html";
    }

    @PostMapping("/postData")
    public String processData(@ModelAttribute HTMLFormInformation htmlFormInformation) {
        System.out.println("HomeController.java: @PostMapping(\"/post\")");
        System.out.println(htmlFormInformation.toString());
        editionService.getYearEditionList(htmlFormInformation);
        return "redirect:/index.html";
    }
}
