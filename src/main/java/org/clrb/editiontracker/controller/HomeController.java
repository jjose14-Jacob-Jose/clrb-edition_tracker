package org.clrb.editiontracker.controller;

import org.clrb.editiontracker.model.HTMLFormInformation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String home() {
        System.out.println("HomeController.java: @GetMapping(\"/\")");
        return "index.html";
    }

    @PostMapping("/postData")
    public String processData(@ModelAttribute HTMLFormInformation HTMLFormInformation) {
        System.out.println("HomeController.java: @PostMapping(\"/post\")");
        System.out.println(HTMLFormInformation.toString());
        return "redirect:/index.html";
    }
}
