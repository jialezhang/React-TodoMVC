import React, { PropTypes, Component } from 'react';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';
import cx from 'react/lib/cx';


export default class TodoItem extends Component {

  static propTypes =  {
    todo: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this._onToggleComplete = this._onToggleComplete.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onDestroyClick = this._onDestroyClick.bind(this);

    this.state = {
      isEditing: false
    }

  }

  render() {

    const { todo } = this.props;

    let  input ;

    if (this.state.isEditing) {
      input =
      <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.text}
      />;
    }

    return (
      <li
        className={cx({
                   'completed': todo.complete,
                   'editing': this.state.isEditing
                   })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    )
  }
  _onToggleComplete() {
    TodoActions.toggleComplete(this.props.todo);
  }

  _onDoubleClick() {
    this.setState({isEditing: true});
  }

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave(text) {
    TodoActions.updateText(this.props.todo.id, text);
    this.setState({isEditing: false});
  };

  _onDestroyClick() {
    TodoActions.destroy(this.props.todo.id);
  }
}
