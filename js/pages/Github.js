import React, { Component, PropTypes, findDOMNode } from 'react';
import Search from '../components/Search.react';
import GithubStore from '../stores/GithubStore';
import shouldPureComponentUpdate from 'react-pure-render/function';

const DEFAULT_LOGIN = 'gaearon';
const GITHUB_REPO = 'https://github.com/gaearon/flux-react-router-example';

function parseFullName(params) {
  if (!params.login) {
    return DEFAULT_LOGIN;
  }

  return params.login + (params.name ? '/' + params.name : '');
}

export default class Github extends Component {

  static propTypes = {
    params: PropTypes.shape({
      login: PropTypes.string,
      name: PropTypes.string
    })
  };

  static contextTypes = {
    router: PropTypes.func.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);

    // State that depends on props is often an anti-pattern, but in our case
    // that's what we need to we can update the input both in response to route
    // change and in response to user typing.

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loginOrRepo: parseFullName(nextProps.params)
    });
  }

  render() {
    return (
      <div className='试试咯'>
        <p>暂时就不弄这个跳转了:</p>
      </div>
    );
  }
}
