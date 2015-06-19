import React, { PropTypes } from 'react';

const ENTER_KEY_CODE = 13;

export default class TodoTextInput {

  static propTypes =  {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    value: PropTypes.string,
  },
  getInitialState() {
    return {
      value: this.props.value || ''
    };
  };


  render() {

    return (
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true}
      />
    );
  };
  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  };

  /**
   * @param {object} event
   */
  _onChange(/*object*/ event) {
    this.setState({
      value: event.target.value
    });
  };

  /**
   * @param  {object} event
   */
  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  };
}
