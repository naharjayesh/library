// Constructor
function Book(name, author, category) {
    this.name = name;
    this.author = author;
    this.category = category;
}

// Display contsructor
function Display() {}

// Delete row
Display.prototype.deleteRow = function (index) {
    let stored = localStorage.getItem("library");

    if (stored == null) {
        storedObj = [];
    } else {
        storedObj = JSON.parse(stored);
    }

    storedObj.splice(index, 1);
    localStorage.setItem("library", JSON.stringify(storedObj));
    globalObject.show("Success", "Your book has been successfully deleted");
    globalObject.showTable();
};

// Show table content from local storage
Display.prototype.showTable = function () {
    let stored = localStorage.getItem("library");

    if (stored == null) {
        storedObj = [];
    } else {
        storedObj = JSON.parse(stored);
    }

    tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ``;

    storedObj.forEach(function (element, index) {
        tableContent = `
        <tr>
            <td>${element.name}</td>
            <td>${element.author}</td>
            <td>${element.category}</td>
            <td><button id='${index}' onclick='globalObject.deleteRow(this.id)'  class="btn btn-primary">Delete</button></td>
        </tr>
        `;
        tableBody.innerHTML += tableContent;
    });
};

// Display table whenver page loads
let globalObject = new Display();
globalObject.showTable();

// Add methods to display prototype
// Display.prototype.add = function (book) {
//     tableBody = document.getElementById("tableBody");
//     let tableContent = `
//     <tr>
//         <td>${book.name}</td>
//         <td>${book.author}</td>
//         <td>${book.category}</td>
//         <td><button id='${index}' onclick='deleteRow(this.id)'  class="btn btn-primary">Delete</button></td>
//     </tr>
//     `;
//     tableBody.innerHTML += tableContent;
// };

// Implementing validation
Display.prototype.validate = function (book) {
    if (book.name.length > 3 || book.author.length > 3) {
        return true;
    } else {
        return false;
    }
};

// Success/Failure message
Display.prototype.show = function (type, message) {
    let alertMessage = document.getElementById("alertMessage");
    alertMessage.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>Message:</strong> ${message}.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                              </div>`;
    setTimeout(() => {
        alertMessage.innerHTML = ``;
    }, 3000);
};

// Clear form
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
};

// Add event listener to submit button
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("authorName").value;

    let category = "";
    let fiction = document.getElementById("fiction");
    let crimeThriller = document.getElementById("crimeThriller");
    let science = document.getElementById("science");

    let display = new Display();

    if (fiction.checked) {
        category = fiction.value;
    } else if (crimeThriller.checked) {
        category = crimeThriller.value;
    } else if (science.checked) {
        category = science.value;
    } else {
        display.show("Error", "Please check all the fields.");
        return;
    }

    let stored = localStorage.getItem("library");

    if (stored == null) {
        storedObj = [];
    } else {
        storedObj = JSON.parse(stored);
    }

    let book = new Book(name, author, category);
    // console.log(book);

    if (display.validate(book)) {
        display.show("Success", "Your book has been successfully added");
        storedObj.push(book);
        localStorage.setItem("library", JSON.stringify(storedObj));
        globalObject.showTable();
        display.clear();
    } else {
        display.show("Error", "Please check all the fields.");
    }
}
