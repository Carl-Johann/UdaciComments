
import {
  SET_CATEGORIES,
  SET_POSTS_FOR_CATEGORY,
  SET_COMMENTS,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SET_POST_IN_DETAIL,
  EDIT_POST,
  SET_ALL_POSTS,
  EDIT_POST_IN_ALL_POSTS,
} from '../actions/ActionTypes.js'

import { combineReducers } from 'redux'









let initialCategoriesState = {
    categories: []
}

function categories (state = initialCategoriesState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      const { categories } = action
    //   console.log(123)
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
        const { cleanComments } = action

        return {
            ...state,
            comments: cleanComments
        }


    default:
        return state
    }
}










let initialPostsState = {
    allPosts: [],
    postsForCategory: [],
    postInDetail: {},
}

function posts (state = initialPostsState, action) {
  switch (action.type) {

    case SET_POSTS_FOR_CATEGORY:
        const { postsForCategory } = action
        return {
            ...state,
            postsForCategory
        }


    case SET_POST_IN_DETAIL:
        const { postInDetail } = action
        // console.log("set post in detail:", postInDetail.title)
        return {
            ...state,
            postInDetail
        }

    case EDIT_POST:
        const { postToEdit } = action

        let indexOfPost = null
        state.postsForCategory.map( (p, index) => { if (p.id === postToEdit.id) { indexOfPost = index }})

        let newPosts = state.postsForCategory
        newPosts[indexOfPost] = postToEdit

        return {
            ...state,
            postsForCategory: newPosts
        }

    case SET_ALL_POSTS:
        const { allPosts } = action

        return {
            ...state,
            allPosts
        }

    case EDIT_POST_IN_ALL_POSTS:
        const { editPost } = action

        let indexOfnewPost = null
        state.allPosts.map( (p, index) => { if (p.id === editPost.id) { indexOfnewPost = index }})

        let editedPosts = state.allPosts
        editedPosts[indexOfnewPost] = editPost

        return {
            ...state,
            allPosts: editedPosts
        }


    default:
      return state
  }
}

export default combineReducers({
  categories,
  comments,
  posts,
})