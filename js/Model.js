const BASE_URL = 'http://localhost:3000/books';
const contentType = {
    "Content-Type": "application/json"
}


class Model {
    getBooks() {
        return fetch(BASE_URL)
            .then(res => res.json());
    }

    getBook(id) {
        return fetch(BASE_URL + "/" + id, {
            method: "GET",
            headers: contentType,
        }).then(res => res.json());
    }

    createBook(book) {
        return fetch(BASE_URL, {
            method: "POST",
            headers: contentType,
            body: JSON.stringify(book)
        });
    }

    updateBook(id, book) {
        return fetch(BASE_URL + "/" + id, {
            method: "PUT",
            headers: contentType,
            body: JSON.stringify(book)
        })
    }

    deleteBook(id) {
        return fetch(BASE_URL + "/" + id, {
            method: "DELETE",
            headers: contentType,
        })
    }
}

//i18n