package org.clrb.editiontracker.service;

import org.clrb.editiontracker.constants.EditionConstants;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

class EditionServiceTest {

    @Test
    void getArraySummary1() {
        EditionService editionService = new EditionService();

        int [] arrayDetailed = {1, 1, 0, 0, 1, 1, 1, 0};
        int arrayIndexStart = 0;
        int arrayIndexEnd = arrayDetailed.length-1;
        int identifyingValue = 1;
        List<String> listActual = List.of("1-2", "5-7");

        List<String> listExpected = editionService.getArraySummary(arrayDetailed, arrayIndexStart, arrayIndexEnd, EditionConstants.INDEX_OFFSET, identifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }

    @Test
    void getArraySummary2() {
        EditionService editionService = new EditionService();

        int [] arrayDetailed = {1, 1, 0, 0, 1, 1, 1, 1};
        int arrayIndexStart = 0;
        int arrayIndexEnd = arrayDetailed.length-1;
        int identifyingValue = 1;
        List<String> listActual = List.of("1-2", "5-8");

        List<String> listExpected = editionService.getArraySummary(arrayDetailed, arrayIndexStart, arrayIndexEnd, EditionConstants.INDEX_OFFSET, identifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }

    @Test
    void getArraySummary3() {
        EditionService editionService = new EditionService();

        int [] arrayDetailed = {1, 1, 0, 1, 0, 1, 1, 0, 1};
        int arrayIndexStart = 0;
        int arrayIndexEnd = arrayDetailed.length-1;
        int identifyingValue = 1;
        List<String> listActual = List.of("1-2", "4", "6-7", "9");

        List<String> listExpected = editionService.getArraySummary(arrayDetailed, arrayIndexStart, arrayIndexEnd, EditionConstants.INDEX_OFFSET, identifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }

    @Test
    void getArraySummary4() {
        EditionService editionService = new EditionService();

        int [] arrayDetailed = {0, 0, 0, 0, 0, 0, 0, 0, 0};
        int arrayIndexStart = 0;
        int arrayIndexEnd = arrayDetailed.length-1;
        int identifyingValue = 1;
        List<String> listActual = new ArrayList<>(0);

        List<String> listExpected = editionService.getArraySummary(arrayDetailed, arrayIndexStart, arrayIndexEnd, EditionConstants.INDEX_OFFSET, identifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }

    @Test
    void getArraySummary5() {
        EditionService editionService = new EditionService();

        int [] arrayDetailed = {1, 1, 1, 1, 1, 1, 1};
        int arrayIndexStart = 0;
        int arrayIndexEnd = arrayDetailed.length-1;
        int identifyingValue = 1;
        List<String> listActual = List.of("1-7");;

        List<String> listExpected = editionService.getArraySummary(arrayDetailed, arrayIndexStart, arrayIndexEnd, EditionConstants.INDEX_OFFSET, identifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }

    @Test
    void getArraySummary6() {
        EditionService editionService = new EditionService();

        int [] arrayDetailed = {1, 1, 1, 1, 1, 1, 1};
        int arrayIndexStart = 3;
        int arrayIndexEnd = 3;
        int identifyingValue = 1;
        List<String> listActual = List.of("4");;

        List<String> listExpected = editionService.getArraySummary(arrayDetailed, arrayIndexStart, arrayIndexEnd, EditionConstants.INDEX_OFFSET, identifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }

    @Test
    void getArraySummary7() {
        EditionService editionService = new EditionService();

        int [] arrayDetailed = {1, 1, 1, 1, 1, 1, 1};
        int arrayIndexStart = 3;
        int arrayIndexEnd = 6;
        int identifyingValue = 1;
        List<String> listActual = List.of("4-7");;

        List<String> listExpected = editionService.getArraySummary(arrayDetailed, arrayIndexStart, arrayIndexEnd, EditionConstants.INDEX_OFFSET, identifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }

    @Test
    void getArraySummary8() {
        EditionService editionService = new EditionService();

        int [] arrayDetailed = {1, 1, 1, 1, 1, 1, 1};
        int arrayIndexStart = 3;
        int arrayIndexEnd = 6;
        int identifyingValue = 0;
        List<String> listActual = List.of();;

        List<String> listExpected = editionService.getArraySummary(arrayDetailed, arrayIndexStart, arrayIndexEnd, EditionConstants.INDEX_OFFSET, identifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }
}