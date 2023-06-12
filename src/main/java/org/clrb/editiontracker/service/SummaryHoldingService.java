package org.clrb.editiontracker.service;

import org.clrb.editiontracker.constants.EditionConstants;
import org.clrb.editiontracker.model.SummaryHolding;

import java.util.List;

public class SummaryHoldingService {

    public String getSummarizeEditionNumbers(List<SummaryHolding> listSummaryHoldings) {

        StringBuilder summarySB = new StringBuilder();
        int editionNumberRangeStart, editionNumberRangeEnd;

        for(int i = 0; i<listSummaryHoldings.size(); i++) {

            SummaryHolding summaryHolding = listSummaryHoldings.get(i);
            editionNumberRangeStart = editionNumberRangeEnd = summaryHolding.getEditionNumber();

            summarySB.append(summaryHolding.getEditionDescription());
            summarySB.append(EditionConstants.DELIMITER_EDITION_DESCRIPTION_TO_EDITION_DIGITS);
            summarySB.append(editionNumberRangeStart);

            if (summaryHolding.getEditionIssueSummary().equalsIgnoreCase(EditionConstants.STRING_EMPTY)) {
                while (i < listSummaryHoldings.size() - 1) {
                    SummaryHolding summaryHoldingNext = listSummaryHoldings.get(i + 1);
                    if ( (summaryHoldingNext.getEditionIssueSummary().equalsIgnoreCase(EditionConstants.STRING_EMPTY)) & summaryHolding.getEditionDescription().equalsIgnoreCase(summaryHoldingNext.getEditionDescription()) ) {
                        editionNumberRangeEnd = summaryHoldingNext.getEditionNumber();
                        i++;
                    } else {
                        break;
                    }
                }
                if (editionNumberRangeStart != editionNumberRangeEnd) {
                    summarySB.append(EditionConstants.DELIMITER_EDITION_DIGITS + editionNumberRangeEnd);
                }
            } else {
                summarySB.append(EditionConstants.DELIMITER_EDITION_DIGITS_TO_ISSUE_DIGITS);
                summarySB.append(summaryHolding.getEditionIssueSummary());
            }

            summarySB.append(EditionConstants.DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS);


        }

        return summarySB.toString();
    }
}
