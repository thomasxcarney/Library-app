const myLibrary = [];
const booksContainer = document.querySelector('.books-container');

const addBookButton = document.querySelector('#add-book');
const addBookDialog = document.querySelector('#add-book-dialog');
const bookDialog = document.querySelector('#add-book-dialog');
const confirmBtn = document.querySelector('#confirmBtn');
const allInputs = document.querySelectorAll('.input');
const haveReadRadio = document.getElementById('read-button');
const deleteButtons = document.getElementsByClassName('delete');

class Book {
    constructor(title, author, pages, status){
        this.title = title
        this.author = author
        this.pages = pages
        this.status = status
    }

    info() {
        return this.title + " by " + this.author + ', ' + this.pages + ' pages, ' + this.status;
    };
}


const solitude = new Book('100 Years of Solitude', 'Gabriel García Márquez', '417', 'have read');
const danceDance = new Book('Dance Dance Dance', 'Haruki Murakami', '416', 'have read')


function addBookToLibrary(book) {
    myLibrary.push(book)
};

function addDeleteButton(parent) {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.innerHTML = 'X';
    deleteButton.addEventListener('click', event => {
        let parent = deleteButton.parentNode;
        deleteCard(parent.classList[1]);
    })
    parent.appendChild(deleteButton);
}

function deleteCard(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function addStatusBtn(parent) {
    const statusBtn = document.createElement('button');
    statusBtn.classList.add('statusBtn');
    statusBtn.innerHTML = 'Change status';
    statusBtn.addEventListener('click', event => {
        let parent = statusBtn.parentNode;
        changeStatus(parent);
    })
    parent.appendChild(statusBtn);
}

function changeStatus(parent) {
    let bookIndex = parent.classList[1];
    let book = myLibrary[bookIndex];
    if(book.status == 'have read') {
        book.status = 'have not read';
    } else if(book.status == 'have not read') {
        book.status = 'have read';
    };
    displayBooks();
}

function displayBooks() {
    booksContainer.innerHTML = '';
    for(let i = 0; i < myLibrary.length; i++){
        const newDiv = document.createElement('div');
        newDiv.classList.add('book-card', i);
        let book = myLibrary[i];
        populateBookCard(book, newDiv);
        addDeleteButton(newDiv);
        addStatusBtn(newDiv);
        booksContainer.appendChild(newDiv);
    };
};

function populateBookCard(book, container) {
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const status = document.createElement('p');
    title.innerHTML = book.title;
    author.innerHTML = 'By ' + book.author;
    pages.innerHTML = book.pages + ' pages';
    status.innerHTML = book.status;
    container.appendChild(title);
    container.appendChild(author);
    container.appendChild(pages);
    container.appendChild(status);
}

addBookButton.addEventListener('click', event => {
    addBookDialog.showModal();
});

function clearInputs() {
    allInputs.forEach(singleInput => singleInput.value = '');
    haveReadRadio.checked = true;
};

const titleInput = document.getElementById("title");
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');

const checkInputValidity = function checkInputValidityOnSubmit(element) {
    if(element.validity.valueMissing) {
        return false;
        // element.setCustomValidity('This field is required');
        // element.reportValidity();
    } else return true;
};

const checkAllInputs = function checkValidityOfAllInputs(input1, input2, input3){
    if(checkInputValidity(input1) && checkInputValidity(input2) && checkInputValidity(input3)){
        addNewBook();
    };
};

confirmBtn.addEventListener('click', event => {
    event.preventDefault();
    checkAllInputs(titleInput, authorInput, pagesInput);
});


const addNewBook = function addNewBookFromFormData(){
    bookDialog.close()
    let status = document.querySelector('input[name="status"]:checked').value;
    let title = document.querySelector('input[name="title"]').value;
    let author = document.querySelector('input[name="author"]').value;
    let pages = document.querySelector('input[name="pages"]').value;
    let newBook = new Book(title, author, pages, status);
    addBookToLibrary(newBook);
    displayBooks();
    bookDialog.close();
    clearInputs();
};

addBookToLibrary(solitude);
addBookToLibrary(danceDance);
displayBooks();
