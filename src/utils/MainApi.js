export default class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._token = localStorage.getItem("jwt");
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getSavedMovies() {
    this._token = localStorage.getItem("jwt");
    if (this._token) {
      return fetch(`${this._url}/movies`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._token}`,
        },
      }).then(this._getResponse);
    }
  }

  saveMovie(movie) {
    if (this._token) {
      return fetch(`${this._url}/movies`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._token}`,
        },
        body: JSON.stringify(movie),
      }).then(this._getResponse);
    }
  }

  deleteMovie(id) {
    if (this._token) {
      return fetch(`${this._url}/movies/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._token}`,
        },
      }).then(this._getResponse);
    }
  }
}

export const apiMain = new MainApi({
  url: "https://api.movies.zakharova.nomoredomains.club",
});
