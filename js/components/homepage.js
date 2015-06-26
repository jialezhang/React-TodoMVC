import React , { Component }  from 'react';
import Footer from './Footer.react';
import Header from './Header.react';
import MainSection from './MainSection.react';
import TodoStore from '../stores/TodoStore.test';

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
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  }
  _onChange() {
    this.setState(getTodoState());
  }

}
