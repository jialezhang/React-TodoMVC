import { register } from '../dispatcher/AppDispatcher';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
import selectn from 'selectn';

const _users = {};

const UserStore = createStore({
  contains(username, fields) {
    return isInBag(_users, username, fields);
  },

  get(username) {
    return _users[username];
  }
});

UserStore.dispatchToken = register(action => {
  const responseUsers = selectn('response.entities.user', action);
  if (responseUsers) {
    mergeIntoBag(_users, responseUsers);
    UserStore.emitChange();
  }
});

export default UserStore;
