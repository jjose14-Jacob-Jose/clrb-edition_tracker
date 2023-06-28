package org.clrb.editiontracker.controller;

import org.clrb.editiontracker.constants.EditionConstants;
import org.clrb.editiontracker.model.HTMLFormInformation;
import org.clrb.editiontracker.model.YearEdition;
import org.clrb.editiontracker.service.EditionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
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
        return "index";
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "welcome";
    }

//    @PostMapping("/postData")
    @PostMapping(value = "/postData", produces = "application/json")
    public ResponseEntity<?> processData(@ModelAttribute HTMLFormInformation htmlFormInformation, Model model) {
        return (editionService.getResponseEntity(htmlFormInformation));
    }

//    Handling exceptions.
    @ExceptionHandler(Exception.class)
    public ModelAndView handleException(Exception exception) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("error"); // Set the view name to your error page (e.g., "error.html")
        modelAndView.addObject("exceptionMessage", exception.toString()); // Add any additional attributes you want to pass to the error page

        return modelAndView;
    }

}
