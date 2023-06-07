package org.clrb.editiontracker.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

class EditionServiceTest {

    @Test
    void getArraySummary() {
        EditionService editionService = new EditionService();

        int [] inputArrayDetailed = {1, 1, 0, 0, 1, 1, 1, 0};
        int inputIdentifyingValue = 1;
        List<String> listActual = List.of("0-1", "4-6");

        List<String> listExpected = editionService.getArraySummary(inputArrayDetailed, inputIdentifyingValue);

        Assertions.assertArrayEquals(listExpected.toArray(), listActual.toArray());

    }
}