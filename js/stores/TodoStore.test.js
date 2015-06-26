import { register } from '../dispatcher/AppDispatcher';
import  TodoConstants from '../constants/TodoConstants';
import { createStore } from '../utils/StoreUtils';

const _todos = {}

const TodoStore = createStore({
  create(text) {
    // Hand waving here -- not showing how this interacts with XHR or persistent
    // server-side storage.
    // Using the current timestamp + random number in place of a real id.
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
      id: id,
      complete: false,
      text: text
    };
  },

  /**
   * Update a TODO item.
   * @param  {string} id
   * @param {object} updates An object literal containing only the data to be
   *     updated.
   */
  update(id, updates) {
    _todos[id] = Object.assign({}, _todos[id], updates);
  },

  /**
   * Update all of the TODO items with the same object.
   *     the data to be updated.  Used to mark all TODOs as completed.
   * @param  {object} updates An object literal containing only the data to be
   *     updated.

   */
  updateAll(updates) {
    for (let id in _todos) {
      update(id, updates);
    }
  },

  /**
   * Delete a TODO item.
   * @param  {string} id
   */
  destroy(id) {
    delete _todos[id];
  },

  /**
   * Delete all the completed TODO items.
   */
  destroyCompleted() {
    for (let id in _todos) {
      if (_todos[id].complete) {
        destroy(id);
      }
    }
  },
  areAllComplete: function() {
    for (let id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos;
  },

});

TodoStore.dispatchToken = register( action =>  {

  let text;

  switch(action.type.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        TodoStore.create(text);
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        TodoStore.updateAll({complete: false});
      } else {
        TodoStore.updateAll({complete: true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      TodoStore.update(action.id, {complete: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      TodoStore.update(action.id, {complete: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        TodoStore.update(action.id, {text: text});
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      TodoStore.destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      TodoStore.destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
      // no op
  }
});

export default TodoStore;
