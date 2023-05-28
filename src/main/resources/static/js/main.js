
const INITIAL_VALUE_MATRIX = 0;
const ID_DIV_MATRIX = "divMatrix";

// Global Variable declarations.
let editionsType, yearStarting, yearEnding, volumeStartingYear, editionsPerYear;
let matrix, div_matrix;

// Function to get input parameters. Created by ChatGPT.
document.getElementById("btnSubmit").addEventListener("click", function() {
    printToConsole("Start: Reading parameters from text fields.")

    event.preventDefault();

    editionsType = document.getElementById("txtTextEditionsType").value;
    yearStarting = document.getElementById("txtNumberYearStarting").value;
    yearEnding = document.getElementById("txtNumberYearEnding").value;
    volumeStartingYear = document.getElementById("txtNumberVolumeStartingYear").value;
    editionsPerYear = document.getElementById("txtNumberEditionsPerYear").value;
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

// Function to clear any existing matrix.
function matrixClear() {



    if(div_matrix) {
        while (div_matrix.firstChild) {
            printToConsole(div_matrix);
        }
    }

    div_matrix = document.createElement('div');
    div_matrix.id = ID_DIV_MATRIX;
    document.body.appendChild(div_matrix);

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
function textFieldsTypeTextMakeNumberInputOnly() {
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
function displayMatrixAsTable(matrix) {

    // Remove existing table if it exists
    matrixClear();

    const table = document.createElement('matrixTable');
    let startingYear = yearStarting;

    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('tr');

        const rowIndexCell = document.createElement('td');
        // rowIndexCell.textContent = startingYear;

        const labelEditionType = document.createElement('label');
        labelEditionType.id = 'labelEditionType' + startingYear;
        labelEditionType.innerHTML = editionsType + ". " + volumeStartingYear;

        volumeStartingYear++;

        // Create text-fields for each year.
        const textFieldYear = document.createElement('input');
        textFieldYear.type = 'text'
        textFieldYear.value = `${startingYear}`;
        textFieldYear.id = 'txtNumberYear' + startingYear;


        // Create checkbox element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
            const checkboxes = row.querySelectorAll('input[type="checkbox"]');
            for (let j = 0; j < checkboxes.length; j++) {
                checkboxes[j].checked = checkbox.checked;
            }
        });

        // Set checkbox value based on matrix item
        checkbox.checked = false;



        // Attach change event listener to checkbox
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                // matrix[i][j] = 1; // Set matrix value to 1 if checkbox is checked
            } else {
                // matrix[i][j] = 0; // Set matrix value to 0 if checkbox is unchecked
            }
            printToConsole(matrix);
        });

        // Append checkbox to cell
        row.appendChild(labelEditionType);
        row.appendChild(checkbox);
        row.appendChild(textFieldYear);

        row.appendChild(rowIndexCell);
        printToConsole("hello");
        startingYear++;

        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('td');

            // Create checkbox element
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            // Set checkbox value based on matrix item
            checkbox.checked = matrix[i][j] !== 0;

            // Create label for checkbox
            const label = document.createElement('label');
            label.textContent = `${j+1}`;

            // Attach change event listener to checkbox
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    matrix[i][j] = 1; // Set matrix value to 1 if checkbox is checked
                } else {
                    matrix[i][j] = 0; // Set matrix value to 0 if checkbox is unchecked
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


    div_matrix.appendChild(table);
}

// Function with main logic.
function main() {


    printToConsole("Start: main()")

    // Adding '+1' to ensure 'ending' year is also included.
    let numberOfYears = yearEnding - yearStarting + 1;
    let matrixYearAndEditions = createMatrix(numberOfYears, editionsPerYear, INITIAL_VALUE_MATRIX);

    console.log("Matrix is :", JSON.stringify(matrixYearAndEditions));

    displayMatrixAsTable(matrixYearAndEditions);
    textFieldsTypeTextMakeNumberInputOnly();

    printToConsole("End: main()")

}