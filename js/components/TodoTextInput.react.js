import React, { PropTypes, Component } from 'react';

const  ENTER_KEY_CODE = 13;

export default class TodoTextInput extends Component  {

  static propTypes =  {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    value: PropTypes.string,
  }
  constructor(props) {
    super(props);

    this._save = this._save.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);

    this.state = {
      value: this.props.value || ''
    }
  }

  render() {

    const { className, id, placeholder } = this.props;

    return (
      <input
        className={className}
        id={id}
        placeholder={placeholder}
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true}
      />
    );
  }
  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  }

  /**
   * @param {object} event
   */
  _onChange(/*object*/ event) {
    this.setState({
      value: event.target.value
    });
  }

  /**
   * @param  {object} event
   */
  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }
}
