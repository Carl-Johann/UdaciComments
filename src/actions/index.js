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
} from './ActionTypes'

export function setCategories ({ categories }) {
    return {
        type: SET_CATEGORIES,
        categories
    }
}

export function setPostsForCategory ({ postsForCategory }) {
    return {
        type: SET_POSTS_FOR_CATEGORY,
        postsForCategory
    }
}

export const setComments = ({ comments }) => {
    return {
        type: SET_COMMENTS,
        comments
    }
}

export const createComment = ({ comment }) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

export const editComment = ({ commentToEdit }) => {
    return {
        type: EDIT_COMMENT,
        commentToEdit
    }
}

export const editPost = ({ postToEdit }) => {
    return {
        type: EDIT_POST,
        postToEdit
    }
}

export const editPostInAllPosts = ({ editPost }) => {
    return {
        type: EDIT_POST_IN_ALL_POSTS,
        editPost
    }
}

export const deleteComment = ({ cleanComments }) => {
    return {
        type: DELETE_COMMENT,
        cleanComments
    }
}

export const setPostInDetail = ({ postInDetail }) => {
    return {
        type: SET_POST_IN_DETAIL,
        postInDetail
    }
}

export const setAllPosts = ({ allPosts }) => {
    return {
        type: SET_ALL_POSTS,
        allPosts
    }
}