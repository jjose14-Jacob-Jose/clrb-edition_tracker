package org.clrb.editiontracker.service;

import org.clrb.editiontracker.constants.EditionConstants;

import java.util.ArrayList;
import java.util.List;

public class EditionService {

//    Get a range of indexes that have the 'identifyingValue'.
    public List<String> getArraySummaryWithStartIndexOne(int [] arrayDetailed, int identifyingValue) {

        List<String> listArraySummarized = new ArrayList<String>();
        int indexOffset = 1;

        if (arrayDetailed.length == 1) {
            if (arrayDetailed[0] == identifyingValue)
                listArraySummarized.add(String.valueOf(indexOffset));

        } else if (arrayDetailed.length >= 1) {
            int issueRangeStart, issueRangeEnd;
            issueRangeStart = issueRangeEnd = EditionConstants.INVALID_VALUE_INTEGER;
            for (int i = 0; i < arrayDetailed.length; i++) {
                if (arrayDetailed[i] == identifyingValue) {
                    if (issueRangeStart == EditionConstants.INVALID_VALUE_INTEGER)
                        issueRangeStart = issueRangeEnd = i;
                    else if (i == (issueRangeEnd + 1))
                        issueRangeEnd = i;
                }
                if ((arrayDetailed[i] != identifyingValue) || (i == arrayDetailed.length - 1)) {
                    if (issueRangeStart != EditionConstants.INVALID_VALUE_INTEGER) {
                        if (issueRangeStart == issueRangeEnd)
                            listArraySummarized.add(String.valueOf(issueRangeStart + indexOffset));
                        else
                            listArraySummarized.add(String.valueOf(issueRangeStart + indexOffset) + EditionConstants.SEPARATOR_ISSUES + String.valueOf(issueRangeEnd + indexOffset));
                    }
                    issueRangeStart = issueRangeEnd = EditionConstants.INVALID_VALUE_INTEGER;
                }
            }
        }
        return listArraySummarized;
    }

}
