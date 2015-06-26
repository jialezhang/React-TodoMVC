import React , { Component }  from 'react';
import Footer from '../components/Footer.react';
import Header from '../components/Header.react';
import MainSection from '../components/MainSection.react';
import TodoStore from '../stores/TodoStore.test';
import { RouteHandler } from 'react-router';

import  '../../todomvc-common/base.css';

function getTodoState() {

  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

export default class TodoApp extends Component {

  constructor() {

    super();

    this._onChange = this._onChange.bind(this);
    this.state = getTodoState();
  }

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  render() {
    return (
      <div className="todoApp">
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
        <RouteHandler { ...this.props } />
      </div>
    );
  }
  _onChange() {
    this.setState(getTodoState());
  }

}
