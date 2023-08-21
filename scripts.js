const myLibrary = [];
const booksContainer = document.querySelector('.books-container');

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

function displayBooks() {
    for(let i = 0; i < myLibrary.length; i++){
        const newDiv = document.createElement('div');
        newDiv.classList.add('book-card');
        newDiv.innerHTML += myLibrary[i].info();
        booksContainer.appendChild(newDiv);
    };
};

addBookToLibrary(hobbit);
addBookToLibrary(danceDance);
displayBooks();