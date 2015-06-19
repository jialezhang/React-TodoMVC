import React, { PropTypes } from 'react'
import TodoActions from '../actions/TodoActions';
import TodoItem from './TodoItem.react';

export default class MainSection {

  constructor(){
    this._onToggleCompleteAll = this._onToggleCompleteAll.bind(this);
  }

  static propTypes =  {
    allTodos: PropTypes.object.isRequired,
    areAllComplete: PropTypes.bool.isRequired,

  };

  render() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(this.props.allTodos).length < 1) {
      return null;
    }

    const { allTodos } = this.props;
    let todos = [];

    for (let key in allTodos) {
      todos.push(<TodoItem key={key} todo={allTodos[key]} />);
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  };

  _onToggleCompleteAll() {
    TodoActions.toggleCompleteAll();
  }
}
