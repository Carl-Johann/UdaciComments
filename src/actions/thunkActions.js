import * as CommentsAPI from '../API/CommentsAPI'
import * as CategoriesAPI from '../API/CategoriesAPI'
import * as PostsAPI from '../API/PostsAPI'
import { editComment, deleteComment, setCategories, setComments, createComment, setPostsForCategory, setPostInDetail, editPost } from './index';


export const actionDeleteComment = (commentToDeleteId) => {
    return (dispatch, getState) => {
        return CommentsAPI.deleteComment(commentToDeleteId).then( () => {
            let cleanedComments = getState().comments.filter( c => c.id !== commentToDeleteId)
            dispatch(deleteComment(cleanedComments))
        })
    }
}


export const actionVoteComment = (Id, vote) => {
    return dispatch => {
        return CommentsAPI.voteComment(Id, vote).then( commentToEdit => {
            dispatch(editComment({ commentToEdit }))
        })
    }
}

export const actionEditComment = (bodyValue, commentId) => {
    return dispatch => {
        return CommentsAPI.editComment(commentId, bodyValue).then( commentToEdit => {
            dispatch(editComment({ commentToEdit }))
        })
    }
}


export const actionSetCategories = () => {
    return dispatch => {
        return CategoriesAPI.getAllCategories().then( categories => {
            dispatch(setCategories({ categories }))
        })
    }
}


export const actionSetAllCommentsForPost = (postId) => {
    return dispatch => {
        return CommentsAPI.getAllCommentsForPost(postId).then( comments => {
            dispatch(setComments({ comments }))
        })
    }
}


export const actionCreateComment = (body, author, category, postId) => {
    return dispatch => {
        return PostsAPI.createPost(body, author, category, postId).then( comment => {
            dispatch(createComment({ comment }))
        })
    }
}


export const actionSetPostsForCategory = (category) => {
    return dispatch => {
        return PostsAPI.getPostsByCategory(category).then( postsForCategory => {
            dispatch(setPostsForCategory({ postsForCategory }))
            return postsForCategory.length
        })
    }
}


export const actionDeletePost = (postId) => {
    return (dispatch, getState) => {
        return PostsAPI.deletePost(postId).then( post => {
            let postsForCategory = getState().posts.postsForCategory.filter( post => post.id !== postId)
            dispatch(setPostsForCategory({ postsForCategory }))
            return postsForCategory.length
        })
    }
}


export const actionSetPostByPostId = (postId) => {
    return dispatch => {
        return PostsAPI.getPostById(postId).then( postInDetail => {
            dispatch(setPostInDetail({ postInDetail }))
        })
    }
}


export const actionVotePost = (postId, vote) => {
    return dispatch => {
        return PostsAPI.votePost(postId, vote).then( postInDetail => {
            dispatch(setPostInDetail({ postInDetail }))
        })
    }
}


export const actionClearPostsForCategory = () => {
    return dispatch => {
        dispatch(setPostsForCategory({ }))
    }
}


export const actionEditPost = (titleValue, bodyValue, postId) => {
    return dispatch => {
        return PostsAPI.editPost(titleValue, bodyValue, postId).then( postToEdit => {
            console.log(postToEdit)
            dispatch(editPost({ postToEdit }))
        })
    }
}


export const g = () => {
    return dispatch => {

    }
}