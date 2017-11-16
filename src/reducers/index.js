import {
  SET_CATEGORIES,
  SET_POSTS,
  SET_CATEGORY,
  SET_COMMENTS,
  SET_COMMENT,
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

    case SET_CATEGORY :
        const { category } = action

        return {
            ...state,
            category
        }

    default :
      return state
  }
}

let initlianCommentsState = {
    comments: []
}

function comments (state = {}, action) {
    switch(action.type) {
        case SET_COMMENT:
            const { comment } = action
            console.log("Comment: ", comment)
            console.log("state comments: ", state.comments)


            const updatedItems = state.comments.map( state_comment => {
                if (state_comment.id === comment.id) {
                    return { ...state_comment, ...action.comment }
                }
                return state_comment
            })

            return updatedItems

        case SET_COMMENTS:
            const { comments } = action

            return {
                ...state,
                comments
            }

        default:
            return state
    }
}

function posts (state = {}, action) {


  switch (action.type) {
    case SET_POSTS :
        const { posts } = action

        return {
            ...state,
            posts
        }

    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})