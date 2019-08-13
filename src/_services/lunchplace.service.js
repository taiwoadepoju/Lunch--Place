import { BASE_API_URL, CLIENT_ID, CLIENT_SECRET } from "../_constants";
import { appHelpers } from "../_helpers";

export const lunchPlaceService = {
  getLunchPlaceVenues
}

function getLunchPlaceVenues(params) {
  return appHelpers.getRequest(`${BASE_API_URL}venues/search?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&query=${params.query}&near=${params.near}&v=${params.v}&limit=${params.limit}`)
    .then(response => {
      return appHelpers.formatPromiseResponse(response)
    }).catch(error => {
      return error;
    })
}