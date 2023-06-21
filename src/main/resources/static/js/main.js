/*
Author: Jacob Jose
Date: May 15, 2023, 15:49.
Description: JavaScript file for 'Edition Tracker'.
*/

const ID_DIV_MATRIX = "divMatrix";
const MATRIX_COLUMN_INDICES = {
    COLUMN_INDEX_OF_EDITION_NUMBER: 0,
    COLUMN_INDEX_OF_YEAR: 1,
    COLUMN_INDEX_OF_FLAG_AVAILABILITY: 2
};
const TEXT_OF_KEY_TO_CONFIRM_YEAR_UPDATE = 'Enter';
const TEXT_LABEL_HEADER_EDITION_TYPE = "Volume";
const TEXT_LABEL_HEADER_EDITION_NUMBER = "Number";
const TEXT_LABEL_HEADER_EDITION_CHECKBOX = "Check all";
const TEXT_LABEL_HEADER_YEAR = "Year";
const TEXT_LABEL_HEADER_ISSUES= "Issues";
const TEXT_BUTTON_ISSUE_COUNT_INCREASE= "+";
const TEXT_BUTTON_ISSUE_COUNT_DECREASE= "-";

const FLAG_ISSUES_NOT_AVAILABLE = 0;
const FLAG_ISSUES_ALL_AVAILABLE = 1;
const FLAG_ISSUES_SOME_AVAILABLE = 2;

const URL_GENERATE_SUMMARY = "/postData";
const URL_GENERATE_SUMMARY_REQUEST_TYPE = "POST";

const HTML_ELEMENT_CLASS_VALUE_MODE_ADVANCED = "modeAdvanced";
const HTML_ELEMENT_CLASS_VALUE_MODE_BASIC = "modeBasic";
const HTML_ELEMENT_VALUE_INCREASE = "+";
const HTML_ELEMENT_VALUE_DECREASE = "-";
const HTML_ELEMENT_NAME_MODE = "rbMode";

const DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FROM_API = ';';
const DELIMITER_SUMMARY_HOLDINGS_BETWEEN_YEARS_FOR_HTML = ";\n";

const MESSAGE_ERROR_API_RESPONSE = "Error while connecting to server. Contact customer support with following message:";

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
    console.log(MESSAGE_ERROR_API_RESPONSE + "\n" + JSON.stringify(variable));
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
                    this.innerHTML = userInputValue;
                    incrementValueOfSubsequentElements(arrayEditionNumber, i, parseInt(userInputValue));
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

            // Check-box to check all issues.
            const tdCheckboxesForEntireEdition = document.createElement('td');
            const checkboxForEntireEdition = document.createElement('input');
            checkboxForEntireEdition.type = 'checkbox';
            checkboxForEntireEdition.addEventListener('change', function () {
                const checkboxes = tr.querySelectorAll('input[type="checkbox"][id^="checkboxOfIssue"]');
                const arrayIndividualIssues = [];
                for (let j = 0; j < checkboxes.length; j++) {
                    checkboxes[j].checked = checkboxForEntireEdition.checked;

                    if (checkboxes[j].checked) {
                        arrayIndividualIssues.push(FLAG_ISSUES_ALL_AVAILABLE);
                    }
                    else {
                        arrayIndividualIssues.push(FLAG_ISSUES_NOT_AVAILABLE);
                    }
                }
                arrayAvailabilityStatusIssuesOfEachYear[i] = arrayIndividualIssues;

                if(checkboxForEntireEdition.checked) {
                    arrayAvailabilityStatusYear[i] = FLAG_ISSUES_ALL_AVAILABLE;
                }  else {
                    arrayAvailabilityStatusYear[i] = FLAG_ISSUES_NOT_AVAILABLE;
                }

            });
            checkboxForEntireEdition.checked = arrayAvailabilityStatusYear[i] === FLAG_ISSUES_ALL_AVAILABLE;
            tdCheckboxesForEntireEdition.appendChild(checkboxForEntireEdition);

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
                const label = document.createElement('label');
                label.textContent = `${indexOfEdition + 1 }`;

                // Attach change event listener to checkbox
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
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

                    checkboxForEntireEdition.checked = false;

                    if (countChecked === 0) {
                        arrayAvailabilityStatusYear[i] = FLAG_ISSUES_NOT_AVAILABLE;
                    }
                    else if (countChecked === checkboxesInRow.length) {
                        checkboxForEntireEdition.checked = true;
                        arrayAvailabilityStatusYear[i] = FLAG_ISSUES_ALL_AVAILABLE;

                    }
                    else {
                        arrayAvailabilityStatusYear[i] = FLAG_ISSUES_SOME_AVAILABLE;
                    }
                });

                // Append checkbox to tdCheckboxesForIndividualIssues
                tdCheckboxesForIndividualIssues.appendChild(checkbox);
                tdCheckboxesForIndividualIssues.appendChild(label);
            }

            // Creating buttons to increase or decrease number of issues per year.
            const btnIssueCountIncrease = document.createElement('input');
            btnIssueCountIncrease.type = 'button';
            btnIssueCountIncrease.value = TEXT_BUTTON_ISSUE_COUNT_INCREASE;
            btnIssueCountIncrease.id = TEXT_BUTTON_ISSUE_COUNT_INCREASE + i;
            btnIssueCountIncrease.addEventListener("click", function() {
                changeIssueCountOfCurrentAndSubsequentYear(i, btnIssueCountIncrease.value);
            });

            const btnIssueCountDecrease = document.createElement('input');
            btnIssueCountDecrease.type = 'button';
            btnIssueCountDecrease.value = TEXT_BUTTON_ISSUE_COUNT_DECREASE;
            btnIssueCountDecrease.id = TEXT_BUTTON_ISSUE_COUNT_DECREASE + i;
            btnIssueCountDecrease.addEventListener("click", function() {
                changeIssueCountOfCurrentAndSubsequentYear(i, btnIssueCountDecrease.value);
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
            btnAddEdition.addEventListener("click", function () {
                matrixRowAddOrDelete(HTML_ELEMENT_VALUE_INCREASE);
            });

            const btnDeleteEdition = document.createElement('input');
            btnDeleteEdition.type = 'button';
            btnDeleteEdition.value = HTML_ELEMENT_VALUE_DECREASE;
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
            arrayIssuesInTheYear[i]++;
        } else {
            arrayAvailabilityStatusIssuesOfEachYear[i].pop();
            arrayIssuesInTheYear[i]--;
        }
    }
    printToConsole("AFTER: arrayAvailabilityStatusIssuesOfEachYear[editionIndexInMatrix]: " + arrayAvailabilityStatusIssuesOfEachYear[editionIndexInMatrix]);
    displayMatrixAsHTMLTable();

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
    maximumNumberOfLines = numberOfLines;
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
                    displayAPIResponseInHTML(response);
                },
                error: function(error) {
                    console.log(error);
                    printToAlert(error);
                }
            });
        });
    });
    printToConsole("Line 'ajaxForFormUserInput'");
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
            printToConsole("Line  'initialLoadingActivities'");
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

            editionsType = document.getElementById("txtTextEditionsType").value;
            yearStarting = parseInt(document.getElementById("txtNumberYearStarting").value);
            yearEnding = parseInt(document.getElementById("txtNumberYearEnding").value);
            volumeYearStarting = parseInt(document.getElementById("txtNumberVolumeStartingYear").value);
            editionsPerYear = parseInt(document.getElementById("txtNumberEditionsPerYear").value);
            div_matrix = document.querySelector("#"+ID_DIV_MATRIX);

            if(editionsPerYear>0) {
                // Adding '+1' to ensure 'ending' year is also included.
                initializeArrays();
                displayMatrixAsHTMLTable();
            }

        });

    }

    // All input text-fields with id start 'txtNumber'.
    {
        // Get all the text fields with type 'text'
        const textFields = document.querySelectorAll('input[type="text"]');

        // Apply the validation function to text fields with IDs starting with 'txtNumber'.
        textFields.forEach(textField => {
            if (textField.id.startsWith('txtNumber')) {
                textField.addEventListener('input', restrictToNumbers);
                textField.addEventListener('keydown', restrictToNumbers);
            }
        });
    }

    // Showing results from Java API.
    {
        ajaxForFormUserInput();
    }

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

// Function with main logic.
function main() {
    initialLoadingActivities();
}