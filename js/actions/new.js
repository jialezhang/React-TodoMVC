'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _dispatcherAppDispatcher = require('../dispatcher/AppDispatcher');

var _constantsTodoConstants = require('../constants/TodoConstants');

var _constantsTodoConstants2 = _interopRequireDefault(_constantsTodoConstants);

var TodoActions = (function () {
  function TodoActions() {
    _classCallCheck(this, TodoActions);
  }

  _createClass(TodoActions, [{
    key: 'create',

    /**
     * @param  {string} text
     */
    value: function create(text) {
      (0, _dispatcherAppDispatcher.dispatch)({
        actionType: _constantsTodoConstants2['default'].TODO_CREATE,
        text: text
      });
    }
  }, {
    key: 'updateText',

    /**
     * @param  {string} id The ID of the ToDo item
     * @param  {string} text
     */
    value: function updateText(id, text) {
      (0, _dispatcherAppDispatcher.dispatch)({
        actionType: _constantsTodoConstants2['default'].TODO_UPDATE_TEXT,
        id: id,
        text: text
      });
    }
  }, {
    key: 'toggleComplete',

    /**
     * Toggle whether a single ToDo is complete
     * @param  {object} todo
     */
    value: function toggleComplete(todo) {
      var id = todo.id;
      var actionType = todo.complete ? _constantsTodoConstants2['default'].TODO_UNDO_COMPLETE : _constantsTodoConstants2['default'].TODO_COMPLETE;

      (0, _dispatcherAppDispatcher.dispatch)({
        actionType: actionType,
        id: id
      });
    }
  }, {
    key: 'toggleCompleteAll',

    /**
     * Mark all ToDos as complete
     */
    value: function toggleCompleteAll() {
      (0, _dispatcherAppDispatcher.dispatch)({
        actionType: _constantsTodoConstants2['default'].TODO_TOGGLE_COMPLETE_ALL
      });
    }
  }, {
    key: 'destroy',

    /**
     * @param  {string} id
     */
    value: function destroy(id) {
      (0, _dispatcherAppDispatcher.dispatch)({
        actionType: _constantsTodoConstants2['default'].TODO_DESTROY,
        id: id
      });
    }
  }, {
    key: 'destroyCompleted',

    /**
     * Delete all the completed ToDos
     */
    value: function destroyCompleted() {
      (0, _dispatcherAppDispatcher.dispatch)({
        actionType: _constantsTodoConstants2['default'].TODO_DESTROY_COMPLETED
      });
    }
  }]);

  return TodoActions;
})();

exports['default'] = TodoActions;
module.exports = exports['default'];

