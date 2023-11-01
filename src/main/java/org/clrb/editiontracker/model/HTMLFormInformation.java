package org.clrb.editiontracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HTMLFormInformation {

    private String[] arrayEditionDescription;
    private int[] arrayEditionNumber;
    private int[] arrayYear;
    private int[] arrayAvailabilityStatusYear;
    private int[] arrayAvailabilityStatusIssuesOfEachYear;
    private int[] arrayIssuesInTheYear;
    private int editionsPerYear;
    private String googleReCaptchaTokenClient;

}
