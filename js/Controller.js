class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.init();
    }

    init() {
        this.model.getBooks()
            .then(books => {
                this.view.populateTable(books);
                this.view.setEditBtns();
                this.view.setDeleteBtns();
                this.view.setSendEditBtns();
                this.view.bindEditBookBtn(this.openEditBook.bind(this));
                this.view.bindDeleteBook(this.deleteBook.bind(this));
                this.view.bindCreateBook(this.insertBook.bind(this));
                this.view.bindEditBook(this.editBook.bind(this));
                this.createColumn();
            });
    }

    renderTable() {
        this.view.setEditBtns();
        this.view.setSendEditBtns();
        this.view.setDeleteBtns();
        this.view.bindEditBookBtn(this.openEditBook.bind(this));
        this.view.bindDeleteBook(this.deleteBook.bind(this));
    }

    openEditBook(id) {
        this.model.getBook(id).then(book => {
            this.view.editBookTitle.value = book.title;
            this.view.editBookAuthor.value = book.author;
            this.view.editBookPrice.value = book.price;
            this.view.selectBookId.setAttribute('data-bookid', book.id);
        });
    }

    insertBook() {
        const title = this.view.bookTitle.value;
        const author = this.view.bookAuthor.value;
        const price = this.view.bookPrice.value

        const createBookApi = {
            title: title,
            author: author,
            price: price,
        }

        this.model.createBook(createBookApi).then(data => {
            if (data.status === 201) {
                this.model.getBooks().then(books => {
                    this.view.populateTable(books);
                    this.renderTable();
                });
            }
        });

        this.view.bookTitle.value = "";
        this.view.bookAuthor.value = "";
        this.view.bookPrice.value = "";

    }

    deleteBook(id) {
        this.model.deleteBook(id).then(data => {
            this.model.getBooks().then(books => {
                this.view.populateTable(books);
                this.renderTable();

            });
        }).catch(err => console.log(err));
    }

    editBook() {
        const title = this.view.editBookTitle.value;
        const author = this.view.editBookAuthor.value;
        const price = this.view.editBookPrice.value;
        const id = this.view.selectBookId.dataset.bookid;

        const createBookApi = {
            title: title,
            author: author,
            price: price
        }
        this.model.updateBook(id, createBookApi).then(data => {
            this.model.getBooks().then(books => {
                this.view.populateTable(books);
                this.renderTable();
                this.view.bindEditBook(this.editBook.bind(this));
            });
        });
    }

    createColumn() {
        this.model.getBooks()
            .then(books => {
                let obj = books[0];
                let keys = [];

                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (key != "id") {
                            keys.push(key);
                            console.log(keys);
                        }
                    }
                }
                this.view.createNewColumn(keys);
            })
    }
}

const books = new Model();
const booksTable = new View();

new Controller(books, booksTable);
