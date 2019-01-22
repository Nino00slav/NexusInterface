import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ShadowDOM from 'react-shadow';
import ErrorBoundry from 'components/ErrorBoundry';
import { Route } from 'react-router';

export default class ModuleImporter extends Component {
  render() {
    console.log(this.props);
    return (
      // <Route
      //   exact
      //   path={this.props.location.pathname}
      //   component={() => (
      <ErrorBoundry>
        <ShadowDOM>
          <div>
            <div
              ref={element => {
                console.log(this.props.moduleEntry);
                return (
                  element &&
                  global
                    .require(this.props.moduleEntry)
                    .default(element, ReactDOM)
                );
              }}
            />
          </div>
        </ShadowDOM>
      </ErrorBoundry>
      // )}
      // />
    );
  }
}
