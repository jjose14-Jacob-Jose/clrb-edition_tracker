/*
Author: Jacob Jose
Date: May 15, 2023, 15:49.
Description: JavaScript file for 'Edition Tracker'.
*/

const ID_DIV_MATRIX = "divMatrix";
const ID_DIV_BODY_INTERFACE_SECTION = "divBodyInterfaceSection";
const ID_DIV_BODY_ABOUT_SECTION = "divBodyAbout";
const MATRIX_COLUMN_INDICES = {
    COLUMN_INDEX_OF_EDITION_NUMBER: 0,
    COLUMN_INDEX_OF_YEAR: 1,
    COLUMN_INDEX_OF_FLAG_AVAILABILITY: 2
};
const TEXT_OF_KEY_TO_CONFIRM_YEAR_UPDATE = 'Enter';
const TEXT_LABEL_HEADER_EDITION_TYPE = "Edition";
const TEXT_LABEL_HEADER_EDITION_NUMBER = "Number";
const TEXT_LABEL_HEADER_EDITION_CHECKBOX = "Select all";
const TEXT_LABEL_HEADER_YEAR = "Year";
const TEXT_LABEL_HEADER_ISSUES= "Issues";
const TEXT_BUTTON_ISSUE_COUNT_INCREASE= "+";
const TEXT_BUTTON_ISSUE_COUNT_DECREASE= "-";

const FLAG_ISSUES_NOT_AVAILABLE = 0;
const FLAG_ISSUES_ALL_AVAILABLE = 1;
const FLAG_ISSUES_SOME_AVAILABLE = 2;

 // Change the URL according to the deployment.
const URL_FOR_GITHUB_PAGES =  "https://editiontracker.azurewebsites.net/postData";
const URL_FOR_APPLICATION = "/postData"
const URL_GENERATE_SUMMARY = URL_FOR_APPLICATION;
const URL_GENERATE_SUMMARY_REQUEST_TYPE = "POST";

const HTML_ELEMENT_CLASS_VALUE_MODE_ADVANCED = "modeAdvanced";
const HTML_ELEMENT_CLASS_VALUE_MODE_BASIC = "modeBasic";
const HTML_ELEMENT_VALUE_INCREASE = "+";
const HTML_ELEMENT_VALUE_DECREASE = "-";
const HTML_ELEMENT_NAME_MODE = "rbMode";
const CSS_HTML_ELEMENT_TOGGLE_ROW_COLUMN_COUNT = "btnToggleRowsOrColumns";
const CSS_HTML_ELEMENT_VALUE_INCREASE = CSS_HTML_ELEMENT_TOGGLE_ROW_COLUMN_COUNT + " " + "btnIncrease";
const CSS_HTML_ELEMENT_VALUE_DECREASE = CSS_HTML_ELEMENT_TOGGLE_ROW_COLUMN_COUNT + " " + "btnDecrease";

const DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FROM_API = ';';
const DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FOR_HTML = ";\n";
const TEXT_AREA_BOTTOM_MARGIN_LINES = 1;

const MESSAGE_ERROR_API_RESPONSE = "Error while connecting to server. Contact customer support with following message: ";
const MESSAGE_INVALID_INTEGER_INPUT_SUFFIX = " is not a valid number.";
const MESSAGE_DUPLICATE_EDITION_NUMBER = " already exists. Please enter a unique value.";

const STRING_VALUE_EMPTY = "";

const KEYBOARD_LETTER_TO_FOCUS_ON_TXT_EDITION_TYPE_DESCRIPTION = '1';
const KEYBOARD_LETTER_TO_FOCUS_ON_TXT_YEAR_STARTING = '2';
const KEYBOARD_LETTER_TO_FOCUS_ON_TXT_YEAR_ENDING = '3';
const KEYBOARD_LETTER_TO_FOCUS_ON_TXT_EDITIONS_IN_A_YEAR = '4';
const KEYBOARD_LETTER_TO_FOCUS_ON_TXT_VOLUME_OF_STARTING_YEAR = '5';
const KEYBOARD_LETTER_TO_FOCUS_ON_BTN_GENERATE_CHECKBOXES = '6';
const KEYBOARD_LETTER_TO_FOCUS_ON_BTN_GENERATE_SUMMARY_HOLDINGS = '7';
const KEYBOARD_LETTER_TO_FOCUS_ON_BTN_RESET = '8';
const KEYBOARD_LETTER_TO_FOCUS_ON_RB_ADVANCED = '9';

// Global Variable declarations.
let editionsType, yearStarting, yearEnding, volumeYearStarting, editionsPerYear;
let arrayEditionDescription, arrayEditionNumber, arrayYear, arrayAvailabilityStatusYear, arrayAvailabilityStatusIssuesOfEachYear, arrayIssuesInTheYear, div_matrix;
let userMode, responseFromAPI;


// Function to print console outputs.
function printToConsole(variable) {
    console.log(JSON.stringify(variable));
}

// Show variable as an alert.
function printToAlert(variable) {
    printToConsole(JSON.stringify(variable));
    alert(JSON.stringify(variable));
}

// Initialize individual arrays.
function initializeArrays() {

    arrayEditionDescription = [];
    arrayEditionNumber = [];
    arrayYear = [];
    arrayAvailabilityStatusYear = [];
    arrayAvailabilityStatusIssuesOfEachYear = [];
    arrayIssuesInTheYear = [];

    const yearRange = yearEnding - yearStarting + 1;
    
    for(let i=0; i<yearRange; i++) {
        arrayEditionDescription.push(editionsType)
        arrayEditionNumber.push(volumeYearStarting++);
        arrayYear.push(yearStarting++)
        arrayAvailabilityStatusYear.push(FLAG_ISSUES_NOT_AVAILABLE);
        // Creating an array of length 'editionsPerYear' with all elements having value 'FLAG_ISSUES_NOT_AVAILABLE' and pushing it to 'arrayAvailabilityStatusIssuesOfEachYear'.
        arrayAvailabilityStatusIssuesOfEachYear.push(Array.from({ length: editionsPerYear }, () => FLAG_ISSUES_NOT_AVAILABLE));
        arrayIssuesInTheYear.push(editionsPerYear);
    }
}

// Function to clear contents of the div 'divMatrix'. This replaces the table.
function clearHTMLTable() {
    const divElement = document.getElementById('divMatrix');
    divElement.innerHTML = '';
    divElement.style.minHeight = '43vh'
    clearAPIResponse();
}

function clearAPIResponse() {
    setVisibilityOfHTMLClassElements(HTML_ELEMENT_CLASS_VALUE_MODE_BASIC, false);
    setVisibilityOfHTMLClassElements(HTML_ELEMENT_CLASS_VALUE_MODE_ADVANCED, false);
    responseFromAPI = null;

}

// Function to ensure that only numbers are accepted in text-fields.
function restrictToNumbers(event) {
    // Remove non-numeric characters
    this.value = this.value.replace(/\D/g, '');

    // Allow only numeric key codes
    if (event.key !== 'Backspace' && isNaN(parseInt(event.key))) {
        event.preventDefault();
    }
}

// Function to convert a matrix to HTML table. Created by ChatGPT.
function displayMatrixAsHTMLTable() {

    // Remove existing table if it exists
    clearHTMLTable();

    let checkboxToCheckAllCheckboxes;

    // Defining table header.
    const thead = document.createElement('tHead');
    {
        const tr = document.createElement('tr');

        let thEditionType = document.createElement('th');
        thEditionType.textContent = TEXT_LABEL_HEADER_EDITION_TYPE;

        let thEditionNumber = document.createElement('th');
        thEditionNumber.textContent = TEXT_LABEL_HEADER_EDITION_NUMBER;

        let thYear = document.createElement('th');
        thYear.textContent = TEXT_LABEL_HEADER_YEAR;

        let thEditionCheckbox = document.createElement('th');
        thEditionCheckbox.textContent = TEXT_LABEL_HEADER_EDITION_CHECKBOX;

        const toggleSwitch = document.createElement('label');
        toggleSwitch.classList.add('switch');

        checkboxToCheckAllCheckboxes = document.createElement('input');
        checkboxToCheckAllCheckboxes.type = 'checkbox';
        checkboxToCheckAllCheckboxes.id = 'checkboxToCheckAllCheckboxes';
        checkboxToCheckAllCheckboxes.addEventListener('change', function () {

            // Get all checkboxes in the web page.
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');

            // Loop through the checkboxes and set their checked state to that of header checkbox.
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = checkboxToCheckAllCheckboxes.checked;
            });

            // Change status of flags that correspond to each year.
            for(let i=0; i < arrayAvailabilityStatusYear.length; i++) {
                if(checkboxToCheckAllCheckboxes.checked)
                    arrayAvailabilityStatusYear[i] = FLAG_ISSUES_ALL_AVAILABLE;
                else
                    arrayAvailabilityStatusYear[i] = FLAG_ISSUES_NOT_AVAILABLE;
            }

            // Change status of flags that correspond to each issue.
            for(let i=0; i < arrayAvailabilityStatusIssuesOfEachYear.length; i++) {
                for(let j = 0; j<arrayAvailabilityStatusIssuesOfEachYear[i].length; j++) {
                    if(checkboxToCheckAllCheckboxes.checked)
                        arrayAvailabilityStatusIssuesOfEachYear[i][j] = FLAG_ISSUES_ALL_AVAILABLE;
                    else
                        arrayAvailabilityStatusIssuesOfEachYear[i][j] = FLAG_ISSUES_NOT_AVAILABLE;
                }
            }

        });

        // Create the slider (span) for the toggle switch
        const slider = document.createElement('span');
        slider.classList.add('slider');

        toggleSwitch.appendChild(checkboxToCheckAllCheckboxes);
        toggleSwitch.appendChild(slider);


        thEditionCheckbox.appendChild(toggleSwitch);

        let thIssues = document.createElement('th');
        thIssues.textContent = TEXT_LABEL_HEADER_ISSUES;
        thIssues.colSpan = parseInt(editionsPerYear);

        tr.appendChild(thEditionType);
        tr.appendChild(thEditionNumber);
        tr.appendChild(thYear);
        tr.appendChild(thEditionCheckbox);
        tr.appendChild(thIssues);

        thead.appendChild(tr);
    }

    const table = document.createElement('matrixTable');
    table.id = "matrixTable";
    table.className = "matrixTable";
    table.appendChild(thead);

    // Adding matrix of (checkboxes).
    let tbody = document.createElement('tBody');
    {
        for (let i = 0; i < arrayYear.length; i++, volumeYearStarting++) {

            const tr = document.createElement('tr');

            // Label for 'Edition-type' description.
            const tdEditionType = document.createElement('td');
            const labelEditionType = document.createElement('label');
            labelEditionType.id = 'labelEditionType' + (yearStarting + i);
            labelEditionType.innerHTML = arrayEditionDescription[i];
            labelEditionType.addEventListener('dblclick', function (event) {
                let userInputValue = prompt('Enter edition type:', labelEditionType.innerHTML);
                if (userInputValue !== null) {
                    this.innerHTML = userInputValue;
                    updateTextValueOfColumnInSubsequentRowsOfArray(arrayEditionDescription, i, userInputValue);
                }
            });
            tdEditionType.appendChild(labelEditionType);

            // Label for 'Edition-number' description.
            const tdEditionNumber = document.createElement('td');
            const labelEditionNumber = document.createElement('label');
            labelEditionNumber.id = 'labelEditionNumber' + (yearStarting + i);
            labelEditionNumber.innerHTML = arrayEditionNumber[i];
            labelEditionNumber.addEventListener('dblclick', function (event) {
                let userInputValue = prompt('Enter edition number:', labelEditionNumber.innerHTML);
                if (userInputValue !== null) {

                    if(isNaN(userInputValue)) {
                        alert(userInputValue + MESSAGE_INVALID_INTEGER_INPUT_SUFFIX);
                    } else {
                        userInputValue = parseInt(userInputValue);
                        // Checking if the edition number input already exists.
                        let flagIsUniqueValue = true;
                        {
                            // Checking values (above-rows) before the current index.
                            for(let j=0; j<i && flagIsUniqueValue; j++) {
                                if (arrayEditionNumber[j] == userInputValue)
                                    flagIsUniqueValue = false;
                            }

                            // Checking values (below-rows) after the current index.
                            for(let j=i+1; j<arrayEditionNumber.length && flagIsUniqueValue; j++) {
                                if (arrayEditionNumber[j] == userInputValue)
                                    flagIsUniqueValue = false;
                            }
                        }

                        this.innerHTML = userInputValue;
                        incrementValueOfSubsequentElements(arrayEditionNumber, i, parseInt(userInputValue));

                    }

                }
            });
            tdEditionNumber.appendChild(labelEditionNumber);

            // Text-box for 'year'.
            const tdYear = document.createElement('td');
            // Create text-fields for each year.
            const textFieldYear = document.createElement('input');
            textFieldYear.type = 'text'
            textFieldYear.value = arrayYear[i];
            textFieldYear.id = 'txtNumberYear' + (yearStarting + i);
            textFieldYear.addEventListener('keydown', function (event) {
                if (event.key.toLowerCase() === TEXT_OF_KEY_TO_CONFIRM_YEAR_UPDATE.toLowerCase()) {
                    incrementValueOfSubsequentElements(arrayYear, i, parseInt(textFieldYear.value));
                }
            });
            tdYear.appendChild(textFieldYear);

            const tdCheckboxesForEntireEdition = document.createElement('td');
            // Check-box to check all issues of the year.
            // Create a toggle switch container (label)
            const toggleSwitch = document.createElement('label');
            toggleSwitch.classList.add('switch');

            const checkboxForEntireEdition = document.createElement('input');
            checkboxForEntireEdition.type = 'checkbox';
            checkboxForEntireEdition.id = 'checkboxForEntireEdition' + i;
            checkboxForEntireEdition.addEventListener('change', function () {
                const checkboxes = tr.querySelectorAll('input[type="checkbox"][id^="checkboxOfIssue"]');
                const arrayIndividualIssues = [];
                for (let j = 0; j < checkboxes.length; j++) {
                    checkboxes[j].checked = checkboxForEntireEdition.checked;

                    if (checkboxes[j].checked) {
                        arrayIndividualIssues.push(FLAG_ISSUES_ALL_AVAILABLE);
                    } else {
                        arrayIndividualIssues.push(FLAG_ISSUES_NOT_AVAILABLE);
                    }
                }
                arrayAvailabilityStatusIssuesOfEachYear[i] = arrayIndividualIssues;

                if (checkboxForEntireEdition.checked) {
                    arrayAvailabilityStatusYear[i] = FLAG_ISSUES_ALL_AVAILABLE;
                } else {
                    arrayAvailabilityStatusYear[i] = FLAG_ISSUES_NOT_AVAILABLE;
                }
                toggleToggleSwitches();

            });
            checkboxForEntireEdition.checked = arrayAvailabilityStatusYear[i] === FLAG_ISSUES_ALL_AVAILABLE;

            // Create the slider (span) for the toggle switch
            const slider = document.createElement('span');
            slider.classList.add('slider');

            // Append the checkbox and slider to the toggle switch container
            toggleSwitch.appendChild(checkboxForEntireEdition);
            toggleSwitch.appendChild(slider);

            const labelForCheckboxForEntireEdition = document.createElement('label');
            labelForCheckboxForEntireEdition.setAttribute('for', 'checkboxForEntireEdition' + i);

            // Add classes to the elements to style them as a toggle switch
            checkboxForEntireEdition.classList.add('toggle-checkbox'); // Add this class
            labelForCheckboxForEntireEdition.classList.add('toggle-label'); // Add this class

            tdCheckboxesForEntireEdition.appendChild(toggleSwitch);


            // Creating individual checkbox for each edition of year.
            const tdCheckboxesForIndividualIssues = document.createElement('td');
            for (let indexOfEdition = 0; indexOfEdition < arrayAvailabilityStatusIssuesOfEachYear[i].length; indexOfEdition++) {

                // Create checkbox element
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = 'checkboxOfIssue' + indexOfEdition;

                // Set checkbox value based on matrix item
                checkbox.checked = arrayAvailabilityStatusIssuesOfEachYear[i][indexOfEdition]  === FLAG_ISSUES_ALL_AVAILABLE;

                // Create label for checkbox
                const labelForYear = document.createElement('label');
                labelForYear.textContent = `${indexOfEdition + 1 }`;
                labelForYear.setAttribute('for', 'checkboxOfIssue' + indexOfEdition );
                labelForYear.classList.add('button-label');
                labelForYear.addEventListener('click', function () {
                    // Toggle the associated checkbox's checked state
                    checkbox.checked = !checkbox.checked;
                    event.preventDefault();

                    if (checkbox.checked) {
                        arrayAvailabilityStatusIssuesOfEachYear[i][indexOfEdition] = FLAG_ISSUES_ALL_AVAILABLE; // Value to 1 if checkbox is checked
                    } else {
                        arrayAvailabilityStatusIssuesOfEachYear[i][indexOfEdition] = FLAG_ISSUES_NOT_AVAILABLE; // Value to 0 if checkbox is not-checked.
                    }

                    const checkboxesInRow = tr.querySelectorAll('input[type="checkbox"][id^="checkboxOfIssue"]');

                    let countChecked = 0;
                    // Starting from array-index '1'.
                    for (let j = 0; j < checkboxesInRow.length; j++) {
                        if (checkboxesInRow[j].checked)
                            countChecked++;
                    }

                    // Toggling checkbox for current year.
                    {
                        checkboxForEntireEdition.checked = false;
                        if (countChecked === 0) {
                            arrayAvailabilityStatusYear[i] = FLAG_ISSUES_NOT_AVAILABLE;
                        } else if (countChecked === checkboxesInRow.length) {
                            checkboxForEntireEdition.checked = true;
                            arrayAvailabilityStatusYear[i] = FLAG_ISSUES_ALL_AVAILABLE;
                        } else {
                            arrayAvailabilityStatusYear[i] = FLAG_ISSUES_SOME_AVAILABLE;
                        }
                    }

                    toggleToggleSwitches();

                });

                // Append checkbox to tdCheckboxesForIndividualIssues
                tdCheckboxesForIndividualIssues.appendChild(checkbox);
                tdCheckboxesForIndividualIssues.appendChild(labelForYear);
            }

            // Creating buttons to increase or decrease number of issues per year.
            const btnIssueCountIncrease = document.createElement('input');
            btnIssueCountIncrease.type = 'button';
            btnIssueCountIncrease.value = TEXT_BUTTON_ISSUE_COUNT_INCREASE;
            btnIssueCountIncrease.id = TEXT_BUTTON_ISSUE_COUNT_INCREASE + i;
            btnIssueCountIncrease.className = CSS_HTML_ELEMENT_VALUE_INCREASE;
            btnIssueCountIncrease.addEventListener("click", function() {
                changeIssueCountOfCurrentAndSubsequentYear(i, btnIssueCountIncrease.value);
                toggleToggleSwitches();
            });

            const btnIssueCountDecrease = document.createElement('input');
            btnIssueCountDecrease.type = 'button';
            btnIssueCountDecrease.value = TEXT_BUTTON_ISSUE_COUNT_DECREASE;
            btnIssueCountDecrease.id = TEXT_BUTTON_ISSUE_COUNT_DECREASE + i;
            btnIssueCountDecrease.className = CSS_HTML_ELEMENT_VALUE_DECREASE;
            btnIssueCountDecrease.addEventListener("click", function() {
                changeIssueCountOfCurrentAndSubsequentYear(i, btnIssueCountDecrease.value);
                toggleToggleSwitches();
            });

            const tdIssueCountIncrease = document.createElement('td');
            tdIssueCountIncrease.appendChild(btnIssueCountIncrease);

            const tdIssueCountDecrease = document.createElement('td');
            tdIssueCountDecrease.appendChild(btnIssueCountDecrease);

            tr.appendChild(tdEditionType);
            tr.appendChild(tdEditionNumber);
            tr.appendChild(tdYear);
            tr.appendChild(tdCheckboxesForEntireEdition);
            tr.appendChild(tdCheckboxesForIndividualIssues);
            tr.appendChild(tdIssueCountIncrease);
            tr.appendChild(tdIssueCountDecrease);

            tbody.appendChild(tr);
            table.appendChild(tbody);
        }

        // Adding buttons to add or delete rows.
        {
            const btnAddEdition = document.createElement('input');
            btnAddEdition.type = 'button';
            btnAddEdition.value = HTML_ELEMENT_VALUE_INCREASE;
            btnAddEdition.className = CSS_HTML_ELEMENT_VALUE_INCREASE;
            btnAddEdition.addEventListener("click", function () {
                matrixRowAddOrDelete(HTML_ELEMENT_VALUE_INCREASE);
                displayMatrixAsHTMLTable();
            });

            const btnDeleteEdition = document.createElement('input');
            btnDeleteEdition.type = 'button';
            btnDeleteEdition.value = HTML_ELEMENT_VALUE_DECREASE;
            btnDeleteEdition.className = CSS_HTML_ELEMENT_VALUE_DECREASE;
            btnDeleteEdition.addEventListener("click", function () {
                matrixRowAddOrDelete(HTML_ELEMENT_VALUE_DECREASE);
            });


            const tdBtnAddEdition = document.createElement('td');
            tdBtnAddEdition.appendChild(btnAddEdition);

            const tdBtnDeleteEdition = document.createElement('td');
            tdBtnDeleteEdition.appendChild(btnDeleteEdition);

            const tr = document.createElement('tr');
            tr.appendChild(tdBtnAddEdition);
            tr.appendChild(tdBtnDeleteEdition);

            table.appendChild(tr);
        }

    }
    if(div_matrix !== undefined)
        div_matrix.appendChild(table);
}

// Add or delete a row from the end of the matrix.
function matrixRowAddOrDelete(mode) {

    if (mode === HTML_ELEMENT_VALUE_INCREASE) {

        let lastRowValue = arrayGetLastElement(arrayEditionDescription);
        arrayEditionDescription.push(lastRowValue);

        lastRowValue = arrayGetLastElement(arrayEditionNumber);
        arrayEditionNumber.push(lastRowValue+1);

        lastRowValue = arrayGetLastElement(arrayYear);
        arrayYear.push(lastRowValue + 1);

        // Availability status of new row must be 'nothing found'.
        arrayAvailabilityStatusYear.push(FLAG_ISSUES_NOT_AVAILABLE);

        const issuesPublishedInLastYear = arrayGetLastElement(arrayIssuesInTheYear);
        arrayIssuesInTheYear.push(issuesPublishedInLastYear);

        const arrayAvailabilityStatusIssuesCurrentYear = [];
        // Adding 'not found' flags to matrix, the count of new flags is equal to number of issues in last year.
        for (let i = 0; i<issuesPublishedInLastYear; i++) {
            arrayAvailabilityStatusIssuesCurrentYear.push(FLAG_ISSUES_NOT_AVAILABLE);
        }
        arrayAvailabilityStatusIssuesOfEachYear.push(arrayAvailabilityStatusIssuesCurrentYear);

    } else  if (mode === HTML_ELEMENT_VALUE_DECREASE) {
        // Removing last element of the arrays.
        arrayEditionDescription.pop();
        arrayEditionNumber.pop();
        arrayYear.pop();
        arrayAvailabilityStatusYear.pop();
        arrayIssuesInTheYear.pop();
        arrayAvailabilityStatusIssuesOfEachYear.pop();
    }

    displayMatrixAsHTMLTable();
    toggleToggleSwitches();
}

// Get last element of the array.
function arrayGetLastElement(array) {
    return array.slice(-1)[0];
}

// Push a copy of the last element to back of array.
function arrayPushCopyOfLastElementToEnd (array) {
    const lastElement = array.slice(-1)[0];
    array.push(lastElement);
    return array;
}

// Increase or Decrease the number of issues in current and subsequent rows.
function changeIssueCountOfCurrentAndSubsequentYear(editionIndexInMatrix, changeMode) {
    printToConsole("BEFORE: arrayAvailabilityStatusIssuesOfEachYear[editionIndexInMatrix]: " + arrayAvailabilityStatusIssuesOfEachYear[editionIndexInMatrix]);
    for (let i = editionIndexInMatrix; i < arrayAvailabilityStatusIssuesOfEachYear.length; i++) {
        if (changeMode === TEXT_BUTTON_ISSUE_COUNT_INCREASE)  {
            arrayAvailabilityStatusIssuesOfEachYear[i].push(FLAG_ISSUES_NOT_AVAILABLE);
            arrayAvailabilityStatusYear[editionIndexInMatrix] = FLAG_ISSUES_SOME_AVAILABLE;
            arrayIssuesInTheYear[i]++;
        } else {
            arrayAvailabilityStatusIssuesOfEachYear[i].pop();
            arrayIssuesInTheYear[i]--;
            arrayAvailabilityStatusYear[editionIndexInMatrix] = getAvailabilityOfIssuesInARow(editionIndexInMatrix);
        }
    }
    printToConsole("AFTER: arrayAvailabilityStatusIssuesOfEachYear[editionIndexInMatrix]: " + arrayAvailabilityStatusIssuesOfEachYear[editionIndexInMatrix]);
    displayMatrixAsHTMLTable();

}

function getAvailabilityOfIssuesInARow(rowIndex) {
    for (j = 0; j < arrayAvailabilityStatusIssuesOfEachYear[rowIndex].length; j++) {
        if (arrayAvailabilityStatusIssuesOfEachYear[rowIndex][j] !== FLAG_ISSUES_ALL_AVAILABLE) {
            // All editions are not available.
            return FLAG_ISSUES_NOT_AVAILABLE;
        }
    }
    return FLAG_ISSUES_ALL_AVAILABLE;
}

// Increment of String-cells in column below the specified row.
function updateTextValueOfColumnInSubsequentRowsOfArray(arrayToBeUpdated, indexRow, updatedValue) {
    arrayToBeUpdated[indexRow] = updatedValue;
    for(let i=indexRow+1; i<arrayToBeUpdated.length; i++) {
        if(i>0) {
            arrayToBeUpdated[i] = updatedValue;
        }
    }
    displayMatrixAsHTMLTable();
}

// Increment of integer-cells in column below the specified row.
function incrementValueOfSubsequentElements(arrayToBeUpdated, indexRow, updatedValue) {
    arrayToBeUpdated[indexRow] = updatedValue;
    for(let i=indexRow+1; i<arrayToBeUpdated.length; i++) {
        arrayToBeUpdated[i] = arrayToBeUpdated[(i-1)] + 1;
    }
    displayMatrixAsHTMLTable();
}

// Function to update page content using the JSON response
function displayAPIResponseInHTML(response) {
    let stringInResponse, maximumNumberOfLines, numberOfLines;

    stringInResponse = response['textAreaUnavailableEditionsWithoutYear'];
    numberOfLines = stringGetNumberOfCharacterOccurrences(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FROM_API);
    maximumNumberOfLines = numberOfLines + TEXT_AREA_BOTTOM_MARGIN_LINES;
    stringInResponse = stringReplaceAllSemiColonWithCharacter(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FOR_HTML);
    document.getElementById('textAreaUnavailableEditionsWithoutYearBasic').value = stringInResponse;

    stringInResponse = response['textAreaUnavailableEditionsWithoutYear'];
    numberOfLines = stringGetNumberOfCharacterOccurrences(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FROM_API);
    maximumNumberOfLines = numberOfLines > maximumNumberOfLines ? numberOfLines: maximumNumberOfLines;
    stringInResponse = stringReplaceAllSemiColonWithCharacter(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FOR_HTML);
    document.getElementById('textAreaUnavailableEditionsWithoutYearAdvanced').value = stringInResponse;

    stringInResponse = response['textAreaUnavailableEditionsWithYear'];
    numberOfLines = stringGetNumberOfCharacterOccurrences(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FROM_API);
    maximumNumberOfLines = numberOfLines > maximumNumberOfLines ? numberOfLines: maximumNumberOfLines;
    stringInResponse = stringReplaceAllSemiColonWithCharacter(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FOR_HTML);
    document.getElementById('textAreaUnavailableEditionsWithYear').value = stringInResponse;

    stringInResponse = response['textAreaAvailableEditionsWithYear'];
    numberOfLines = stringGetNumberOfCharacterOccurrences(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FROM_API);
    maximumNumberOfLines = numberOfLines > maximumNumberOfLines ? numberOfLines: maximumNumberOfLines;
    stringInResponse = stringReplaceAllSemiColonWithCharacter(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FOR_HTML);
    document.getElementById('textAreaAvailableEditionsWithYear').value = stringInResponse;

    stringInResponse = response['textAreaAvailableEditionsWithoutYear'];
    numberOfLines = stringGetNumberOfCharacterOccurrences(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FROM_API);
    maximumNumberOfLines = numberOfLines > maximumNumberOfLines ? numberOfLines: maximumNumberOfLines;
    stringInResponse = stringReplaceAllSemiColonWithCharacter(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FOR_HTML);
    document.getElementById('textAreaAvailableEditionsWithoutYear').value = stringInResponse;

    stringInResponse = response['textAreaAvailableSummaryHolding'];
    numberOfLines = stringGetNumberOfCharacterOccurrences(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FROM_API);
    maximumNumberOfLines = numberOfLines > maximumNumberOfLines ? numberOfLines: maximumNumberOfLines;
    stringInResponse = stringReplaceAllSemiColonWithCharacter(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FOR_HTML);
    document.getElementById('textAreaAvailableSummaryHoldingBasic').value = stringInResponse;

    stringInResponse = response['textAreaAvailableSummaryHolding'];
    numberOfLines = stringGetNumberOfCharacterOccurrences(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FROM_API);
    maximumNumberOfLines = numberOfLines > maximumNumberOfLines ? numberOfLines: maximumNumberOfLines;
    stringInResponse = stringReplaceAllSemiColonWithCharacter(stringInResponse, DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FOR_HTML);
    document.getElementById('textAreaAvailableSummaryHoldingAdvanced').value = stringInResponse;

    textAreasAdjustSize(maximumNumberOfLines*20);
    toggleUserModeVisibility();

}

// Adjust height of all textarea showing results so that all text is visible.
function textAreasAdjustSize(height) {
    textAreaSetHeightAs('textAreaUnavailableEditionsWithoutYearBasic', height);
    textAreaSetHeightAs('textAreaUnavailableEditionsWithoutYearAdvanced', height);
    textAreaSetHeightAs('textAreaUnavailableEditionsWithYear', height);
    textAreaSetHeightAs('textAreaAvailableEditionsWithYear', height);
    textAreaSetHeightAs('textAreaAvailableEditionsWithoutYear', height);
    textAreaSetHeightAs('textAreaAvailableSummaryHoldingBasic', height);
    textAreaSetHeightAs('textAreaAvailableSummaryHoldingAdvanced', height);

}

// Adjust height of textarea to avoid scrolling.
function textAreaSetHeightAs(textAreaHTMLID, height) {
    const textarea = document.getElementById(textAreaHTMLID);
    textarea.style.height = height + 'px'; // Set the height to the scrollHeight
}

function stringGetNumberOfCharacterOccurrences(string, character) {
    const matches = string.split(character);
    return matches.length - 1;
}

// Get value of 'selected' radio button from a group.
function getRadioButtonsValue(radioButtonName) {
    let arrayOfRadioButtons = document.getElementsByName("rbMode");

    let valueOfSelectedRadioButton = null;

    for (var i = 0; i < arrayOfRadioButtons.length; i++) {
        if (arrayOfRadioButtons[i].checked) {
            valueOfSelectedRadioButton = arrayOfRadioButtons[i].value;
            break;
        }
    }

    return valueOfSelectedRadioButton;

}

// Show loading animation spinner.
function loadingAnimationShow() {
    // Hide loading spinner animation.
    document.getElementById('divUserInteractionArea').style.display = 'block';
}

// Hide loading animation spinner.
function loadingAnimationHide() {
    // Hide loading spinner animation.
    document.getElementById('divUserInteractionArea').style.display = 'none';
}

// Ajax to call REST API and update page content dynamically.
function ajaxForFormUserInput() {
    $(document).ready(function() {
        $('#formUserInput').submit(function(event) {
            event.preventDefault();
            let formData = $(this).serialize();

            $.ajax({
                url: URL_GENERATE_SUMMARY,
                type: URL_GENERATE_SUMMARY_REQUEST_TYPE,
                data: formData,
                dataType: 'json',
                success: function(response) {
                    // Update the page content using the response data
                    responseFromAPI = response;
                    loadingAnimationHide();
                    displayAPIResponseInHTML(response);
                },
                error: function(error) {
                    loadingAnimationHide();
                    printToAlert(MESSAGE_ERROR_API_RESPONSE + error);
                }
            });
        });
    });


}

// Initial-load steps.
function initialLoadingActivities() {

    userMode = getRadioButtonsValue(HTML_ELEMENT_NAME_MODE);

    // Hiding HTML elements that render API response.
    {
        responseFromAPI = null;
        setVisibilityOfHTMLClassElements(HTML_ELEMENT_CLASS_VALUE_MODE_BASIC, false);
        setVisibilityOfHTMLClassElements(HTML_ELEMENT_CLASS_VALUE_MODE_ADVANCED, false);
    }

    let divMatrix = document.getElementById("divMatrix");
    let btnGenerateSummary = document.getElementById("btnGenerateSummary");

    // Event-listener for 'Generate Summary' button.
    {
        document.addEventListener("DOMContentLoaded", function () {


            let btnClearAll = document.getElementById("btnClearAll");

            // To update the JS arrays when user adds data.
            // Create a new MutationObserver instance
            let observer = new MutationObserver(function (mutationsList) {
                // Check if divMatrix content has changed
                for (let mutation of mutationsList) {
                    if (mutation.type === "childList" && divMatrix.innerHTML.trim() === "") {
                        btnGenerateSummary.disabled = true;
                        btnClearAll.disabled = true;
                    } else {
                        btnGenerateSummary.disabled = false;
                        btnClearAll.disabled = false;
                    }
                }
            });

            // Start observing changes to divMatrix
            observer.observe(divMatrix, {childList: true});

            // Stop observing when needed (e.g., when the page is unloaded)
            // observer.disconnect();
        });

        // When 'Generate Summary' button is clicked.
        btnGenerateSummary.addEventListener('click', function(event) {
            loadingAnimationShow();
            document.getElementById('arrayEditionDescription').value = arrayEditionDescription;
            document.getElementById('arrayEditionNumber').value = arrayEditionNumber;
            document.getElementById('arrayYear').value = arrayYear;
            document.getElementById('arrayAvailabilityStatusYear').value = arrayAvailabilityStatusYear;
            document.getElementById('arrayAvailabilityStatusIssuesOfEachYear').value = arrayAvailabilityStatusIssuesOfEachYear;
            document.getElementById('arrayIssuesInTheYear').value = arrayIssuesInTheYear;
        });
    }

    // Event-listener for 'Clear All' button.
    {
        document.getElementById("btnClearAll").addEventListener("click", function() {
            clearHTMLTable();
            setVisibilityOfHTMLClassElements(false);
        })
    }

    // Event-listener 'Create Table' button.
    {
        // Function to get input parameters and display the table.
        document.getElementById("btnCreateTable").addEventListener("click", function() {
            event.preventDefault();

            try {
                editionsType = document.getElementById("txtTextEditionsType").value;
                yearStarting = parseInt(document.getElementById("txtNumberYearStarting").value);
                yearEnding = parseInt(document.getElementById("txtNumberYearEnding").value);
                volumeYearStarting = parseInt(document.getElementById("txtNumberVolumeStartingYear").value);
                editionsPerYear = parseInt(document.getElementById("txtNumberEditionsPerYear").value);
                div_matrix = document.querySelector("#"+ID_DIV_MATRIX);

                let messageError = STRING_VALUE_EMPTY;
                // Check if the parsed values are NaN (Not-a-Number)
                if (isNaN(yearStarting)) {
                    messageError = document.getElementById("lblTxtNumberYearStarting").innerHTML;
                }
                if (isNaN(yearEnding)) {
                    messageError = document.getElementById("lblTxtNumberYearEnding").innerHTML;
                }
                if (isNaN(volumeYearStarting)) {
                    messageError = document.getElementById("lblTxtNumberVolumeStartingYear").innerHTML;
                }
                if (isNaN(editionsPerYear)) {
                    messageError = document.getElementById("lblTxtNumberEditionsPerYear").innerHTML;
                }

                if (messageError !== STRING_VALUE_EMPTY) {
                    messageError = messageError + MESSAGE_INVALID_INTEGER_INPUT_SUFFIX;
                    throw new Error (messageError);
                }

                if(editionsPerYear>0) {
                    // Adding '+1' to ensure 'ending' year is also included.
                    initializeArrays();
                    displayMatrixAsHTMLTable();
                }

            } catch (error) {
                printToAlert(error.message)
            }


        });

    }

    // All input text-fields with id start 'txtNumber'.
    // {
    //     // Get all the text fields with type 'text'
    //     const textFields = document.querySelectorAll('input[type="text"]');
    //
    //     // Apply the validation function to text fields with IDs starting with 'txtNumber'.
    //     textFields.forEach(textField => {
    //         if (textField.id.startsWith('txtNumber')) {
    //             textField.addEventListener('input', restrictToNumbers);
    //             textField.addEventListener('keydown', restrictToNumbers);
    //         }
    //     });
    // }

    // Showing results from Java API.
    {
        ajaxForFormUserInput();
    }
    loadingAnimationHide();
    enableKeyboardShortCuts();

}

// Change visibility of all HTML elements of specified class.
function setVisibilityOfHTMLClassElements(htmlClassName, visibilityFlag) {

    let elements = document.getElementsByClassName(htmlClassName);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = visibilityFlag ? "block" : "none";
    }
}

// Set the current mode (basic/advanced) selected by user.
function setUserMode(mode) {
    userMode = mode;
    toggleUserModeVisibility();
}

// Toggle visibility of elements based on user-mode ('basic'/'advanced').
function toggleUserModeVisibility() {
    if( responseFromAPI !== null) {
        if (userMode === HTML_ELEMENT_CLASS_VALUE_MODE_ADVANCED) {
            setVisibilityOfHTMLClassElements(HTML_ELEMENT_CLASS_VALUE_MODE_ADVANCED, true);
            setVisibilityOfHTMLClassElements(HTML_ELEMENT_CLASS_VALUE_MODE_BASIC, false);
        }
        else {
            setVisibilityOfHTMLClassElements(HTML_ELEMENT_CLASS_VALUE_MODE_ADVANCED, false);
            setVisibilityOfHTMLClassElements(HTML_ELEMENT_CLASS_VALUE_MODE_BASIC, true);
        }

    }
}

// Replace all occurrences of ';' in a String with specified character.
function stringReplaceAllSemiColonWithCharacter(string, characterReplacement) {
    return string.replace(/;/g, characterReplacement);
}

// Enable keyboard shorts.
function enableKeyboardShortCuts() {


    document.addEventListener('keydown', function(event) {
        printToConsole("event.altKey: "+event.altKey);
        printToConsole("event.key: "+event.key);
        // Shortcuts executed when numeric keys pressed with 'ALT'.
        if (event.altKey) {
            let htmlInputElement = STRING_VALUE_EMPTY;
            switch (event.key) {
                case KEYBOARD_LETTER_TO_FOCUS_ON_TXT_EDITION_TYPE_DESCRIPTION:
                    htmlInputElement = document.getElementById("txtTextEditionsType");
                    printToConsole("case: " + KEYBOARD_LETTER_TO_FOCUS_ON_TXT_EDITION_TYPE_DESCRIPTION);
                    break;
                case KEYBOARD_LETTER_TO_FOCUS_ON_TXT_YEAR_STARTING:
                    htmlInputElement = document.getElementById("txtNumberYearStarting");
                    break;
                case KEYBOARD_LETTER_TO_FOCUS_ON_TXT_YEAR_ENDING:
                    htmlInputElement = document.getElementById("txtNumberYearEnding");
                    break;
                case KEYBOARD_LETTER_TO_FOCUS_ON_TXT_EDITIONS_IN_A_YEAR:
                    htmlInputElement = document.getElementById("txtNumberEditionsPerYear");
                    break;
                case KEYBOARD_LETTER_TO_FOCUS_ON_TXT_VOLUME_OF_STARTING_YEAR:
                    htmlInputElement = document.getElementById("txtNumberVolumeStartingYear");
                    break;
                case KEYBOARD_LETTER_TO_FOCUS_ON_BTN_GENERATE_CHECKBOXES:
                    htmlInputElement = document.getElementById("btnCreateTable");
                    break;
                case KEYBOARD_LETTER_TO_FOCUS_ON_BTN_GENERATE_SUMMARY_HOLDINGS:
                    htmlInputElement = document.getElementById("btnGenerateSummary");
                    break;
                case KEYBOARD_LETTER_TO_FOCUS_ON_TXT_VOLUME_OF_STARTING_YEAR:
                    htmlInputElement = document.getElementById("txtNumberVolumeStartingYear");
                    break;
                case KEYBOARD_LETTER_TO_FOCUS_ON_BTN_GENERATE_CHECKBOXES:
                    htmlInputElement = document.getElementById("btnCreateTable");
                    break;
                case KEYBOARD_LETTER_TO_FOCUS_ON_BTN_GENERATE_SUMMARY_HOLDINGS:
                    htmlInputElement = document.getElementById("btnGenerateSummary");
                    break;
                case KEYBOARD_LETTER_TO_FOCUS_ON_BTN_RESET:
                    htmlInputElement = document.getElementById("btnClearAll");
                    break;
                case KEYBOARD_LETTER_TO_FOCUS_ON_RB_ADVANCED:
                    htmlInputElement = document.getElementById("rbModeAdvanced");
                    break;

            }

            if (htmlInputElement !== STRING_VALUE_EMPTY) {
                if (htmlInputElement instanceof HTMLInputElement) {
                    if (htmlInputElement.type === "radio") {
                        htmlInputElement.checked = true;
                    } else {
                        // Select all contents if the shortcut key is pressed for a text field.
                        htmlInputElement.select();
                    }
                } else if (htmlInputElement instanceof HTMLButtonElement) {
                    // Click the button if shortcut key for a button is pressed.
                    htmlInputElement.click();
                }
            }
        }
    });

}

// Method to toggle visibility of 'about' and GSH interface in home page.
function toggleDivsInBody() {
    const divBodyInterfaceParts = document.getElementById(ID_DIV_BODY_INTERFACE_SECTION);
    const divBodyAbout = document.getElementById(ID_DIV_BODY_ABOUT_SECTION);

    if (divBodyInterfaceParts.style.display === "none" || divBodyInterfaceParts.style.display === "") {
        divBodyInterfaceParts.style.display = "block";
        divBodyAbout.style.display = "none";
    } else {
        divBodyInterfaceParts.style.display = "none";
        divBodyAbout.style.display = "block";
    }
}

// Method to close the expanded image by clicking anywhere on the screen.
document.addEventListener("click", function(event) {
    const modal = document.getElementById("image-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Method expand images in 'About'
function expandImage(image) {
    const modal = document.getElementById("image-modal");
    const expandedImage = document.getElementById("expanded-image");
    expandedImage.src = image.src;
    modal.style.display = "block";
}

// Method hide images in 'About'
function closeModal() {
    const modal = document.getElementById("image-modal");
    modal.style.display = "none";
}

 // Toggling 'User Guide' in footer.
function toggleDivVisibility(divId) {
    const htmlElement = document.getElementById(divId);

    if (htmlElement.style.display === "none" || htmlElement.style.display === "") {
        htmlElement.style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        htmlElement.style.display = "none";
    }
}

function toggleToggleSwitches() {

    // Toggle-switch for each row.
    for (let i = 0; i < arrayAvailabilityStatusIssuesOfEachYear.length; i++) {
        let rowAvailable = true;
        let j = 0;
        let checkboxForCurrentRow;
        for (j = 0; j < arrayAvailabilityStatusIssuesOfEachYear[i].length; j++) {
            if (arrayAvailabilityStatusIssuesOfEachYear[i][j] !== FLAG_ISSUES_ALL_AVAILABLE) {
                rowAvailable = false;
            }
        }
        if (j === 0 || j === arrayAvailabilityStatusYear[i].length) {
            arrayAvailabilityStatusYear[i] = FLAG_ISSUES_NOT_AVAILABLE;
        } else if (j < arrayAvailabilityStatusIssuesOfEachYear[i].length) {
            arrayAvailabilityStatusYear[i] = FLAG_ISSUES_SOME_AVAILABLE;
        }
        checkboxForCurrentRow = document.getElementById('checkboxForEntireEdition' + i);
        checkboxForCurrentRow.checked = rowAvailable

    }

    // Toggle-switch for all issues.
    let allAvailable = true;
    for (let i = 0; i < arrayAvailabilityStatusYear.length; i++) {
        if (arrayAvailabilityStatusYear[i] !== FLAG_ISSUES_ALL_AVAILABLE) {
            allAvailable = false;
            break;
        }
    }

    let checkboxToCheckAllCheckboxes = document.getElementById('checkboxToCheckAllCheckboxes');
    checkboxToCheckAllCheckboxes.checked = allAvailable;


}

// Function with main logic.
function main() {
    initialLoadingActivities();
}

