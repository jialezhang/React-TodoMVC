import { register } from '../dispatcher/AppDispatcher';
import { createStore, mergeIntoBag, isInBag } from '../utils/StoreUtils';
import selectn from 'selectn';

const _query = {};

const GithubStore = createStore({
  contains(query) {
    return false;
  }

});

GithubStore.dispatchToken = register( action => {
  console.log('from githubStore');
  // console.log(action);
  const responseQuery = selectn('response.entities.query', action);
  if(responseQuery){
    mergeIntoBag(_query, responseQuery);
    GithubStore.emitChange();
  }
});

export default GithubStore;
