package org.clrb.editiontracker.service;

import org.clrb.editiontracker.model.SummaryHolding;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SummaryHoldingServiceTest {

    private SummaryHoldingService summaryHoldingService;
    private List<SummaryHolding> listSummaryHoldings;

    private String expected, actual;
    
    @BeforeEach
    void setUp() {
        summaryHoldingService = new SummaryHoldingService();
        listSummaryHoldings = new ArrayList<SummaryHolding>();
    }

    @Test
    void getSummarizeEditionNumbers1() {
        
        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 3, 2003));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 4, 2004));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 5, 2005));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 6, 2006));

        expected = "vol.1-6;";

        actual = summaryHoldingService.getSummarizeEditionNumbers(listSummaryHoldings);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getSummarizeEditionNumbers2() {

        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "3", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 3, 2003));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 4, 2004));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 5, 2005));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 6, 2006));

        expected = "vol.1;vol.2:3;vol.3-6;";

        actual = summaryHoldingService.getSummarizeEditionNumbers(listSummaryHoldings);
        Assertions.assertEquals(expected, actual);
    }
}