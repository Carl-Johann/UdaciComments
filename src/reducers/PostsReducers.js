import {
  SET_ALL_POSTS,
  EDIT_POST_IN_ALL_POSTS,
} from '../actions/ActionTypes.js'


let initialPostsState = {
    allPosts: [],
}

function posts (state = initialPostsState, action) {
    switch (action.type) {

    case SET_ALL_POSTS: {
        let allPosts = action.allPosts

        return {
            ...state,
            allPosts
        }
    }


    case EDIT_POST_IN_ALL_POSTS: {
        let editPost = action.editPost
        let allPosts = state.allPosts
        let indexOfEditedPost = null

        let editedPosts = state.allPosts
        editedPosts.map( (p, index) => { if (p.id === editPost.id) { indexOfEditedPost = index }})
        editedPosts[indexOfEditedPost] = editPost

        return {
            ...state,
            allPosts: editedPosts
        }
    }

    default:
      return { ...state }
  }
}

export default posts