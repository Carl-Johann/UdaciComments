import {
  SET_COMMENTS,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../actions/ActionTypes.js'

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

export default comments