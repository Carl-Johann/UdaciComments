import * as CommentsAPI from '../API/CommentsAPI'
import * as CategoriesAPI from '../API/CategoriesAPI'
import * as PostsAPI from '../API/PostsAPI'
import { editComment, deleteComment, setCategories, setComments, createComment, setPostsForCategory, setPostInDetail, editPost, setAllPosts, editPostInAllPosts } from './index';


export const actionDeleteComment = (commentToDeleteId) => {
    return (dispatch, getState) => {
        return CommentsAPI.deleteComment(commentToDeleteId).then( comment => {

            let cleanComments = getState().comments.comments.filter( c => c.id !== comment.id )
            dispatch(deleteComment({ cleanComments }))
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





export const actionCreateComment = (body, author, category, postId) => {
    return dispatch => {
        return CommentsAPI.createComment(body, author, category, postId).then( comment => {
            dispatch(createComment({ comment }))
        })
    }
}


export const actionSetPostsForCategory = (category) => {
    return dispatch => {
        return PostsAPI.getPostsByCategory(category).then( postsForCategory => {
            dispatch(setPostsForCategory({ postsForCategory }))
            return postsForCategory
        })
    }
}





export const actionSetPostByPostId = (postId) => {
    return dispatch => {
        return PostsAPI.getPostById(postId).then( postInDetail => {
            dispatch(setPostInDetail({ postInDetail }))
            return postInDetail
        })
    }
}








// We update 'allPosts' based on the post voted. This action is being called from 'CategorySelect.js'
export const actionVotePost = (postId, vote) => {
    return (dispatch, getState) => {
        return PostsAPI.votePost(postId, vote).then( votedPost => {
            dispatch(editPostInAllPosts({ editPost: votedPost }))
            return votedPost
        })
    }
}


// We update 'allPosts' based on the post being edited, from a 'CardPost.js'
export const actionEditPost = (titleValue, bodyValue, postId) => {
    return dispatch => {
        return PostsAPI.editPost(titleValue, bodyValue, postId).then( editedPost => {
            dispatch(editPostInAllPosts({ editPost: editedPost }))
        })
    }
}


// We should update 'allPosts' with one less post. The post we're deleteing. We can use the 'setAllPosts'
export const actionDeletePost = (postId) => {
    return (dispatch, getState) => {
        return PostsAPI.deletePost(postId).then( post => {
            let allPostsWithoutPostToDelete = getState().posts.allPosts.filter( post => post.id !== postId)

            dispatch(setAllPosts({ allPosts: allPostsWithoutPostToDelete }))
            return allPostsWithoutPostToDelete.length
        })
    }
}


// Sets the stores 'allPosts'.
// This is used throughout the app. We get all the posts, and sort out whats needed
export const actionSetAllPosts = () => {
    return dispatch => {
        return PostsAPI.getAllPosts().then( allPosts => {
            dispatch(setAllPosts({ allPosts }))
            return allPosts
        })
    }
}

// We set the comment for the post in detail
export const actionSetAllCommentsForPost = (postId) => {
    return dispatch => {
        return CommentsAPI.getAllCommentsForPost(postId).then( comments => {
            dispatch(setComments({ comments }))
        })
    }
}










export const actionClearPostsForCategory = () => {
    return dispatch => {
        dispatch(setPostsForCategory({ }))
    }
}






export const actionEditAPostInAllPosts = (title, body, postId) => {
    return dispatch => {
        return PostsAPI.editPost(title, body, postId).then( editPost => {
            dispatch(editPostInAllPosts({ editPost }))
            return editPost
        })
    }
}
















