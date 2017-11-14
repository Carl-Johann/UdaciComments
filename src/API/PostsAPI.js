const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(response => response.json())
    .then(data => data)

export const getPostById = (Id) =>
    fetch(`${api}/posts/${Id}`, { headers })
        .then(response => response.json())
        .then(data => data)