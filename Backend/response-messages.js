const SERVER_ERROR_MESSAGE = "Unexpected server error";
const DELETE_MESSAGE = "Deleted Correctly";
const UPDATE_MESSAGE = "Updated Correctly";
const AUTHENTICATION_ERROR_MESSAGE = "Token error";
const RESOURSE_NOT_FOUND_MESSAGE = "Resource not found";
const DUBLICATE_KEY_MESSAGE = "Duplicate field value entered";
const TYPE_ERROR_MESSAGE = "There are error in backend code check endpoint variable";
const PERMISSION_ERROR_MESSAGE = "You Don't have the permission for this request";
const FAILED_TO_LOGIN_MESSAGE = "No such user exists";
const FAILED_TO_EXCUTE_QUERY_MESSAGE = "Can't excute the request query right now";
const USER_DATA_INCOMPLETE_MESSAGE = "Some of user data is missed";
const INVALID_USER_EMAIL_MESSAGE = "The user Email is not valid";
const USER_EXIST_ERROR_MESSAGE = "This user already exist.";
const CAN_NOT_UPDATE_USER_ERROR_MESSAGE = "This user doesn't exist or the data is the same.";
const NO_USER_WITH_ID_ERROR_MESSAGE = "No user with this ID";
const WRONG_PERMISSION_NAME_ERROR_MESSAGE = "you use wrong name for the Permission";
const CAN_NOT_ADD_PERMISSION_ERROR_MESSAGE = "This Permission already exist or this user Id isn't exist.";
const CAN_NOT_EDIT_PERMISSION_ERROR_MESSAGE = "The old permission doesn't exist or the new permission already exist.";
const CAN_NOT_DELETE_PERMISSION_ERROR_MESSAGE = "this permission doesn't exist";

module.exports = {
    SERVER_ERROR_MESSAGE,
    AUTHENTICATION_ERROR_MESSAGE,
    DELETE_MESSAGE,
    UPDATE_MESSAGE,
    RESOURSE_NOT_FOUND_MESSAGE,
    DUBLICATE_KEY_MESSAGE,
    TYPE_ERROR_MESSAGE,
    FAILED_TO_LOGIN_MESSAGE,
    FAILED_TO_EXCUTE_QUERY_MESSAGE,
    PERMISSION_ERROR_MESSAGE,
    USER_DATA_INCOMPLETE_MESSAGE,
    INVALID_USER_EMAIL_MESSAGE,
    USER_EXIST_ERROR_MESSAGE,
    CAN_NOT_UPDATE_USER_ERROR_MESSAGE,
    NO_USER_WITH_ID_ERROR_MESSAGE,
    WRONG_PERMISSION_NAME_ERROR_MESSAGE,
    CAN_NOT_ADD_PERMISSION_ERROR_MESSAGE,
    CAN_NOT_EDIT_PERMISSION_ERROR_MESSAGE,
    CAN_NOT_DELETE_PERMISSION_ERROR_MESSAGE
}