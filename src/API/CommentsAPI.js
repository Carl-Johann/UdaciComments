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
        headers: {
            ...headers
        },
        body: JSON.stringify({ option: vote })

    } ).then( response => response.json())