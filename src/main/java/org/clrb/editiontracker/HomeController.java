package org.clrb.editiontracker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String home() {
        System.out.println("HomeController.java");
        return "index.html"; // Assuming your HTML file is named "index.html"
    }
}
