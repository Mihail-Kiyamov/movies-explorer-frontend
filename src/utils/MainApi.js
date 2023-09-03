class MainApi {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    changeUser(inputs) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: inputs.name,
                email: inputs.email
            })
        })
            .then(this._checkResponse)
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._checkResponse)
    }

    saveMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify(movie)
        })
            .then(this._checkResponse)
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._checkResponse)
    }
}

const mainApi = new MainApi('https://api.movie.explorer.nomoreparties.co', {
    'Content-Type': 'application/json'
})

export default mainApi;