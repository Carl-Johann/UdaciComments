import {
  SET_CATEGORIES,
  SET_POSTS,
  SET_CATEGORY
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
})