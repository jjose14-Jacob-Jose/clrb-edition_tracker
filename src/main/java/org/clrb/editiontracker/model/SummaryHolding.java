package org.clrb.editiontracker.model;

public class SummaryHolding {
    private String editionDescription, editionIssueSummary;
    private int editionNumber, editionYear;

    public SummaryHolding() {
    }

    public SummaryHolding(String editionDescription, String editionIssueDescription, int editionNumber, int editionYear) {
        this.editionDescription = editionDescription;
        this.editionIssueSummary = editionIssueDescription;
        this.editionNumber = editionNumber;
        this.editionYear = editionYear;
    }

    @Override
    public String toString() {
        return "SummaryHolding{" +
                "editionDescription='" + editionDescription + '\'' +
                ", editionIssueDescription='" + editionIssueSummary + '\'' +
                ", editionNumber=" + editionNumber +
                ", editionYear=" + editionYear +
                '}';
    }

    public String getEditionDescription() {
        return editionDescription;
    }

    public void setEditionDescription(String editionDescription) {
        this.editionDescription = editionDescription;
    }

    public String getEditionIssueSummary() {
        return editionIssueSummary;
    }

    public void setEditionIssueSummary(String editionIssueSummary) {
        this.editionIssueSummary = editionIssueSummary;
    }

    public int getEditionNumber() {
        return editionNumber;
    }

    public void setEditionNumber(int editionNumber) {
        this.editionNumber = editionNumber;
    }

    public int getEditionYear() {
        return editionYear;
    }

    public void setEditionYear(int editionYear) {
        this.editionYear = editionYear;
    }
}
