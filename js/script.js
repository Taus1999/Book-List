//Define UI eLEMENTS
let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');

//Classes
//BOOK Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

//UI CLASS
class UI {

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addToBookList(book));
    }

    static addToBookList(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`;

        list.appendChild(row);

    }
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }
    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);

    }
    static deleteFromBook(target) {
        if(target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            UI.showAlert("Book Removed!", "success");
            
        }


    }
}

//store class in ls
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBooks(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static clearBooks(isbn) {
        
        const books = Store.getBooks();
        
        
        books.forEach((book, index) => {
            if(book.isbn === isbn) {            
                books.splice(index, 1);
                console.log(books);
            }
            
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//add Event Listeners
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Define functions

// add new book function
function newBook(e) {
    let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;

    /* let ui = new UI(); */

    if(title === '' || author === '' || isbn === '') {
        UI.showAlert("Please fill out all the fields!", "error");

    } else {
        let book = new Book(title, author, isbn);
         
        UI.addToBookList(book);

        Store.addBooks(book);
    
        UI.clearFields();
        
        UI.showAlert("Book has been Added!", "success");

    }



    e.preventDefault();
}

//removeBook function
function removeBook(e) {
    /* let ui = new UI; */
    UI.deleteFromBook(e.target);
    Store.clearBooks(e.target.parentElement.previousElementSibling.textContent);
    
    e.preventDefault();
}











/*
whaen static functions are declared in a class then i dont need to create an object of that class, rathher i can call out those staic function by the class's name */