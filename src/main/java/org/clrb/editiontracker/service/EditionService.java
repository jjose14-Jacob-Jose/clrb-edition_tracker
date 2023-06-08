package org.clrb.editiontracker.service;

import org.clrb.editiontracker.constants.EditionConstants;
import org.clrb.editiontracker.model.HTMLFormInformation;
import org.clrb.editiontracker.model.YearEdition;
import org.springframework.stereotype.Service;

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
                            listArraySummarized.add(String.valueOf(issueRangeStart + arrayIndexOffset) + EditionConstants.SEPARATOR_ISSUES + String.valueOf(issueRangeEnd + arrayIndexOffset));
                    }
                    issueRangeStart = issueRangeEnd = EditionConstants.INVALID_VALUE_INTEGER;
                }
            }
        }
        return listArraySummarized;
    }

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

}
