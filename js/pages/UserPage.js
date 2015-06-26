import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import * as UserActionCreators from '../actions/UserActionCreator';
import UserStore from '../stores/UserStore';
import User from '../components/User';
import connectToStores from '../utils/connectToStores';

function parseLogin(params) {
  return params.username;
}

/**
 * Requests data from server for current props.
 */
function requestData(props) {
  const { params } = props;
  const username = parseLogin(params);

  UserActionCreators.requestUser(username, ['name', 'avatarUrl']);
}

/**
 * Retrieves state from stores for current props.
 */
function getState(props) {
  const username = parseLogin(props.params);

  const user = UserStore.get(username);

  return {
    user
  };
}
@connectToStores([UserStore], getState)
export default class UserPage {
  static propTypes = {
    // Injected by React Router:
    params: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired,

    // Injected by @connectToStores:
    user: PropTypes.object
  };

  constructor() {
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    requestData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (parseLogin(nextProps.params) !== parseLogin(this.props.params)) {
      requestData(nextProps);
    }
  }

  render() {
    /*     对象的解构赋值 */
    const { user, params } = this.props;
    const username = parseLogin(params);

    return (
      <DocumentTitle title={`${username}`}>
        <div>
          {user ?
            <User user={user} /> :
            <h1>还没有正确找到user</h1>
          }
        </div>
      </DocumentTitle>
    );
  }

  handleLoadMoreClick() {
    const login = parseLogin(this.props.params);
    RepoActionCreators.requestStarredReposPage(login);
  }
}
