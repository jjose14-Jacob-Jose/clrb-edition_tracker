package org.clrb.editiontracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class YearEdition {

    private String editionTypeDescription;
    private int editionNumber;
    private int year;
    private int statusAvailabilityOfAllIssues;
    private int editionsPerYear;
    private List<String> listAvailableIssues;
    private List<String> listUnavailableIssues;
}
