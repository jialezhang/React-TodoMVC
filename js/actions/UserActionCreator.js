import { dispatchAsync } from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/GithubConstant';
import * as UserAPI from '../api/UserAPI';
import UserStore from '../stores/UserStore';

export function requestUser(username, field) {
  if(UserStore.contains(username, field)) {
    return;
  }

  dispatchAsync(UserAPI.getUser(username), {
    request: ActionTypes.REQUEST_USER,
    success: ActionTypes.REQUEST_USER_SUCCESS,
    failure: ActionTypes.REQUEST_USER_ERROR
  }, {username});
}
