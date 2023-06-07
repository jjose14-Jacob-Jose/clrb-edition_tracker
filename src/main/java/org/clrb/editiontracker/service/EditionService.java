package org.clrb.editiontracker.service;

import org.clrb.editiontracker.constants.EditionConstants;
import org.clrb.editiontracker.model.YearEdition;

import java.util.ArrayList;
import java.util.List;

public class EditionService {



    public List<String> getArraySummary(int [] arrayDetailed, int identifyingValue) {

        if (arrayDetailed.length < 1) {
            return null;
        } else if (arrayDetailed.length == 1) {
            if(arrayDetailed[0] == identifyingValue) {
                return new ArrayList<>(List.of("1"));
            } else {
                return null;
            }
        }
        else {
            List<String> listArraySummarized = new ArrayList<String>();
            int issueRangeStart, issueRangeEnd;
            issueRangeStart = issueRangeEnd = EditionConstants.INVALID_VALUE_INTEGER;
            for(int i=0; i<arrayDetailed.length; i++) {
                if (arrayDetailed[i] == identifyingValue) {
                    if (issueRangeStart == EditionConstants.INVALID_VALUE_INTEGER)
                        issueRangeStart = issueRangeEnd = i;
                    else if ( i == (issueRangeEnd + 1) )
                        issueRangeEnd = i;
                } else {
                    if (issueRangeStart != EditionConstants.INVALID_VALUE_INTEGER) {
                        if (issueRangeStart == issueRangeEnd)
                            listArraySummarized.add(String.valueOf(issueRangeStart));
                         else
                            listArraySummarized.add(String.valueOf(issueRangeStart) + EditionConstants.SEPARATOR_ISSUES + String.valueOf(issueRangeEnd));
                    }
                    issueRangeStart = issueRangeEnd = EditionConstants.INVALID_VALUE_INTEGER;
                }

            }
            return listArraySummarized;

        }


    }


}
