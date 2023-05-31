
const INITIAL_VALUE_MATRIX = 0;
const ID_DIV_MATRIX = "divMatrix";
const MATRIX_COLUMN_INDICES = {
    COLUMN_INDEX_OF_EDITION_TYPE: 0,
    COLUMN_INDEX_OF_YEAR: 1
};

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

// Function will ensure all input text-fields only accept digits as input.
function bindEventListenersToTxtNumber() {
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

// Function to convert a matrix to HTML table. Created by ChatGPT.
function displayMatrixAsHTMLTable() {

    // Remove existing table if it exists
    clearHTMLTable();

    const table = document.createElement('matrixTable');
    let startingYear = yearStarting;

    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('tr');

        const rowIndexCell = document.createElement('td');
        // rowIndexCell.textContent = startingYear;

        const labelEditionType = document.createElement('label');
        labelEditionType.id = 'labelEditionType' + startingYear;
        labelEditionType.innerHTML = matrix[i][MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_EDITION_TYPE];

        volumeYearStarting++;

        // Create text-fields for each year.
        const textFieldYear = document.createElement('input');
        textFieldYear.type = 'text'
        textFieldYear.value = matrix[i][MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_YEAR];
        textFieldYear.id = 'txtNumberYear' + startingYear;
        textFieldYear.addEventListener('input', function(event) {
            incrementValueOfColumnInSubsequentRowsByOne(i, MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_YEAR);
        });


        // Create a main checkbox for each year (year-checkbox).
        const checkboxOfYear = document.createElement('input');
        checkboxOfYear.type = 'checkbox';
        checkboxOfYear.addEventListener('change', function() {
            const checkboxes = row.querySelectorAll('input[type="checkbox"]');
            for (let j = 0; j < checkboxes.length; j++) {
                checkboxes[j].checked = checkboxOfYear.checked;
            }
        });

        // Set year-checkbox value based on matrix item
        checkboxOfYear.checked = false;

        // Attach change event listener to year-checkbox.
        checkboxOfYear.addEventListener('change', function () {
            if (this.checked) {
                // matrix[i][j] = 1; // Set matrix value to 1 if checkbox is checked
            } else {
                // matrix[i][j] = 0; // Set matrix value to 0 if checkbox is unchecked
            }
            printToConsole(matrix);
        });

        // Append year information to row.
        row.appendChild(labelEditionType);
        row.appendChild(checkboxOfYear);
        row.appendChild(textFieldYear);

        row.appendChild(rowIndexCell);
        printToConsole("hello");
        startingYear++;

        // Creating individual checkbox for each edition of year.
        for (let indexOfMatrixColumn = Object.keys(MATRIX_COLUMN_INDICES).length, indexOfEdition = 1; indexOfMatrixColumn < matrix[i].length; indexOfMatrixColumn++, indexOfEdition++) {
            const cell = document.createElement('td');

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
                printToConsole(matrix);
            });

            // Append checkbox to cell
            cell.appendChild(checkbox);
            cell.appendChild(label);


            // Append cell to row
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    if(div_matrix !== undefined)
        div_matrix.appendChild(table);
}

// Function will add edition type (i.e. 'vol. 1') and year (i.e. '2000') to specific column indices.
function matrixAddEditionTypeAndYearToEachRow() {

    for(let i=0; i<matrix.length; i++) {
        matrix[i][MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_EDITION_TYPE] = editionsType + ". " + (volumeYearStarting+ i);
        matrix[i][MATRIX_COLUMN_INDICES.COLUMN_INDEX_OF_YEAR] = yearStarting + i;
    }

}

// Function to increment of all cells in column below the specified row.
function incrementValueOfColumnInSubsequentRowsByOne(indexRow, indexOfColumn) {
    printToConsole("incrementValueOfColumnInSubsequentRowsByOne(");
    printToConsole("indexRow :" + indexRow);
    printToConsole("indexOfColumn :" + indexOfColumn);
    printToConsole("matrix.length :" + matrix.length);
    for(let i=indexRow+1; i<matrix.length; i++) {
        matrix[indexRow][indexOfColumn]++;
        printToConsole("i :" + i);
        printToConsole(" matrix[indexRow][indexOfColumn] :" +  matrix[indexRow][indexOfColumn]);
    }
    printToConsole(matrix);

    // displayMatrixAsTable(matrix);
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
    bindEventListenersToTxtNumber();

    printToConsole("End: main()")

}