import {
  SET_CATEGORIES,
  SET_POSTS,
  SET_CATEGORY,
  SET_COMMENTS,
  SET_COMMENT,
  SET_POSTS_FOR_CATEGORY,
  REMOVE_POST_BY_ID,
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


function comments (state = {}, action) {
    switch(action.type) {
        case SET_COMMENT:
            const { comment } = action

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
    case SET_POSTS:
        const { posts } = action

        return {
            ...state,
            posts
        }

    case SET_POSTS_FOR_CATEGORY:
        const { postsForCategory } = action
        console.log("State", state.posts)

        return {
            ...state,
            postsForCategory
        }

    case REMOVE_POST_BY_ID:
        const { postId } = action
        let filteredPosts = state.posts.filter( post => post.id !== postId)

        return {
            ...state,
            posts: filteredPosts
        }

    default :
      return state
  }
}

export default combineReducers({
  categories,
  comments,
  posts ,
})