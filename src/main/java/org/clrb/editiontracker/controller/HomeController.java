package org.clrb.editiontracker.controller;

import org.clrb.editiontracker.constants.EditionConstants;
import org.clrb.editiontracker.model.HTMLFormInformation;
import org.clrb.editiontracker.model.YearEdition;
import org.clrb.editiontracker.service.EditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

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
        List<YearEdition> listYearEditions =  editionService.getYearEditionList(htmlFormInformation);
        editionService.getSummaryHoldingsDetailed(listYearEditions, htmlFormInformation, EditionConstants.FLAG_ISSUES_ALL_AVAILABLE, EditionConstants.FLAG_ISSUES_SOME_AVAILABLE);
        return "redirect:/index.html";
    }
}
