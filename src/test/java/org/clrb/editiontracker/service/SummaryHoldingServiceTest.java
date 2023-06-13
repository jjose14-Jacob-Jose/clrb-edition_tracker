package org.clrb.editiontracker.service;

import org.clrb.editiontracker.model.SummaryHolding;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

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

        actual = summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldings, false);
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

    actual = summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldings, false);
        Assertions.assertEquals(expected, actual);
}

    @Test
    void getSummarizeEditionNumbers3() {

        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "3", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 3, 2003));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 4, 2004));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 5, 2005));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 6, 2006));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "3-5", 7, 2007));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 8, 2008));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 9, 2009));

        expected = "vol.1;vol.2:3;vol.3;vol-B.4;vol.5-6;vol-B.7:3-5;vol-B.8-9;";

        actual = summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldings, false);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getSummarizeEditionNumbers4() {

        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 3, 2003));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 4, 2004));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 5, 2005));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 6, 2006));

        expected = "vol.1(2001)-6(2006);";

        actual = summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldings, true);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getSummarizeEditionNumbers5() {

        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "3", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 3, 2003));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 4, 2004));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 5, 2005));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 6, 2006));

        expected = "vol.1(2001);vol.2(2002):3;vol.3(2003)-6(2006);";

        actual = summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldings, true);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getSummarizeEditionNumbers6() {

        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "3", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 3, 2003));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 4, 2004));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 5, 2005));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 6, 2006));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "3-5", 7, 2007));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 8, 2008));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 9, 2009));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 10, 2010));

        expected = "vol.1(2001);vol.2(2002):3;vol.3(2003);vol-B.4(2004);vol.5(2005)-6(2006);vol-B.7(2007):3-5;vol-B.8(2008)-10(2010);";

        actual = summaryHoldingService.getSummaryHoldingWithIssueDetails(listSummaryHoldings, true);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getSummaryHoldingStandardFormat1() {

        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 3, 2003));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 4, 2004));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 5, 2005));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 6, 2006));

        expected = "1(2001)-6(2006)";

        actual = summaryHoldingService.getSummaryHoldingStandardFormat(listSummaryHoldings);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getSummaryHoldingStandardFormat2() {

        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "3", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 3, 2003));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 4, 2004));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 5, 2005));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 6, 2006));

        expected = "1(2001)-6(2006)";

        actual = summaryHoldingService.getSummaryHoldingStandardFormat(listSummaryHoldings);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getSummaryHoldingStandardFormat3() {

        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "3", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 3, 2003));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 4, 2004));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 5, 2005));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 6, 2006));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "3-5", 7, 2007));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 8, 2008));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 9, 2009));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 10, 2010));

        expected = "1(2001)-10(2010)";

        actual = summaryHoldingService.getSummaryHoldingStandardFormat(listSummaryHoldings);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getSummaryHoldingStandardFormat4() {

        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 3, 2008));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 4, 2009));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 5, 2010));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 6, 2011));

        expected = "1(2001)-6(2011)";

        actual = summaryHoldingService.getSummaryHoldingStandardFormat(listSummaryHoldings);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getSummaryHoldingStandardFormat5() {

        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "3", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 30, 2013));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 31, 2014));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 32, 2015));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 33, 2016));

        expected = "1(2001)-2(2002),30(2013)-33(2016)";

        actual = summaryHoldingService.getSummaryHoldingStandardFormat(listSummaryHoldings);
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void getSummaryHoldingStandardFormat6() {

        listSummaryHoldings.add(new SummaryHolding("vol", "", 1, 2001));
        listSummaryHoldings.add(new SummaryHolding("vol", "3", 2, 2002));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 3, 2003));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 4, 2004));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 5, 2005));
        listSummaryHoldings.add(new SummaryHolding("vol", "", 6, 2006));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "3-5", 7, 2007));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 8, 2008));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 9, 2009));
        listSummaryHoldings.add(new SummaryHolding("vol-B", "", 10, 2010));

        expected = "1(2001)-10(2010)";

        actual = summaryHoldingService.getSummaryHoldingStandardFormat(listSummaryHoldings);
        Assertions.assertEquals(expected, actual);
    }
}