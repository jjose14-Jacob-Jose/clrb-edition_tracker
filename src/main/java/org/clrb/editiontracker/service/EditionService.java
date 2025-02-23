package org.clrb.editiontracker.service;

import org.clrb.editiontracker.constants.EditionConstants;
import org.clrb.editiontracker.model.HTMLFormInformation;
import org.clrb.editiontracker.model.SummaryHolding;
import org.clrb.editiontracker.model.YearEdition;
import org.clrb.editiontracker.util.ApplicationMonitor;
import org.clrb.editiontracker.util.EditionTrackerLogger;
import org.clrb.editiontracker.util.RecaptchaUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EditionService {

//    Get summary-range of indexes that have the 'identifyingValue'.
    public List<String> getArraySummary(int [] array, int arrayIndexStart, int arrayIndexEnd, int arrayIndexOffset, int identifyingValue) {

        EditionTrackerLogger.logInfo("EditionService - entering getArraySummary()");
        List<String> listArraySummarized = new ArrayList<>();
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
                            listArraySummarized.add(issueRangeStart + arrayIndexOffset + EditionConstants.DELIMITER_EDITION_DIGITS + (issueRangeEnd + arrayIndexOffset));
                    }
                    issueRangeStart = issueRangeEnd = EditionConstants.INVALID_VALUE_INTEGER;
                }
            }
        }
        EditionTrackerLogger.logInfo("EditionService - exiting getArraySummary()");
        return listArraySummarized;
    }

//    Return a list of 'YearEdition' where each item represents a year.
    public List<YearEdition> getYearEditionList(HTMLFormInformation htmlFormInformation) {

        EditionTrackerLogger.logInfo("EditionService - entering -  getYearEditionList()");

        List<YearEdition> listYearEditions = new ArrayList<>();

        int arrayIndexStartContiguousArray, arrayIndexEndContiguousArray;
        arrayIndexStartContiguousArray = arrayIndexEndContiguousArray = 0;
        for(int i = 0; i<htmlFormInformation.getArrayEditionNumber().length; i++) {
            YearEdition yearEdition = new YearEdition();
            yearEdition.setEditionTypeDescription(htmlFormInformation.getArrayEditionDescription()[i]);
            yearEdition.setEditionNumber(htmlFormInformation.getArrayEditionNumber()[i]);
            yearEdition.setStatusAvailabilityOfAllIssues(htmlFormInformation.getArrayAvailabilityStatusYear()[i]);
            yearEdition.setYear(htmlFormInformation.getArrayYear()[i]);
//            int arrayIndexContiguousArrayOffset = (arrayIndexStartContiguousArray * -1) + 1;

//            '-1' to be reduced from indices at start.
            if (arrayIndexEndContiguousArray == 0) {
                arrayIndexStartContiguousArray = arrayIndexEndContiguousArray;
                arrayIndexEndContiguousArray = arrayIndexEndContiguousArray + htmlFormInformation.getArrayIssuesInTheYear()[i] -1;

            } else {
                arrayIndexStartContiguousArray = arrayIndexEndContiguousArray + 1;
                arrayIndexEndContiguousArray = arrayIndexEndContiguousArray + htmlFormInformation.getArrayIssuesInTheYear()[i];
            }
            int arrayIndexContiguousArrayOffset = arrayIndexStartContiguousArray * -1 + 1;
            yearEdition.setListAvailableIssues(getArraySummary(htmlFormInformation.getArrayAvailabilityStatusIssuesOfEachYear(), arrayIndexStartContiguousArray, arrayIndexEndContiguousArray, arrayIndexContiguousArrayOffset, EditionConstants.FLAG_ISSUES_ALL_AVAILABLE));
            yearEdition.setListUnavailableIssues(getArraySummary(htmlFormInformation.getArrayAvailabilityStatusIssuesOfEachYear(), arrayIndexStartContiguousArray, arrayIndexEndContiguousArray, arrayIndexContiguousArrayOffset, EditionConstants.FLAG_ISSUES_NOT_AVAILABLE));

            listYearEditions.add(yearEdition);
        }

        EditionTrackerLogger.logInfo("EditionService - exiting -  getYearEditionList()");
        return listYearEditions;
    }

    //    Returns a list of SummaryHolding.
    public List<SummaryHolding> getSummaryHoldingsDetailed(List<YearEdition> listYearEditions, HTMLFormInformation htmlFormInformation, int availabilityStatusOne, int availabilityStatusTwo) {

        EditionTrackerLogger.logInfo("EditionService - entering - getSummaryHoldingsDetailed()");
        List<SummaryHolding> listSummaryHoldings = new ArrayList<>();

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
                if ((availabilityStatusOne == EditionConstants.FLAG_ISSUES_ALL_AVAILABLE) & (!yearEdition.getListUnavailableIssues().isEmpty())) {
                    summaryOfRequestedIssues = yearEdition.getListAvailableIssues();
                } else if ((!yearEdition.getListAvailableIssues().isEmpty())) {
                    summaryOfRequestedIssues = yearEdition.getListUnavailableIssues();
                }

                StringBuilder summaryHoldingsSB = new StringBuilder();
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
        EditionTrackerLogger.logInfo("EditionService - exiting - getSummaryHoldingsDetailed() - listSummaryHoldings:" + listSummaryHoldings);
        return listSummaryHoldings;
    }

    public ResponseEntity<?> getResponseEntity(HTMLFormInformation htmlFormInformation) {

        EditionTrackerLogger.logInfo("EditionService - entering getResponseEntity()");
        try {

            if(htmlFormInformation == null){
                throw new NullPointerException();
            }
//            Validation Google reCaptcha.
//            Uncomment the following in production.
            {
                String googleReCaptchaValidationToken = htmlFormInformation.getGoogleReCaptchaTokenClient();
                boolean googleReCaptchaValidationStatus = RecaptchaUtil.validateRecaptcha(googleReCaptchaValidationToken);

                if (!googleReCaptchaValidationStatus) {
                    String errorMessage = "Failed to validated Google reCaptcha Token()";
                    EditionTrackerLogger.logInfo(errorMessage);
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
                }
            }

            List<YearEdition> listYearEditions = getYearEditionList(htmlFormInformation);
            List<SummaryHolding> listSummaryHoldingsAvailable = getSummaryHoldingsDetailed(listYearEditions, htmlFormInformation, EditionConstants.FLAG_ISSUES_ALL_AVAILABLE, EditionConstants.FLAG_ISSUES_SOME_AVAILABLE);
            List<SummaryHolding> listSummaryHoldingsUnavailable = getSummaryHoldingsDetailed(listYearEditions, htmlFormInformation, EditionConstants.FLAG_ISSUES_NOT_AVAILABLE, EditionConstants.FLAG_ISSUES_SOME_AVAILABLE);

            SummaryHoldingService summaryHoldingService = new SummaryHoldingService();
            Map<String, Object> responseData = new HashMap<>();

            responseData.put(EditionConstants.HTML_ELEMENT_NAME_SUMMARY_MISSING_WITHOUT_YEAR, summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldingsUnavailable, false));
            responseData.put(EditionConstants.HTML_ELEMENT_NAME_SUMMARY_MISSING_WITH_YEAR, summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldingsUnavailable, true));
            responseData.put(EditionConstants.HTML_ELEMENT_NAME_SUMMARY_AVAILABLE_WITH_YEAR, summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldingsAvailable, true));
            responseData.put(EditionConstants.HTML_ELEMENT_NAME_SUMMARY_AVAILABLE_WITHOUT_YEAR, summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldingsAvailable, false));
            responseData.put(EditionConstants.HTML_ELEMENT_NAME_SUMMARY_AVAILABLE_SUMMARY_HOLDINGS, summaryHoldingService.getSummaryHoldingStandardFormat(listSummaryHoldingsAvailable));

            EditionTrackerLogger.logInfo("EditionService - exiting - getResponseEntity() - responseData(" + responseData + ")");
            ApplicationMonitor.usageLog("Calculated summary. Response: " + responseData, "EditionTracker)");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(responseData);
        } catch (Exception exception) {
            EditionTrackerLogger.logError("EditionServer - exception - ", exception);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.toString());
        }

    }


}
