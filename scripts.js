const myLibrary = [];
const booksContainer = document.querySelector('.books-container');

const addBookButton = document.querySelector('#add-book');
const addBookDialog = document.querySelector('#add-book-dialog');
const bookDialog = document.querySelector('#add-book-dialog');
const confirmBtn = document.querySelector('#confirmBtn');
const allInputs = document.querySelectorAll('.input');
const haveReadRadio = document.getElementById('read-button');

function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.info = function() {
        return this.title + " by " + this.author + ', ' + this.pages + ' pages, ' + this.status;
    };
};


const hobbit = new Book('The Hobbit', 'Tolkien', '300', 'have read');
const danceDance = new Book('Dance Dance Dance', 'Murakami', '450', 'have read')


function addBookToLibrary(book) {
    myLibrary.push(book)
};

function addDeleteButton(parent) {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'X'
    parent.appendChild(deleteButton);
}

function displayBooks() {
    booksContainer.innerHTML = '';
    for(let i = 0; i < myLibrary.length; i++){
        const newDiv = document.createElement('div');
        newDiv.classList.add('book-card', i);
        newDiv.innerHTML += myLibrary[i].info();
        addDeleteButton(newDiv);
        booksContainer.appendChild(newDiv);
    };
};

addBookButton.addEventListener('click', event => {
    addBookDialog.showModal();
});

function clearInputs() {
    allInputs.forEach(singleInput => singleInput.value = '');
    haveReadRadio.checked = true;
};

confirmBtn.addEventListener('click', event => {
    event.preventDefault();
    bookDialog.close()
    let status = document.querySelector('input[name="status"]:checked').value;
    let title = document.querySelector('input[name="title"]').value;
    let author = document.querySelector('input[name="author"]').value;
    let pages = document.querySelector('input[name="pages"]').value;
    let newBook = new Book(title, author, pages, status);
    addBookToLibrary(newBook);
    displayBooks();
    event.preventDefault();
    bookDialog.close();
    clearInputs();
});

addBookToLibrary(hobbit);
addBookToLibrary(danceDance);
displayBooks();
