package org.clrb.editiontracker.model;

import java.util.Arrays;
import java.util.List;

public class HTMLFormInformation {

    private String [] arrayEditionDescription;
    private int [] arrayEditionNumber, arrayYear, arrayAvailabilityStatusYear, arrayAvailabilityStatusIssuesOfEachYear;

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

    @Override
    public String toString() {
        return "HTMLFormInformation{" +
                "arrayEditionDescription=" + Arrays.toString(arrayEditionDescription) +
                ", arrayEditionNumber=" + Arrays.toString(arrayEditionNumber) +
                ", arrayYear=" + Arrays.toString(arrayYear) +
                ", arrayAvailabilityStatusYear=" + Arrays.toString(arrayAvailabilityStatusYear) +
                ", arrayAvailabilityStatusIssuesOfEachYear=" + Arrays.toString(arrayAvailabilityStatusIssuesOfEachYear) +
                '}';
    }
}
