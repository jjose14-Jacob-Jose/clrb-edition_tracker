package org.clrb.editiontracker.constants;

public class EditionConstants {
    public static final int INVALID_VALUE_INTEGER = -1;
    public static final int INDEX_OFFSET = 1;
    public static final int FLAG_ISSUES_NOT_AVAILABLE = 0;
    public static final int FLAG_ISSUES_ALL_AVAILABLE = 1;
    public static final int FLAG_ISSUES_SOME_AVAILABLE = 2;

    public static final String DELIMITER_EDITION_DIGITS = "-";
    public static final String DELIMITER_EDITION_DIGITS_TO_ISSUE_DIGITS = ":";
    public static final String DELIMITER_EDITION_DESCRIPTION_TO_EDITION_DIGITS = ".";
    public static final String DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS = ";";
    public static final String DELIMITER_SUMMARY_HOLDINGS_BETWEEN_ISSUES_OF_A_YEAR = ",";
    public static final String DELIMITER_YEAR_START = "(";
    public static final String DELIMITER_YEAR_END = ")";
    public static final String STRING_EMPTY = "";

    public static final String HTML_ELEMENT_NAME_SUMMARY_MISSING_WITHOUT_YEAR = "textAreaUnavailableEditionsWithoutYear";
    public static final String HTML_ELEMENT_NAME_SUMMARY_MISSING_WITH_YEAR = "textAreaUnavailableEditionsWithYear";
    public static final String HTML_ELEMENT_NAME_SUMMARY_AVAILABLE_WITHOUT_YEAR = "textAreaAvailableEditionsWithoutYear";
    public static final String HTML_ELEMENT_NAME_SUMMARY_AVAILABLE_WITH_YEAR = "textAreaAvailableEditionsWithYear";
    public static final String HTML_ELEMENT_NAME_SUMMARY_AVAILABLE_SUMMARY_HOLDINGS = "textAreaAvailableSummaryHolding";
    public static final String KEY_FOR_LOCALHOST = "localhost";
    public static final String KEY_GOOGLE_RECAPTCHA_SERVER = KEY_FOR_LOCALHOST;
    public static final String URL_GOOGLE_RECAPTCHA_VERIFICATION = "https://www.google.com/recaptcha/api/siteverify";
    public static final boolean FLAG_SUCCESS = true;
    public static final boolean FLAG_FAILURE = false;
}
