import React, { PropTypes, Component, findDOMNode } from 'react';
import { Navigation } from 'react-router';

const  ENTER_KEY_CODE = 13;
const DEFAULT_LOGIN = 'jialezhang';

function parseUserName(params) {
  if (!params.UserName) {
    return DEFAULT_LOGIN;
  }

  return params.UserName;
}


export default class TodoTextInput extends Component  {

  static propTypes =  {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    UserName: PropTypes.string,
  }
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._getInputValue = this._getInputValue.bind(this);
    this._handleGoClick = this._handleGoClick.bind(this);

    this.state = {
      UserName: parseUserName(props.params)
    }
  }

  render() {

    const { className, id, placeholder } = this.props;

    return (
      <input
        className={className}
        id={id}
        ref='UserName'
        placeholder={placeholder}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.UserName}
        autoFocus={true}
      />
    );
  }

  _onChange(/*object*/ event) {
    this.setState({
      UserName: this._getInputValue()
    });
  }

  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._handleGoClick();
    }
  }
  _handleGoClick() {
    console.log(this._getInputValue());
    /* this.context.router.transitionTo(`/{$this._getInputValue()}`); */
  }
  _getInputValue() {
    return findDOMNode(this.refs.UserName).value;
  }
}
