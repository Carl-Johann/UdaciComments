import {
  SET_CATEGORIES
} from '../actions/ActionTypes.js'


let initialCategoriesState = {
    categories: []
}

function categories (state = initialCategoriesState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      const { categories } = action

      return {
        ...state,
        categories
      }

    default: {
        return { ...state }
    }
  }
}

export default categories