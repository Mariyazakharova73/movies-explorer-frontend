export default class authApi {
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

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then(this._getResponse);
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._getResponse);
  }

  editProfile(name, email) {
    this._token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify({ name: name, email: email }),
    }).then(this._getResponse);
  }

  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponse);
  }
}

export const apiAuth = new authApi({
  url: "https://api.movies.zakharova.nomoredomains.club",
  headers: {
    "Content-Type": "application/json",
  },
});
