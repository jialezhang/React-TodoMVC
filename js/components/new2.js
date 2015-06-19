/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

'use strict';

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

var TodoApp = React.createClass({
  displayName: 'TodoApp',

  getInitialState: function getInitialState() {
    return getTodoState();
  },

  componentDidMount: function componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(Header, null),
      React.createElement(MainSection, {
        allTodos: this.state.allTodos,
        areAllComplete: this.state.areAllComplete
      }),
      React.createElement(Footer, { allTodos: this.state.allTodos })
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function _onChange() {
    this.setState(getTodoState());
  }

});

module.exports = TodoApp;

