import { combineReducers } from 'redux';
import { GET_LUNCH_PLACES, CLEAR_LUNCH_PLACES, apiConstants, GET_ERROR_RESPONSE, CLEAR_ERROR_RESPONSE } from "../_constants";

const lunchPlaces = (state = [], action) => {
  switch (action.type) {
    case GET_LUNCH_PLACES:
      return action.lunchPlaces;
    case CLEAR_LUNCH_PLACES:
      return [];
    default:
      return state;
  }
}

const errorResponse = (state = '', action) => {
  switch (action.type) {
    case GET_ERROR_RESPONSE:
      return action.errorResponse;
    case CLEAR_ERROR_RESPONSE:
      return '';
    default:
      return state;
  }
}

const api = (state = {requesting : false}, action) => {
  switch (action.type) {
    case apiConstants.API_REQUEST_START:
      return Object.assign({}, state, { requesting: true });
    case apiConstants.API_REQUEST_FINISH:
      return Object.assign({}, state, { requesting: false });
    default:
      return state
  }
}

const rootReducer = combineReducers({
  lunchPlaces,
  api,
  errorResponse
})

export default rootReducer;