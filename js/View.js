class View {
    constructor() {
        this.bookTable = document.getElementById('book-table');

        this.createBookBtn = document.getElementById('new-book');

        this.editBtns = [];

        this.bookTitle = document.getElementById('book-title');
        this.bookAuthor = document.getElementById('book-author');
        this.bookPrice = document.getElementById('book-price');

        this.editBookTitle = document.getElementById('edit-title');
        this.editBookAuthor = document.getElementById('edit-author');
        this.editBookPrice = document.getElementById('edit-price');
        this.sendEditBookData = document.getElementById('edit-book');

        this.modalEdit = document.getElementById('exampleModal');

        this.selectBookId = document.querySelector('.set-id-book');

        this.colTitle = document.getElementById('col-title');
    }
    populateTable(books) {
        this.bookTable.innerHTML = "";
        books.forEach(book => {
            const newRow = this.createEl('tr');
            const newColumTitle = this.createEl('td');
            const newColumAuthor = this.createEl('td');
            const newColumPrice = this.createEl('td');
            const newColumOption = this.createEl('td');
            const bookId = book.id;

            newColumTitle.innerText = book.title;
            newColumAuthor.innerText = book.author;
            newColumPrice.innerHTML = this.formatNumberToBrl(book.price);

            this.appendEl(newColumOption, `
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle btn-options-overwrite" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
              
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li><button class="dropdown-item edit-book-btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" data-bookid="${bookId}">Editar</button></li>
              <li><button class="dropdown-item delete-book-btn" type="button" data-bookid="${bookId}">Exlcuir</button></li>
            </ul>
          </div>
          `);

            newRow.appendChild(newColumTitle);
            newRow.appendChild(newColumAuthor);
            newRow.appendChild(newColumPrice);
            newRow.appendChild(newColumOption);

            this.bookTable.appendChild(newRow);
        })
    }

    appendEl(referenceEl, child) {
        if (typeof child === "string") {
            referenceEl.insertAdjacentHTML('beforeend', child);
        } else {
            referenceEl.appendChild(child);
        }
    }

    formatNumberToBrl(num) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(num)
    }

    cleanEl(el) {
        el.innerHTML = '';
    }

    createEl(el) {
        return document.createElement(el);
    }

    append(parent, child) {
        parent.appendChild(child);
    }

    modalIsOpen() {
        this.modalEdit = document.querySelectorAll('.show');
    }

    setEditBtns() {
        this.editBtns = document.querySelectorAll('.edit-book-btn');
    }

    setSendEditBtns() {
        this.sendEditBookData = document.querySelectorAll('.send-edit-book-btn');
    }

    setDeleteBtns() {
        this.deleteBtns = document.querySelectorAll('.delete-book-btn');
    }

    getBookId() {
        this.setEditBtns();

    }

    bindCreateBook(handler) {
        this.createBookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handler();
        })
    }

    bindEditBookBtn(handler) {
        this.editBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const bookId = btn.dataset.bookid;
                handler(bookId);
            });
        })
    }

    bindEditBook(handler) {
        this.sendEditBookData.forEach(btn => {
            btn.addEventListener('click', () => {
                // const bookId = btn.dataset.bookid;
                handler();
            })
        });

    }

    bindDeleteBook(handler) {
        this.deleteBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const bookId = btn.dataset.bookid
                handler(bookId);
            });
        })
    }

    createNewColumn(listColumn) {
        for (let property of listColumn) {
            let col = document.createElement('th');
            col.innerText = property;
            this.colTitle.appendChild(col);
        };
        let colOption = document.createElement('th');
        colOption.innerText = "Opções";
        this.colTitle.appendChild(colOption);

    }
}