package org.clrb.editiontracker.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

class EditionServiceTest {

    @Test
    void getArraySummaryOne() {
        EditionService editionService = new EditionService();

        int [] inputArrayDetailed = {1, 1, 0, 0, 1, 1, 1, 0};
        int inputIdentifyingValue = 1;
        List<String> listActual = List.of("1-2", "5-7");

        List<String> listExpected = editionService.getArraySummaryWithStartIndexOne(inputArrayDetailed, inputIdentifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }

    @Test
    void getArraySummaryTwo() {
        EditionService editionService = new EditionService();

        int [] inputArrayDetailed = {1, 1, 0, 0, 1, 1, 1, 1};
        int inputIdentifyingValue = 1;
        List<String> listActual = List.of("1-2", "5-8");

        List<String> listExpected = editionService.getArraySummaryWithStartIndexOne(inputArrayDetailed, inputIdentifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }

    @Test
    void getArraySummaryThree() {
        EditionService editionService = new EditionService();

        int [] inputArrayDetailed = {1, 1, 0, 1, 0, 1, 1, 0, 1};
        int inputIdentifyingValue = 1;
        List<String> listActual = List.of("1-2", "4", "6-7", "9");

        List<String> listExpected = editionService.getArraySummaryWithStartIndexOne(inputArrayDetailed, inputIdentifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }

    @Test
    void getArraySummaryFour() {
        EditionService editionService = new EditionService();

        int [] inputArrayDetailed = {0, 0, 0, 0, 0, 0, 0, 0, 0};
        int inputIdentifyingValue = 1;
        List<String> listActual = new ArrayList<>(0);

        List<String> listExpected = editionService.getArraySummaryWithStartIndexOne(inputArrayDetailed, inputIdentifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }

    @Test
    void getArraySummaryFive() {
        EditionService editionService = new EditionService();

        int [] inputArrayDetailed = {1, 1, 1, 1, 1, 1, 1};
        int inputIdentifyingValue = 1;
        List<String> listActual = List.of("1-7");;

        List<String> listExpected = editionService.getArraySummaryWithStartIndexOne(inputArrayDetailed, inputIdentifyingValue);
        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());
    }
}