


   // 1. Book Class: Represents a Book
class Book {
  constructor( siteSubject,siteMessage,siteName,siteGender,sitePhone,siteEmail) {
    this.siteSubject = siteSubject;
    this.siteMessage = siteMessage;
    this.siteName = siteName;
    this.siteGender = siteGender;
    this.sitePhone = sitePhone;
    this.siteEmail = siteEmail;

  }
}

// 2. UI Class: Handle UI Tasks
class UI {
  static displayBooks() {

     
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

// 4. add book
  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.siteSubject}</td>
      <td>${book.siteMessage}</td>
      <td>${book.siteName}</td>
      <td>${book.siteGender}</td>
      <td>${book.sitePhone}</td>
      <td>${book.siteEmail}</td>
      <td><a class="btn btn-danger btn-sm delete"> X </a></td>
    `;

    list.appendChild(row);
    
  }
  

// 11. delete book  
  static deleteBook(el) {
    // if element contains .delete class
    if(el.classList.contains('delete')) {
    // remove <a> -> <td> -> <tr>       
      el.parentElement.parentElement.remove();
    }
  }

// 13. show alert  
// <div class="alert alert-success/alert-danger>Message</div>
  static showAlert(message, className) {
    const div = document.createElement('div');
     div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
   const form = document.querySelector('#myForm');
   container.insertBefore(div,form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

// 9. clear fields  
  static clearFields() {
    
    document.querySelector('#subject').value= '';
      document.querySelector('#message').value= '';
    document.querySelector('#name').value= '';
    document.querySelector('#gender').value= '';
     document.querySelector('#phone').value= '';
     document.querySelector('#email').value= '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    console.log(books);
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(siteEmail) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.siteEmail === siteEmail ) {
        books.splice(index, 1);
      }
    });
    

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// 4. Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// 5. Event: Add a Book
document.querySelector('#myForm').addEventListener('submit', (e) => {
  // 7. Prevent actual submit action
  e.preventDefault();

  // Get form values
  const siteSubject = document.querySelector('#subject').value;
  const siteMessage  = document.querySelector('#message').value;
  const  siteName = document.querySelector('#name').value;
  const siteGender  = document.querySelector('#gender').value;
  const sitePhone  = document.querySelector('#phone').value;
  const siteEmail  = document.querySelector('#email').value;

  // 12. Validate
  if(siteSubject==='' ||siteMessage===''  || siteName===''  || siteGender===''  || sitePhone===''  || siteEmail==='' ) {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // 6. Instatiate book
    const book = new Book(siteSubject,siteMessage,siteName,siteGender,sitePhone,siteEmail);
    // console.log(book);

    // 8. Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // 13. Show success message
    UI.showAlert('Information Added', 'success');

    // 9. Clear fields
    UI.clearFields();
  }
});

// 10. Event: Remove a Book - event propagation by selecting the parent
document.querySelector('#book-list').addEventListener('click', (e) => {
  // console.log(e.target);
  
  // 11. Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // 13. Show success message
  UI.showAlert('Information Removed', 'success');
});