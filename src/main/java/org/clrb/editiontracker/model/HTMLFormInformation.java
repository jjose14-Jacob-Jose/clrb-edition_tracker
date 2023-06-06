package org.clrb.editiontracker.model;

import java.util.Arrays;
import java.util.List;

public class HTMLFormInformation {

    private String [] formInputMatrixTextOnly;

    private List<Integer> formInputMatrixDigitsOnly;

    public String[] getFormInputMatrixTextOnly() {
        return formInputMatrixTextOnly;
    }

    public void setFormInputMatrixTextOnly(String[] formInputMatrixTextOnly) {
        this.formInputMatrixTextOnly = formInputMatrixTextOnly;
    }

    public List<Integer> getFormInputMatrixDigitsOnly() {
        return formInputMatrixDigitsOnly;
    }

    public void setFormInputMatrixDigitsOnly(List<Integer> formInputMatrixDigitsOnly) {
        this.formInputMatrixDigitsOnly = formInputMatrixDigitsOnly;
    }

    @Override
    public String toString() {
        return "UserInformation{" +
                "formInputMatrixTextOnly=" + Arrays.toString(formInputMatrixTextOnly) +
                ", formInputMatrixDigitsOnly=" + formInputMatrixDigitsOnly +
                '}';
    }
}
