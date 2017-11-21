export const SET_CATEGORIES         = 'SET_CATEGORIES'
export const SET_POSTS              = 'SET_POSTS'
export const SET_CATEGORY           = 'SET_CATEGORY'
export const SET_COMMENTS           = 'SET_COMMENTS'
export const SET_COMMENT            = 'SET_COMMENT'
export const SET_POSTS_FOR_CATEGORY = 'SET_POSTS_FOR_CATEGORY'
export const REMOVE_POST_BY_ID      = 'REMOVE_POST_BY_ID'


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
    return {
        type: SET_COMMENT,
        comment
    }
}

export function setComments ({ comments }) {
    return {
        type: SET_COMMENTS,
        comments
    }
}

export function setPostsForCategory ({ postsForCategory }) {
    console.log(123456, postsForCategory)
    return {
        type: SET_POSTS_FOR_CATEGORY,
        postsForCategory
    }
}

export function removePostById ({ postId }) {
    return {
        type: REMOVE_POST_BY_ID,
        postId,
    }
}

