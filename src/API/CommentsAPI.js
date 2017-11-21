const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllPostsForComment = (postId) =>
    fetch( `${api}/posts/${postId}/comments`, { headers } )
        .then( response => response.json() )
        .then( data => data )

export const voteComment = (commentId, vote) =>
    fetch( `${api}/comments/${commentId}`, {
        method: "post",
        headers,
        body: JSON.stringify({ option: vote })

    })
    .then( response => response.json())
    .then( data => data )

export const createComment = (body, author, category, parentId) =>
    fetch( `${api}/comments`, {
        method: "post",
        headers: {
            ...headers
        },
        body: JSON.stringify({
            id: Math.random().toString(36).substr(-8),
            body: body,
            author: author,
            category: category,
            timestamp: Date.now(),
            parentId: parentId
        })

    }).then( response => response.json())


export const deleteComment = (commentId) =>
    fetch( `${api}/comments/${commentId}`, { method: 'delete', headers } )
        .then( response => response.json() )
        .then( data => data )
