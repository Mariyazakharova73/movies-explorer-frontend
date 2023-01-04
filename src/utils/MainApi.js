export default class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._token = JSON.parse(localStorage.getItem("token"));
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
    }).then(this._getResponse);
  }

  saveMovie(dataMovie) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(dataMovie),
    }).then(this._getResponse);
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponse);
  }
}

export const apiMain = new MainApi({
  url: "https://api.movies.zakharova.nomoredomains.club",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${this._token}`,
  },
});
