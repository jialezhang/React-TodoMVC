'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dispatcherAppDispatcher = require('../dispatcher/AppDispatcher');

var _events = require('events');

var _constantsTodoConstants = require('../constants/TodoConstants');

var _constantsTodoConstants2 = _interopRequireDefault(_constantsTodoConstants);

var CHANGE_EVENT = 'change';

var _todos = {};

function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _todos[id] = Object.assign({}, _todos[id], updates);
}

/**
 * Update all of the TODO items with the same object.
 *     the data to be updated.  Used to mark all TODOs as completed.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.

 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var TodoStore = Object.assign({}, _events.EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function areAllComplete() {
    for (var id in _todos) {
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
  getAll: function getAll() {
    return _todos;
  },

  emitChange: function emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
(0, _dispatcherAppDispatcher.register)(function (action) {
  var text = undefined;

  switch (action.actionType) {
    case _constantsTodoConstants2['default'].TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
        TodoStore.emitChange();
      }
      break;

    case _constantsTodoConstants2['default'].TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({ complete: false });
      } else {
        updateAll({ complete: true });
      }
      TodoStore.emitChange();
      break;

    case _constantsTodoConstants2['default'].TODO_UNDO_COMPLETE:
      update(action.id, { complete: false });
      TodoStore.emitChange();
      break;

    case _constantsTodoConstants2['default'].TODO_COMPLETE:
      update(action.id, { complete: true });
      TodoStore.emitChange();
      break;

    case _constantsTodoConstants2['default'].TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, { text: text });
        TodoStore.emitChange();
      }
      break;

    case _constantsTodoConstants2['default'].TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case _constantsTodoConstants2['default'].TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
    // no op
  }
});

exports['default'] = TodoStore;
module.exports = exports['default'];

