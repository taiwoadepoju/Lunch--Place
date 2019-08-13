import { apiConstants } from '../_constants';

function startRequest() { return { type: apiConstants.API_REQUEST_START } }
function endRequest() { return { type: apiConstants.API_REQUEST_FINISH } }

export const apiActions = {
    startRequest,
    endRequest
};
