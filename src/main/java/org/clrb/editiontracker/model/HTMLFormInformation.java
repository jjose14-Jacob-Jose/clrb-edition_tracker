package org.clrb.editiontracker.model;

import java.util.Arrays;

public class HTMLFormInformation {

    private String [] arrayEditionDescription;
    private int [] arrayEditionNumber, arrayYear, arrayAvailabilityStatusYear, arrayAvailabilityStatusIssuesOfEachYear, arrayIssuesInTheYear;

    private int editionsPerYear;

    public int getEditionsPerYear() {
        return editionsPerYear;
    }

    public void setEditionsPerYear(int editionsPerYear) {
        this.editionsPerYear = editionsPerYear;
    }

    public String[] getArrayEditionDescription() {
        return arrayEditionDescription;
    }

    public void setArrayEditionDescription(String[] arrayEditionDescription) {
        this.arrayEditionDescription = arrayEditionDescription;
    }

    public int[] getArrayEditionNumber() {
        return arrayEditionNumber;
    }

    public void setArrayEditionNumber(int[] arrayEditionNumber) {
        this.arrayEditionNumber = arrayEditionNumber;
    }

    public int[] getArrayYear() {
        return arrayYear;
    }

    public void setArrayYear(int[] arrayYear) {
        this.arrayYear = arrayYear;
    }

    public int[] getArrayAvailabilityStatusYear() {
        return arrayAvailabilityStatusYear;
    }

    public void setArrayAvailabilityStatusYear(int[] arrayAvailabilityStatusYear) {
        this.arrayAvailabilityStatusYear = arrayAvailabilityStatusYear;
    }

    public int[] getArrayAvailabilityStatusIssuesOfEachYear() {
        return arrayAvailabilityStatusIssuesOfEachYear;
    }

    public void setArrayAvailabilityStatusIssuesOfEachYear(int[] arrayAvailabilityStatusIssuesOfEachYear) {
        this.arrayAvailabilityStatusIssuesOfEachYear = arrayAvailabilityStatusIssuesOfEachYear;
    }

    public int[] getArrayIssuesInTheYear() {
        return arrayIssuesInTheYear;
    }

    public void setArrayIssuesInTheYear(int[] arrayIssuesInTheYear) {
        this.arrayIssuesInTheYear = arrayIssuesInTheYear;
    }

    @Override
    public String toString() {
        return "HTMLFormInformation{" +
                "arrayEditionDescription=" + Arrays.toString(arrayEditionDescription) +
                ", arrayEditionNumber=" + Arrays.toString(arrayEditionNumber) +
                ", arrayYear=" + Arrays.toString(arrayYear) +
                ", arrayAvailabilityStatusYear=" + Arrays.toString(arrayAvailabilityStatusYear) +
                ", arrayAvailabilityStatusIssuesOfEachYear=" + Arrays.toString(arrayAvailabilityStatusIssuesOfEachYear) +
                ", arrayIssuesInTheYear=" + Arrays.toString(arrayIssuesInTheYear) +
                ", editionsPerYear=" + editionsPerYear +
                '}';
    }
}