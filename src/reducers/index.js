import {
  SET_CATEGORIES,
  SET_POSTS_FOR_CATEGORY,
  SET_COMMENTS,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions'

import { combineReducers } from 'redux'

function categories (state = {}, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      const { categories } = action

      return {
        ...state,
        categories
      }

    default:
        return state
  }
}


let initalCommentsState = {
    comments: []
}
function comments (state = initalCommentsState, action) {
    switch(action.type) {
    case SET_COMMENTS:
        const { comments } = action

        return {
            ...state,
            comments
        }

    case CREATE_COMMENT:
        const { comment } = action
        let new_comments = state.comments.concat([comment])

        return {
            ...state,
            comments: new_comments
        }

    case EDIT_COMMENT:
        const { commentToEdit } = action

        let indexOfComment = null
        state.comments.map( (c, index) => { if (c.id === commentToEdit.id) { indexOfComment = index }})

        let newVotedComments = state.comments
        newVotedComments[indexOfComment] = commentToEdit

        return {
            ...state,
            comments: newVotedComments
        }

    case DELETE_COMMENT:
        const { commentToDeleteId } = action

        let commentsWithoutDeletedComment = state.comments.filter( c => c.id !== commentToDeleteId)


        return {
            ...state,
            comments: commentsWithoutDeletedComment
        }


    default:
        return state
    }
}


let initialPostsState = {
    postsForCategory: []
}

function posts (state = initialPostsState, action) {
  switch (action.type) {

    case SET_POSTS_FOR_CATEGORY:
        const { postsForCategory } = action
        return {
            ...state,
            postsForCategory
        }

    default:
      return state
  }
}

export default combineReducers({
  categories,
  comments,
  posts ,
})