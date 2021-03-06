import {handleResponse} from './handleResponse';

export const get = url =>
  new Promise(
    (resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(json => resolve(json))
    }
  )

const apiCall = (url, method, body, resolve, reject) =>
  fetch(url, {
    method: method,
    headers: {
      "Content-Type": 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ sessionStorage.token
    },
    body: JSON.stringify(body)
  })
  .then(response => handleResponse(response)
                    .then(resJson => resolve(resJson)))

export const put = (url, body) =>
  new Promise(
    (resolve, reject) => apiCall(url, 'PUT', body, resolve, reject)
  )

export const post = (url, body) =>
  new Promise(
    (resolve, reject) => apiCall(url, 'POST', body, resolve, reject)
  )

export const destroy = (url) =>
new Promise(
  (resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ sessionStorage.token
      }
    }).then(response => handleResponse(response)
      .then(resJson => resolve(resJson)))
  }
)