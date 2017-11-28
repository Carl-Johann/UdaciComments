import posts from './PostsReducers'
import categories from './CategoryReducers'
import comments from './CommentReducers'

import { combineReducers } from 'redux'

export default combineReducers({
  categories,
  comments,
  posts,
})