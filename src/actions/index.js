export const SET_CATEGORIES     = 'SET_CATEGORIES'
export const SET_POSTS          = 'SET_POSTS'
export const SET_CATEGORY       = 'SET_CATEGORY'
export const SET_COMMENTS       = 'SET_COMMENTS'
export const SET_COMMENT        = 'SET_COMMENT'

export function setCategories ({ categories }) {
    return {
        type: SET_CATEGORIES,
        categories
    }
}

export function setPosts ({ posts }) {
    return {
        type: SET_POSTS,
        posts
    }
}

export function setCategory ({ category }) {
    return {
        type: SET_CATEGORY,
        category
    }
}

export function setComment ({ comment }) {
    console.log("comment in action", comment)
    return {
        type: SET_COMMENT,
        comment
    }
}

export function setComments ({ comments }) {
    // console.log("comments in setCommentSSSSS", comments)
    return {
        type: SET_COMMENTS,
        comments
    }
}
