package org.clrb.editiontracker.controller;

import org.clrb.editiontracker.model.HTMLFormInformation;
import org.clrb.editiontracker.service.EditionService;
import org.clrb.editiontracker.util.ApplicationMonitor;
import org.clrb.editiontracker.util.EditionTrackerLogger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class EditionController {

    private final EditionService editionService;

    public EditionController(EditionService editionService) {
        this.editionService = editionService;
    }

    @GetMapping("/")
    public String home() {
        try {
            EditionTrackerLogger.logInfo("EditionController - @GetMapping(\"/\") - home()");
            ApplicationMonitor.usageLog("Clicked on /: ", "EditionTracker)");
            return "index";
        } catch (Exception exception) {
            ApplicationMonitor.usageLog("Error on /: " + exception, "EditionTracker)");
            EditionTrackerLogger.logError("ERROR - EditionController - @GetMapping(\"/\") - home()", exception);
            return "error";
        }
    }

    @GetMapping("/welcome")
    public String welcome() {
        try {
            EditionTrackerLogger.logInfo("EditionController - @GetMapping(\"/welcome\") - welcome()");
            return "welcome";
        } catch (Exception exception) {
            ApplicationMonitor.usageLog("Error on /welcome: " + exception, "EditionTracker)");
            EditionTrackerLogger.logError("ERROR - EditionController - @GetMapping(\"/welcome\") - welcome()", exception);
            return "error";
        }
    }

//    @PostMapping("/postData")
    @PostMapping(value = "/postData", produces = "application/json")
    public ResponseEntity<?> processData(@ModelAttribute HTMLFormInformation htmlFormInformation, Model model) {
        try {
            EditionTrackerLogger.logInfo("EditionController - @PostMapping(value = \"/postData\", produces = \"application/json\") - processData( " + htmlFormInformation.toString() + ", " + model.toString() + ")");
            return (editionService.getResponseEntity(htmlFormInformation));
        } catch (Exception exception) {
            ApplicationMonitor.usageLog("Error on /postData: " + exception, "EditionTracker)");
            EditionTrackerLogger.logError("ERROR - EditionController - @PostMapping(value = \"/postData\", produces = \"application/json\") - processData( " + htmlFormInformation.toString() + ", " + model.toString() + ")", exception);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

//    Handling exceptions.
    @ExceptionHandler(Exception.class)
    public ModelAndView handleException(Exception exception) {
        try {
            EditionTrackerLogger.logInfo("EditionController - @ExceptionHandler(Exception.class) - handleException( " + exception.toString() + ")");
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName("error"); // Set the view name to your error page (e.g., "error.html")
            modelAndView.addObject("exceptionMessage", exception.toString()); // Specify attributes you want to pass to the error page.
            ApplicationMonitor.usageLog("Error in controller. Redirecting to error.html. Exception: " + exception, "EditionTracker)");
            return modelAndView;

        } catch (Exception exceptionLocal) {
            ApplicationMonitor.usageLog("Error inside handleException: " + exceptionLocal, "EditionTracker)");
            EditionTrackerLogger.logError("ERROR - EditionController - @ExceptionHandler(Exception.class) - handleException( " + exception.toString() + ")", exception);
            return null;
        }
    }

}
