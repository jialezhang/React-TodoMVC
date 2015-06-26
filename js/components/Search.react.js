import React, { PropTypes } from  'react';
import SearchTextInput from './SearchTextInput.react';
import * as QueryAction from '../actions/GithubAction';

export default class Header {
  constructor(){
    this._onSave = this._onSave.bind(this);

  }
  render() {
    return (
      <section id="search-text">
        <SearchTextInput
          id="new-todo"
          placeholder="What needs to be find?"
          onSave={this._onSave}
          {...this.props}
        />
      </section>
    );
  }

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave(text) {
    console.log('from search react ');
    const query = QueryAction.requestQuery(text);
    console.log(query);
  }
};
