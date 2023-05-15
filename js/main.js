
// Global Variable declarations.
let editionsType, yearStarting, yearEnding, editionsPerYear;

const INITIAL_VALUE_MATRIX = 0;

// Function to get input parameters.
document.getElementById("btnSubmit").addEventListener("click", function() {
    printStringToConsole("Start: Reading parameters from text fields.")

    event.preventDefault();

    editionsType = document.getElementById("editionsType").value;
    yearStarting = document.getElementById("yearStarting").value;
    yearEnding = document.getElementById("yearEnding").value;
    editionsPerYear = document.getElementById("editionsPerYear").value;

    printStringToConsole("End: Reading parameters from text fields.")

    main();
});

// Function to print console outputs.
function printStringToConsole(stringToBePrinted) {
    console.log(stringToBePrinted);
}

// Function to create a matrix where number-of-rows = (end-start) years, number-of-columns = number-of-issues-in-a-year.
function createMatrix(rows, columns, initialValue) {

    printStringToConsole("Start: createMatrix()")

    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
            row.push(initialValue);
        }
        matrix.push(row);
    }

    printStringToConsole("End: createMatrix()")
    return matrix;
}

function displayMatrixAsTable(matrix) {
    const table = document.createElement('table');

    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('td');
            cell.textContent = matrix[i][j];
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    document.body.appendChild(table);
}

// Function with main logic.
function main() {

    printStringToConsole("Start: main()")

    let numberOfYears = yearEnding - yearStarting;
    let matrixYearAndEditions = createMatrix(numberOfYears, editionsPerYear, INITIAL_VALUE_MATRIX);

    console.log("Matrix is :", JSON.stringify(matrixYearAndEditions));

    displayMatrixAsTable(matrixYearAndEditions);

    printStringToConsole("End: main()")

}