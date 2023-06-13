package org.clrb.editiontracker.service;

import org.clrb.editiontracker.constants.EditionConstants;
import org.clrb.editiontracker.model.HTMLFormInformation;
import org.clrb.editiontracker.model.SummaryHolding;
import org.clrb.editiontracker.model.YearEdition;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@Service
public class EditionService {

//    Get summary-range of indexes that have the 'identifyingValue'.
    public List<String> getArraySummary(int [] array, int arrayIndexStart, int arrayIndexEnd, int arrayIndexOffset, int identifyingValue) {

        List<String> listArraySummarized = new ArrayList<String>();
        if ((arrayIndexStart == arrayIndexEnd) & (array[arrayIndexStart] == identifyingValue)) {
                listArraySummarized.add(String.valueOf(arrayIndexStart + arrayIndexOffset));
        } else if (arrayIndexStart < arrayIndexEnd) {
            int issueRangeStart, issueRangeEnd;
            issueRangeStart = issueRangeEnd = EditionConstants.INVALID_VALUE_INTEGER;
            for (int i = arrayIndexStart; i <= arrayIndexEnd; i++) {
                if (array[i] == identifyingValue) {
                    if (issueRangeStart == EditionConstants.INVALID_VALUE_INTEGER)
                        issueRangeStart = issueRangeEnd = i;
                    else if (i == (issueRangeEnd + 1))
                        issueRangeEnd = i;
                }
                if ((array[i] != identifyingValue) || (i == arrayIndexEnd)) {
                    if (issueRangeStart != EditionConstants.INVALID_VALUE_INTEGER) {
                        if (issueRangeStart == issueRangeEnd)
                            listArraySummarized.add(String.valueOf(issueRangeStart + arrayIndexOffset));
                        else
                            listArraySummarized.add(String.valueOf(issueRangeStart + arrayIndexOffset) + EditionConstants.DELIMITER_EDITION_DIGITS + String.valueOf(issueRangeEnd + arrayIndexOffset));
                    }
                    issueRangeStart = issueRangeEnd = EditionConstants.INVALID_VALUE_INTEGER;
                }
            }
        }
        return listArraySummarized;
    }

//    Return a list of 'YearEdition' where each item represents a year.
    public List<YearEdition> getYearEditionList(HTMLFormInformation htmlFormInformation) {

        List<YearEdition> listYearEditions = new ArrayList<YearEdition>();

        for(int i = 0; i<htmlFormInformation.getArrayEditionNumber().length; i++) {
            YearEdition yearEdition = new YearEdition();
            yearEdition.setEditionTypeDescription(htmlFormInformation.getArrayEditionDescription()[i]);
            yearEdition.setEditionNumber(htmlFormInformation.getArrayEditionNumber()[i]);
            yearEdition.setStatusAvailabilityOfAllIssues(htmlFormInformation.getArrayAvailabilityStatusYear()[i]);
            yearEdition.setYear(htmlFormInformation.getArrayYear()[i]);
            int noOfIssuesAYear = htmlFormInformation.getEditionsPerYear();
            int arrayIndexStartContiguousArray = i * noOfIssuesAYear;
//            Reducing ending-index by '1' because 'getArraySummary' method considers both starting and ending index.
            int arrayIndexEndContiguousArray = arrayIndexStartContiguousArray + noOfIssuesAYear - 1;
            int arrayIndexContiguousArrayOffset = (arrayIndexStartContiguousArray * -1) + 1;
            yearEdition.setListAvailableIssues(getArraySummary(htmlFormInformation.getArrayAvailabilityStatusIssuesOfEachYear(), arrayIndexStartContiguousArray, arrayIndexEndContiguousArray, arrayIndexContiguousArrayOffset, EditionConstants.FLAG_ISSUES_ALL_AVAILABLE));
            yearEdition.setListUnavailableIssues(getArraySummary(htmlFormInformation.getArrayAvailabilityStatusIssuesOfEachYear(), arrayIndexStartContiguousArray, arrayIndexEndContiguousArray, arrayIndexContiguousArrayOffset, EditionConstants.FLAG_ISSUES_NOT_AVAILABLE));

            listYearEditions.add(yearEdition);
        }

        return listYearEditions;
    }

    //    Returns a list of SummaryHolding.
    public List<SummaryHolding> getSummaryHoldingsDetailed(List<YearEdition> listYearEditions, HTMLFormInformation htmlFormInformation, int availabilityStatusOne, int availabilityStatusTwo) {

        List<SummaryHolding> listSummaryHoldings = new ArrayList<SummaryHolding>();

        for (int i = 0; i < htmlFormInformation.getArrayAvailabilityStatusYear().length; i++) {

            int availabilityStatusCurrentYear = htmlFormInformation.getArrayAvailabilityStatusYear()[i];

            if ((availabilityStatusCurrentYear == availabilityStatusOne) || (availabilityStatusCurrentYear == availabilityStatusTwo)) {

                YearEdition yearEdition = listYearEditions.get(i);

                SummaryHolding summaryHolding = new SummaryHolding();
                summaryHolding.setEditionYear(yearEdition.getYear());
                summaryHolding.setEditionDescription(yearEdition.getEditionTypeDescription());
                summaryHolding.setEditionNumber(yearEdition.getEditionNumber());

                List<String> summaryOfRequestedIssues = new ArrayList<>();
//                Issues numbers are to be added only if the some issues are available/unavailable. Checking this by checking size of other arraylist.
                if ((availabilityStatusOne == EditionConstants.FLAG_ISSUES_ALL_AVAILABLE) & (yearEdition.getListUnavailableIssues().size() != 0)) {
                    summaryOfRequestedIssues = yearEdition.getListAvailableIssues();
                } else if ((yearEdition.getListAvailableIssues().size() != 0)) {
                    summaryOfRequestedIssues = yearEdition.getListUnavailableIssues();
                }

                StringBuilder summaryHoldingsSB = new StringBuilder("");
                for (int j = 0; j < summaryOfRequestedIssues.size(); j++) {
                    summaryHoldingsSB.append(summaryOfRequestedIssues.get(j));
//                    Checking to ensure a delimiter is not added after the last element.
                    if (j < summaryOfRequestedIssues.size() - 1) {
                        summaryHoldingsSB.append(EditionConstants.DELIMITER_SUMMARY_HOLDINGS_BETWEEN_ISSUES_OF_A_YEAR);
                    }
                }
                summaryHolding.setEditionIssueSummary(summaryHoldingsSB.toString());
                summaryHoldingsSB.append(EditionConstants.DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS);

                listSummaryHoldings.add(summaryHolding);
            }
        }
        return listSummaryHoldings;
    }

    public String getModel(HTMLFormInformation htmlFormInformation, Model modelResponse, String returnViewName) {

        List<YearEdition> listYearEditions= getYearEditionList(htmlFormInformation);
        List<SummaryHolding> listSummaryHoldingsAvailable = getSummaryHoldingsDetailed(listYearEditions, htmlFormInformation, EditionConstants.FLAG_ISSUES_ALL_AVAILABLE , EditionConstants.FLAG_ISSUES_SOME_AVAILABLE);
        List<SummaryHolding> listSummaryHoldingsUnavailable = getSummaryHoldingsDetailed(listYearEditions, htmlFormInformation, EditionConstants.FLAG_ISSUES_NOT_AVAILABLE , EditionConstants.FLAG_ISSUES_SOME_AVAILABLE);

        SummaryHoldingService summaryHoldingService = new SummaryHoldingService();

        modelResponse.addAttribute(EditionConstants.HTML_ELEMENT_NAME_SUMMARY_MISSING_WITH_YEAR, summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldingsUnavailable, true));
        modelResponse.addAttribute(EditionConstants.HTML_ELEMENT_NAME_SUMMARY_AVAILABLE_WITH_YEAR, summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldingsAvailable, true));
        modelResponse.addAttribute(EditionConstants.HTML_ELEMENT_NAME_SUMMARY_AVAILABLE_SUMMARY_HOLDINGS, summaryHoldingService.getSummaryHoldingStandardFormat(listSummaryHoldingsAvailable));

        return returnViewName;
    }


}
