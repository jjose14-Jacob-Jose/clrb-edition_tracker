package org.clrb.editiontracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SummaryHolding {
    private String editionDescription;
    private String editionIssueSummary;
    private int editionNumber;
    private int editionYear;

}
