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

const FLAG_ISSUES_NOT_AVAILABLE = 0;
const FLAG_ISSUES_ALL_AVAILABLE = 1;
const FLAG_ISSUES_SOME_AVAILABLE = 2;

// Global Variable declarations.
let editionsType, yearStarting, yearEnding, volumeYearStarting, editionsPerYear;
let arrayEditionDescription, arrayEditionNumber, arrayYear, arrayAvailabilityStatusYear, arrayAvailabilityStatusIssuesOfEachYear, div_matrix;


// Function to print console outputs.
function printToConsole(variable) {
    console.log(JSON.stringify(variable));
}

// Initialize individual arrays.
function initializeArrays() {

    arrayEditionDescription = [];
    arrayEditionNumber = [];
    arrayYear = [];
    arrayAvailabilityStatusYear = [];
    arrayAvailabilityStatusIssuesOfEachYear = [];

    const yearRange = yearEnding - yearStarting + 1;
    
    for(let i=0; i<yearRange; i++) {
        arrayEditionDescription.push(editionsType)
        arrayEditionNumber.push(volumeYearStarting++);
        arrayYear.push(yearStarting++)
        arrayAvailabilityStatusYear.push(FLAG_ISSUES_NOT_AVAILABLE);
        // Creating an array of length 'editionsPerYear' with all elements having value 'FLAG_ISSUES_NOT_AVAILABLE' and pushing it to 'arrayAvailabilityStatusIssuesOfEachYear'.
        arrayAvailabilityStatusIssuesOfEachYear.push(Array.from({ length: editionsPerYear }, () => FLAG_ISSUES_NOT_AVAILABLE));
    }
}

// Function to clear contents of the div 'divMatrix'. This replaces the table.
function clearHTMLTable() {
    const divElement = document.getElementById('divMatrix');
    divElement.innerHTML = '';
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
    table.appendChild(thead);

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
                checkbox.checked = arrayAvailabilityStatusYear[i][indexOfEdition]  === FLAG_ISSUES_ALL_AVAILABLE;

                // Create label for checkbox
                const label = document.createElement('label');
                label.textContent = `${indexOfEdition + 1 }`;

                // Attach change event listener to checkbox
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        arrayAvailabilityStatusIssuesOfEachYear[i][indexOfEdition] = FLAG_ISSUES_ALL_AVAILABLE; // Value to 1 if checkbox is checked

                    } else {
                        arrayAvailabilityStatusIssuesOfEachYear[i][indexOfEdition] = FLAG_ISSUES_NOT_AVAILABLE; // Value to 1 if checkbox is not-checked.
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
            tr.appendChild(tdEditionType);
            tr.appendChild(tdEditionNumber);
            tr.appendChild(tdYear);
            tr.appendChild(tdCheckboxesForEntireEdition);
            tr.appendChild(tdCheckboxesForIndividualIssues);
            tbody.appendChild(tr);
            table.appendChild(tbody);
        }
    }
    if(div_matrix !== undefined)
        div_matrix.appendChild(table);
}

// Adding Event-Listener to HTML elements.
function addEventListenerToHTMLElements() {

    let divMatrix = document.getElementById("divMatrix");
    let btnGenerateSummary = document.getElementById("btnGenerateSummary");

    // For 'Generate Summary' button.
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
            document.getElementById('arrayEditionDescription').value = arrayEditionDescription;
            document.getElementById('arrayEditionNumber').value = arrayEditionNumber;
            document.getElementById('arrayYear').value = arrayYear;
            document.getElementById('arrayAvailabilityStatusYear').value = arrayAvailabilityStatusYear;
            document.getElementById('arrayAvailabilityStatusIssuesOfEachYear').value = arrayAvailabilityStatusIssuesOfEachYear;
        });
    }

    // For 'Clear All' button.
    {
        document.getElementById("btnClearAll").addEventListener("click", function() {
            clearHTMLTable();
            document.getElementById("btnGenerateSummary").disable = false;
        })
    }

    // For 'Create Table' button.
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

// Function with main logic.
function main() {


    addEventListenerToHTMLElements();


}