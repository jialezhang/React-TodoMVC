import React , { Component, PropTypes }  from 'react'
import Search from './Search.react';
import GithubStore from '../stores/GithubStore';

function getGithubState() {
  const GithubStore = {};
  return GithubStore;

}
function parseQuery(params) {
  return params.query;
}

export default class Gituhub extends Component {
  static propTypes =  {
    params: PropTypes.shape({
      query: PropTypes.string.isRequired
    }).isRequired
  }
  constructor(props) {
    super(props);

    this.state = getGithubState();
  }
  /**
   * 当中心的数据发生变化的时候，改变顶层的app的state
   */
  /* componentDidMount() {
     var _this = this;
     GithubStore.onStoreChange(function(nextState, path) {
     if (_this.isMounted()) {
     _this.replaceState(nextState);
     }
     });
     } */

  render() {
    const { params } = this.props;
    const query = parseQuery(params);
    return (
      <div title='pages/github.js'>
        <Search />
        <div className="container content">
        </div>
      </div>
    );
  }
  _onChange() {
    this.setState(getGithubState());
  }

}
