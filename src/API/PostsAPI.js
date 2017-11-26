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
    fetch(`${api}/posts/${Id}`, { method: 'GET', headers })
        .then(response => response.json())
        .then(data => data)


export const votePost = (id, vote) =>
    fetch( `${api}/posts/${id}`, {
        method: "post",
        headers,
        body: JSON.stringify({ option: vote })

    } ).then( response => response.json())

export const getPostsByCategory = (category) =>
    fetch( `${api}/${category}/posts`, { headers })
        .then(response => response.json())
        .then(data => data)


export const createPost = (title, body, author, category) =>
    fetch( `${api}/posts`, {
        method: "post",
        headers,
        body: JSON.stringify({
            id: Math.random().toString(36).substr(-8),
            title: title,
            body: body,
            author: author,
            category: category,
            timestamp: Date.now(),
        })

    }).then( response => response.json() )

export const deletePost = (postId) =>
    fetch( `${api}/posts/${postId}`, { method: 'delete', headers } )
        .then( response => response.json() )
        .then( data => data )


export const editPost = (title, body, postId) =>
    fetch( `${api}/posts/${postId}`, {
        method: "put",
        headers,
        body: JSON.stringify({
            title: title,
            body: body
        })

    }).then( response => response.json() )