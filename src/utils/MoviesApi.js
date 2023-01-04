export default class MoviesApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._url, {
      headers: this._headers,
    }).then(this._getResponse);
  }
}

export const apiMovies = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});
