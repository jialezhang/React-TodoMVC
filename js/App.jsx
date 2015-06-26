import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { RouteHandler } from 'react-router';

export default class App {
  static propTypes = {
    params: PropTypes.object.isRequired,
    query: PropTypes.object.isRequired
  };

  render() {
    return (
      <DocumentTitle title='学习react-flux'>
        <div className='App'>
          <hr />
          <RouteHandler {...this.props} />
        </div>
      </DocumentTitle>
    );
  }
}
