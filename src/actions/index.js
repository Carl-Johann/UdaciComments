export const SET_CATEGORIES         = 'SET_CATEGORIES'
export const SET_POSTS_FOR_CATEGORY = 'SET_POSTS_FOR_CATEGORY'
export const SET_COMMENTS           = 'SET_COMMENTS'
export const CREATE_COMMENT         = 'CREATE_COMMENT'
export const EDIT_COMMENT           = 'EDIT_COMMENT'
export const DELETE_COMMENT         = 'DELETE_COMMENT'

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

export const deleteComment = (commentToDeleteId) => {
    return {
        type: DELETE_COMMENT,
        commentToDeleteId
    }
}

