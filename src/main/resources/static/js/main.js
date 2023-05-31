
const INITIAL_VALUE_MATRIX = 0;
const ID_DIV_MATRIX = "divMatrix";
const MATRIX_COLUMN_INDICES = {
    COLUMN_INDEX_OF_EDITION_TYPE: 0,
    COLUMN_INDEX_OF_EDITION_NUMBER: 1,
    COLUMN_INDEX_OF_YEAR: 2
};
const KEY_TO_CONFIRM_YEAR_UPDATE = 'Enter';
const TEXT_LABEL_HEADER_EDITION_TYPE = "Edition Type";
const TEXT_LABEL_HEADER_EDITION_NUMBER = "Number";
const TEXT_LABEL_HEADER_EDITION_CHECKBOX = "Checkbox";
const TEXT_LABEL_HEADER_YEAR = "Year";
const TEXT_LABEL_HEADER_ISSUES= "Issues";

// Global Variable declarations.
let editionsType, yearStarting, yearEnding, volumeYearStarting, editionsPerYear;
let matrix, div_matrix;

// Function to get input parameters. Created by ChatGPT.
document.getElementById("btnSubmit").addEventListener("click", function() {
    printToConsole("Start: Reading parameters from text fields.")

    event.preventDefault();

    editionsType = document.getElementById("txtTextEditionsType").value;
    yearStarting = parseInt(document.getElementById("txtNumberYearStarting").value);
    yearEnding = parseInt(document.getElementById("txtNumberYearEnding").value);
    volumeYearStarting = parseInt(document.getElementById("txtNumberVolumeStartingYear").value);
    editionsPerYear = parseInt(document.getElementById("txtNumberEditionsPerYear").value);
    div_matrix = document.querySelector("#"+ID_DIV_MATRIX);


    printToConsole("End: Reading parameters from text fields.")

    main();
});

// Function to print console outputs.
function printToConsole(variable) {
    console.log(JSON.stringify(variable));
}

// Function to create a matrix where number-of-rows = (end-start) years, number-of-columns = number-of-issues-in-a-year. Created by ChatGPT.
function createMatrix(rows, columns, initialValue) {

    printToConsole("Start: createMatrix()")

    matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push(initialValue);
        }
        matrix.push(row);
    }

    printToConsole("End: createMatrix()")
    return matrix;
}

// Function to clear contents of the div 'divMatrix'. This replaces the table.
function clearHTMLTable() {

    const divElement = document.getElementById('divMatrix');

    if(matrix.length > 0 || divElement!== null ) {

        divElement.innerHTML = '';
    }

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

// Function will add event-listener to all input text-fields with id start 'txtNumber'.
function addEventListenersToTxtNumber() {
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

// // Function will add event-listener to all input labels with id start 'label'.
// function addEventListenersToLabels() {
//     // Get all the text fields with type 'text'
//     const labels = document.querySelectorAll('label');
//
//     // Apply the validation function to text fields with IDs starting with 'txtNumber'.
//     labels.forEach(label => {
//         if (label.id.startsWith('label')) {
//             label.addEventListener('dblclick', updateLabelValue);
//         }
//     });
// }
//
// // Event-listener to get change a label value using prompt.
// function updateLabelValue() {
//
//     let userInputValue = prompt('Enter edition type:');
//     if (userInputValue !== null) {
//         this.innerHTML = userInputValue;
//         incrementIntegerValueOfColumnInSubsequentRowsByOne(i, MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_EDITION_TYPE, userInputValue);
//     }
//
//
// }

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
    table.appendChild(thead);

    let tbody = document.createElement('tBody');
    {

        for (let i = 0; i < matrix.length; i++, volumeYearStarting++) {

            const tr = document.createElement('tr');

            const tdEditionType = document.createElement('td');
            const labelEditionType = document.createElement('label');
            labelEditionType.id = 'labelEditionType' + (yearStarting + i);
            labelEditionType.innerHTML = matrix[i][MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_EDITION_TYPE];
            labelEditionType.addEventListener('dblclick', function (event) {
                let userInputValue = prompt('Enter edition type:');
                if (userInputValue !== null) {
                    this.innerHTML = userInputValue;
                    updateTextValueOfColumnInSubsequentRows(i, MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_EDITION_TYPE, userInputValue);
                }
            });
            tdEditionType.appendChild(labelEditionType);

            const tdEditionNumber = document.createElement('td');
            const labelEditionNumber = document.createElement('label');
            labelEditionNumber.id = 'labelEditionNumber' + (yearStarting + i);
            labelEditionNumber.innerHTML = matrix[i][MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_EDITION_NUMBER];
            tdEditionNumber.appendChild(labelEditionNumber);

            const tdYear = document.createElement('td');
            // Create text-fields for each year.
            const textFieldYear = document.createElement('input');
            textFieldYear.type = 'text'
            textFieldYear.value = matrix[i][MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_YEAR];
            textFieldYear.id = 'txtNumberYear' + (yearStarting + i);
            textFieldYear.addEventListener('keydown', function (event) {
                if (event.key.toLowerCase() === KEY_TO_CONFIRM_YEAR_UPDATE.toLowerCase()) {
                    incrementIntegerValueOfColumnInSubsequentRowsByOne(i, MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_YEAR, parseInt(textFieldYear.value));
                }
            });
            tdYear.appendChild(textFieldYear);

            const tdCheckboxesForEntireEdition = document.createElement('td');
            const checkboxForEntireEdition = document.createElement('input');
            checkboxForEntireEdition.type = 'checkbox';
            checkboxForEntireEdition.addEventListener('change', function () {
                const checkboxes = tr.querySelectorAll('input[type="checkbox"]');
                for (let j = 0; j < checkboxes.length; j++) {
                    checkboxes[j].checked = checkboxForEntireEdition.checked;
                }
            });
            // Set year-checkbox value based on matrix item
            checkboxForEntireEdition.checked = false;
            // Attach change event listener to year-checkbox.
            checkboxForEntireEdition.addEventListener('change', function () {
                if (this.checked) {
                    // matrix[i][j] = 1; // Set matrix value to 1 if checkbox is checked
                } else {
                    // matrix[i][j] = 0; // Set matrix value to 0 if checkbox is unchecked
                }
                printToConsole(matrix);
            });
            tdCheckboxesForEntireEdition.appendChild(checkboxForEntireEdition);

            // Append year information to row.
            tr.appendChild(tdEditionType);
            tr.appendChild(tdEditionNumber);
            tr.appendChild(tdYear);
            tr.appendChild(tdCheckboxesForEntireEdition);

            const tdCheckboxesForIndividualIssues = document.createElement('td');
            // Creating individual checkbox for each edition of year.
            for (let indexOfMatrixColumn = Object.keys(MATRIX_COLUMN_INDICES).length, indexOfEdition = 1; indexOfMatrixColumn < matrix[i].length; indexOfMatrixColumn++, indexOfEdition++) {

                // Create checkbox element
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                // Set checkbox value based on matrix item
                checkbox.checked = matrix[i][indexOfMatrixColumn] !== 0;

                // Create label for checkbox
                const label = document.createElement('label');
                label.textContent = `${indexOfEdition}`;

                // Attach change event listener to checkbox
                checkbox.addEventListener('change', function () {
                    if (this.checked) {
                        matrix[i][indexOfMatrixColumn] = 1; // Set matrix value to 1 if checkbox is checked
                    } else {
                        matrix[i][indexOfMatrixColumn] = 0; // Set matrix value to 0 if checkbox is unchecked
                    }
                });

                // Append checkbox to tdCheckboxesForIndividualIssues
                tdCheckboxesForIndividualIssues.appendChild(checkbox);
                tdCheckboxesForIndividualIssues.appendChild(label);


            }

            // Append tdCheckboxesForIndividualIssues to row
            tr.appendChild(tdCheckboxesForIndividualIssues);

            tbody.appendChild(tr);
            table.appendChild(tbody);
        }

    }
    if(div_matrix !== undefined)
        div_matrix.appendChild(table);
}

// Function will add edition type (i.e. 'vol. 1') and year (i.e. '2000') to specific column indices.
function matrixAddEditionTypeAndYearToEachRow() {

    for(let i=0; i<matrix.length; i++) {
        matrix[i][MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_EDITION_TYPE] = editionsType;
        matrix[i][MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_EDITION_NUMBER] = volumeYearStarting + i;
        matrix[i][MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_YEAR] = yearStarting + i;
    }

}

// Increment of cells in column below the specified row.
function updateTextValueOfColumnInSubsequentRows(indexRow, indexOfColumn, updatedValue) {
    printToConsole("updateTextValueOfColumnInSubsequentRows(");
    matrix[indexRow][indexOfColumn] = updatedValue;
    for(let i=indexRow+1; i<matrix.length; i++) {
        if(i>0) {
            matrix[i][indexOfColumn] = updatedValue;
        }
        printToConsole("i :" + i);
        printToConsole(" matrix[i][indexOfColumn] :" +  matrix[i][indexOfColumn]);
    }
    printToConsole(matrix);

    displayMatrixAsHTMLTable();
}

// Change text value of cells below current row of same column.
function incrementIntegerValueOfColumnInSubsequentRowsByOne(indexRow, indexOfColumn, updatedValue) {
    printToConsole("incrementIntegerValueOfColumnInSubsequentRowsByOne(");
    // printToConsole("indexRow :" + indexRow);
    // printToConsole("indexOfColumn :" + indexOfColumn);
    // printToConsole("matrix.length :" + matrix.length);
    matrix[indexRow][indexOfColumn] = updatedValue;
    for(let i=indexRow+1; i<matrix.length; i++) {
        if(i>0) {
            matrix[i][indexOfColumn] = matrix[i-1][indexOfColumn] + 1;
        }
        printToConsole("i :" + i);
        printToConsole(" matrix[i][indexOfColumn] :" +  matrix[i][indexOfColumn]);
    }
    printToConsole(matrix);

    displayMatrixAsHTMLTable();
}

// Function with main logic.
function main() {


    printToConsole("Start: main()")

    // Adding '+1' to ensure 'ending' year is also included.
    let numberOfYears = yearEnding - yearStarting + 1;
    // Adding '+2' to number of years to add 'edition number' and 'year' information.
    let matrixYearAndEditions = createMatrix(numberOfYears, editionsPerYear + Object.keys(MATRIX_COLUMN_INDICES).length, INITIAL_VALUE_MATRIX);
    matrixAddEditionTypeAndYearToEachRow(matrixYearAndEditions);

    console.log("Matrix is :", JSON.stringify(matrixYearAndEditions));

    displayMatrixAsHTMLTable(matrixYearAndEditions);
    addEventListenersToTxtNumber();

    printToConsole("End: main()")

}