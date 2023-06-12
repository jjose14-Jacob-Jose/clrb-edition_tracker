package org.clrb.editiontracker.model;

import java.util.List;

public class YearEdition {

    private String editionTypeDescription;
    private int editionNumber;
    private int year;
    private int statusAvailabilityOfAllIssues;

    public int getEditionsPerYear() {
        return editionsPerYear;
    }

    public void setEditionsPerYear(int editionsPerYear) {
        this.editionsPerYear = editionsPerYear;
    }

    private int editionsPerYear;
    private List<String> listAvailableIssues, listUnavailableIssues;

    public String getEditionTypeDescription() {
        return editionTypeDescription;
    }

    public void setEditionTypeDescription(String editionTypeDescription) {
        this.editionTypeDescription = editionTypeDescription;
    }

    public int getEditionNumber() {
        return editionNumber;
    }

    public void setEditionNumber(int editionNumber) {
        this.editionNumber = editionNumber;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getStatusAvailabilityOfAllIssues() {
        return statusAvailabilityOfAllIssues;
    }

    public void setStatusAvailabilityOfAllIssues(int statusAvailabilityOfAllIssues) {
        this.statusAvailabilityOfAllIssues = statusAvailabilityOfAllIssues;
    }

    public List<String> getListAvailableIssues() {
        return listAvailableIssues;
    }

    public void setListAvailableIssues(List<String> listAvailableIssues) {
        this.listAvailableIssues = listAvailableIssues;
    }

    public List<String> getListUnavailableIssues() {
        return listUnavailableIssues;
    }

    public void setListUnavailableIssues(List<String> listUnavailableIssues) {
        this.listUnavailableIssues = listUnavailableIssues;
    }

    @Override
    public String toString() {
        return "YearEdition{" +
                "editionTypeDescription='" + editionTypeDescription + '\'' +
                ", editionNumber=" + editionNumber +
                ", year=" + year +
                ", statusAvailabilityOfAllIssues=" + statusAvailabilityOfAllIssues +
                ", editionsPerYear=" + editionsPerYear +
                ", listAvailableIssues=" + listAvailableIssues +
                ", listUnavailableIssues=" + listUnavailableIssues +
                '}';
    }
}
