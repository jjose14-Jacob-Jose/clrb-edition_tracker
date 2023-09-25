package org.clrb.editiontracker.service;

import org.clrb.editiontracker.constants.EditionConstants;
import org.clrb.editiontracker.model.SummaryHolding;

import java.util.List;

public class SummaryHoldingService {

    private StringBuilder summarySB;

//    Get summary holdings with issue-level information.
    public String getSummaryHoldingWithIssueDetails(List<SummaryHolding> listSummaryHoldings, boolean showYearInformationAlso) {

        summarySB = new StringBuilder();
        int editionRangeStartNumber, editionRangeEndNumber, editionRangeStartYear, editionRangeEndYear;

        for(int i = 0; i<listSummaryHoldings.size(); i++) {

            SummaryHolding summaryHolding = listSummaryHoldings.get(i);
            editionRangeStartNumber = editionRangeEndNumber = summaryHolding.getEditionNumber();
            editionRangeStartYear = editionRangeEndYear = summaryHolding.getEditionYear();

            summarySB.append(summaryHolding.getEditionDescription());
            summarySB.append(EditionConstants.DELIMITER_EDITION_DESCRIPTION_TO_EDITION_DIGITS);
            summarySB.append(editionRangeStartNumber);

            if (summaryHolding.getEditionIssueSummary().equalsIgnoreCase(EditionConstants.STRING_EMPTY)) {

                if (showYearInformationAlso & listSummaryHoldings.size() == 1) {
//                    If there is only 1 entry.
                    summarySB.append(EditionConstants.DELIMITER_YEAR_START + editionRangeStartYear + EditionConstants.DELIMITER_YEAR_END);
                }

                while (i < listSummaryHoldings.size() - 1) {
                    SummaryHolding summaryHoldingNext = listSummaryHoldings.get(i + 1);
                    if ( (summaryHoldingNext.getEditionIssueSummary().equalsIgnoreCase(EditionConstants.STRING_EMPTY)) & summaryHolding.getEditionDescription().equalsIgnoreCase(summaryHoldingNext.getEditionDescription()) & (summaryHoldingNext.getEditionNumber() == editionRangeEndNumber + 1)) {
                        editionRangeEndNumber = summaryHoldingNext.getEditionNumber();
                        editionRangeEndYear = summaryHoldingNext.getEditionYear();
                        i++;
                    } else {
                        if(showYearInformationAlso & editionRangeStartNumber == editionRangeEndNumber) {
//                            Adding year at end of volume.
                            summarySB.append(EditionConstants.DELIMITER_YEAR_START + editionRangeStartYear + EditionConstants.DELIMITER_YEAR_END);
                        }
                        break;
                    }
                }
                if (editionRangeStartNumber != editionRangeEndNumber) {
                    summarySB.append(EditionConstants.DELIMITER_EDITION_DIGITS + editionRangeEndNumber);
                    if (showYearInformationAlso) {
                        summarySB.append(EditionConstants.DELIMITER_YEAR_START + editionRangeStartYear + EditionConstants.DELIMITER_YEAR_END);
                        summarySB.append(EditionConstants.DELIMITER_EDITION_DIGITS);
                        summarySB.append(EditionConstants.DELIMITER_YEAR_START + editionRangeEndYear + EditionConstants.DELIMITER_YEAR_END);
                    }
                }
            } else {
                summarySB.append(EditionConstants.DELIMITER_EDITION_DIGITS_TO_ISSUE_DIGITS);
                summarySB.append(summaryHolding.getEditionIssueSummary());
                if (showYearInformationAlso) {
                    summarySB.append(EditionConstants.DELIMITER_YEAR_START + editionRangeStartYear + EditionConstants.DELIMITER_YEAR_END);
                }
            }

            summarySB.append(EditionConstants.DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS);


        }

        return summarySB.toString();
    }

    public String getSummaryHoldingStandardFormat(List<SummaryHolding> listSummaryHoldings) {

        summarySB = new StringBuilder();
        int editionRangeStartNumber, editionRangeEndNumber, editionRangeStartYear, editionRangeEndYear, offsetFromStart;

        for(int i = 0; i<listSummaryHoldings.size(); i++) {

            SummaryHolding summaryHolding = listSummaryHoldings.get(i);
            editionRangeStartNumber = editionRangeEndNumber = summaryHolding.getEditionNumber();
            editionRangeStartYear = editionRangeEndYear = summaryHolding.getEditionYear();
            offsetFromStart = 1;

            summarySB.append(editionRangeStartNumber);
            summarySB.append(EditionConstants.DELIMITER_YEAR_START + editionRangeStartYear + EditionConstants.DELIMITER_YEAR_END);

            while (i < listSummaryHoldings.size() - 1) {
                SummaryHolding summaryHoldingNext = listSummaryHoldings.get(i+1);
                if (summaryHoldingNext.getEditionNumber() == (summaryHolding.getEditionNumber() +  offsetFromStart)) {
                    editionRangeEndNumber = summaryHoldingNext.getEditionNumber();
                    editionRangeEndYear = summaryHoldingNext.getEditionYear();
                    i++;
                    offsetFromStart++;
                } else {
//                    Reducing index 'i' by '1' to negate 'i++' of for-loop.
//                    i--;
                    break;
                }
            }
            if (editionRangeStartNumber != editionRangeEndNumber) {
                summarySB.append(EditionConstants.DELIMITER_EDITION_DIGITS + editionRangeEndNumber);
                summarySB.append(EditionConstants.DELIMITER_YEAR_START + editionRangeEndYear + EditionConstants.DELIMITER_YEAR_END);
            }

//            Identifying which delimiter to append at the end.
            if(i >= (listSummaryHoldings.size() - 1) ) {
//                Delimiter at the end of summary holdings.
//                summarySB.append(EditionConstants.DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS);
            } else {
                summarySB.append(EditionConstants.DELIMITER_SUMMARY_HOLDINGS_BETWEEN_ISSUES_OF_A_YEAR);
            }



        }

        return summarySB.toString();
    }
}
