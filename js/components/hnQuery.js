import React , { Component, PropTypes }  from 'react'
import Header from './Header.react';
import GithubStore from '../stores/GithubStore';

function getGithubState() {
  GithubStore.reset();

  return {
    GithubStore: GithubStore.data()
  }
}

export default class Gituhub extends Component {
  static propTypes =  {
    GithubStore: PropTypes.object
  }
  constructor(props) {
    super(props);

    this.state = getGithubState();
  }
  /**
   * 当中心的数据发生变化的时候，改变顶层的app的state
   */
  componentDidMount() {
    var _this = this;
    GithubStore.onStoreChange(function(nextState, path) {
      if (_this.isMounted()) {
        _this.replaceState(nextState);
      }
    });
  }

  render() {

    return (
      <div>
        <Header/>
        <div className="container content">
          <Posts data={GithubStore.get('posts')}/>
        </div>
      </div>
    );
  }
  _onChange() {
    this.setState(getTodoState());
  }

}
