import Cookies from 'js-cookie'

export function getName() {
  return localStorage.getItem('username')
}

export function setName(username) {
  return localStorage.setItem('username', username)
}

export function getToken(username) {
  if (username === null) {
    return null
  } else {
    return Cookies.get(username)
  }
}

export function setToken(info) {
  return Cookies.set(info.username, info.token)
}

export function removeName() {
  return localStorage.removeItem('username')
}

export function removeToken(username) {
  return Cookies.remove(username)
}
