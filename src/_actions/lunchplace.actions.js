import { SUCCESS_RESPONSE, GET_LUNCH_PLACES, CLEAR_LUNCH_PLACES, GET_ERROR_RESPONSE, CLEAR_ERROR_RESPONSE } from "../_constants";
import { apiActions } from "./api.actions";
import { lunchPlaceService } from "../_services";
import { appHelpers } from "../_helpers";

export const lunchPlaceActions = {
  getLunchPlaces
}

function getLunchPlaces(params) {
  return dispatch => {
    dispatch(apiActions.startRequest())
    return lunchPlaceService.getLunchPlaceVenues(params)
      .then(
        res => {
          dispatch(apiActions.endRequest())
          if (res.response.status === SUCCESS_RESPONSE) {
            dispatch(setLunchPlaces(res.response.data.response.venues))
            dispatch(clearErrorResponse())
          } else {
            dispatch(clearLunchPlaces())
            dispatch(getErrorResponse(appHelpers.interpretErrorResponse(res.response)))
          }
        })
      .catch((error) => console.log(error))
  }
  function setLunchPlaces(lunchPlaces) { return { type: GET_LUNCH_PLACES, lunchPlaces } }
  function clearLunchPlaces() { return { type: CLEAR_LUNCH_PLACES }}
  function getErrorResponse(errorResponse) { return { type: GET_ERROR_RESPONSE, errorResponse } }
  function clearErrorResponse() { return { type: CLEAR_ERROR_RESPONSE } }
}