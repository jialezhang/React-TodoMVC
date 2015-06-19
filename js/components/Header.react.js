import React, { PropTypes } from  'react'
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';

export default class Header {
  constructor(){
    this._onSave = this._onSave.bind(this);

  }
  render() {
    return (
      <header id="header">
        <h1>todos</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave}
        />
      </header>
    );
  }

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave(text) {
    if (text.trim()){
      TodoActions.create(text);
    }
  }
}
