const ErrorResponse = require('../helpers/errorResponse');
const ResponseMessage = require('../response-messages');
const ResponseCode = require('../response-codes');

const errorHandler = (err, req, res, next) => {
  console.log("I am in error")
  switch (err) 
  {
    case ResponseCode.AUTHENTICATION_ERROR:
        error = new ErrorResponse(ResponseCode.AUTHENTICATION_ERROR, ResponseMessage.AUTHENTICATION_ERROR_MESSAGE);
        res.json(error);
        break;
    case ResponseCode.LOGIN_ERROR:
      error = new ErrorResponse(ResponseCode.LOGIN_ERROR, ResponseMessage.FAILED_TO_LOGIN_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.DATABASE_QUERY_ERROR:
      error = new ErrorResponse(ResponseCode.DATABASE_QUERY_ERROR, ResponseMessage.FAILED_TO_EXCUTE_QUERY_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.DATABASE_QUERY_ERROR:
      error = new ErrorResponse(ResponseCode.SERVER_ERROR, ResponseMessage.SERVER_ERROR_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.PERMISSION_ERROR:
      error = new ErrorResponse(ResponseCode.PERMISSION_ERROR, ResponseMessage.PERMISSION_ERROR_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.USER_DATA_INCOMPLETE:
      error = new ErrorResponse(ResponseCode.USER_DATA_INCOMPLETE, ResponseMessage.USER_DATA_INCOMPLETE_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.INVALID_USER_EMAIL:
      error = new ErrorResponse(ResponseCode.INVALID_USER_EMAIL, ResponseMessage.INVALID_USER_EMAIL_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.USER_EXIST_ERROR:
      error = new ErrorResponse(ResponseCode.USER_EXIST_ERROR, ResponseMessage.USER_EXIST_ERROR_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.CAN_NOT_UPDATE_USER_ERROR:
      error = new ErrorResponse(ResponseCode.CAN_NOT_UPDATE_USER_ERROR, ResponseMessage.CAN_NOT_UPDATE_USER_ERROR_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.NO_USER_WITH_ID_ERROR:
      error = new ErrorResponse(ResponseCode.NO_USER_WITH_ID_ERROR, ResponseMessage.NO_USER_WITH_ID_ERROR_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.WRONG_PERMISSION_NAME_ERROR:
      error = new ErrorResponse(ResponseCode.WRONG_PERMISSION_NAME_ERROR, ResponseMessage.WRONG_PERMISSION_NAME_ERROR_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.CAN_NOT_ADD_PERMISSION_ERROR:
      error = new ErrorResponse(ResponseCode.CAN_NOT_ADD_PERMISSION_ERROR, ResponseMessage.CAN_NOT_ADD_PERMISSION_ERROR_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.CAN_NOT_EDIT_PERMISSION_ERROR:
      error = new ErrorResponse(ResponseCode.CAN_NOT_EDIT_PERMISSION_ERROR, ResponseMessage.CAN_NOT_EDIT_PERMISSION_ERROR_MESSAGE);
      res.json(error);
      break;
    case ResponseCode.CAN_NOT_DELETE_PERMISSION_ERROR:
      error = new ErrorResponse(ResponseCode.CAN_NOT_DELETE_PERMISSION_ERROR, ResponseMessage.CAN_NOT_DELETE_PERMISSION_ERROR_MESSAGE);
      res.json(error);
      break;
    default:
      console.log(err);
      error = new ErrorResponse(400, err)
      res.json(error);
      break;
  }
};

module.exports = errorHandler;