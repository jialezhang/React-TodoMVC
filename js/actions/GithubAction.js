import { dispatchAsync } from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/GithubConstant';
import * as GithubAPI from '../api/GithubAPI';
import GithubStore from '../stores/GithubStore';

export function requestQuery(query) {
  // Exit early if we know enough about this user
  if (GithubStore.contains(query)) {
    return;
  }
  dispatchAsync(GithubAPI.getQuery(query), {
    request: ActionTypes.REQUEST_QUERY,
    success: ActionTypes.REQUEST_QUERY_SUCCESS,
    failure: ActionTypes.REQUEST_QUERY_ERROR
  }, { query });
}
