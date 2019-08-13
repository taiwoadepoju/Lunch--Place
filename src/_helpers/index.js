import axios from 'axios';
import { SUCCESS_RESPONSE } from '../_constants';

export const appHelpers = {
  getRequest: function (url) {
    let config = { "Content-Type": "application/json" }
    return axios
      .get(url, config)
      .then(function (res) {
        return res;
      })
      .catch(function (err) {
        return err
      });
  },

  interpretErrorResponse: function (error) {
    let errorMessage = "";
    if (error.response === undefined) {
      errorMessage = "check your network connection!";
    } else {
      errorMessage = error ? (error.response.data
        ? (error.response.data.message) ? error.response.data.message : error.response.data
        : "Unable to handle request") : "Unable to handle request";
    }
    if (typeof errorMessage === "string") {
      return errorMessage;
    } else {
      return "An error occured!";
    }
  },

  formatPromiseResponse: function (res, resType) {
    let responseType =
      resType === undefined ? SUCCESS_RESPONSE : resType;
    return { status: responseType, response: res };
  }
}