import React, { Component } from 'react';
import ShadowDOM from 'react-shadow';
import ErrorBoundry from 'components/ErrorBoundry';
import { Route } from 'react-router';

export default class ModuleImporter extends Component {
  constructor() {
    super();
    this.module = <div />;
  }

  componentDidMount() {
    let rootele = document.createElement('div');
    this.props.moduleEntry(rootele, {
      /* This is where the API will be passed in*/
    });

    this.module = (
      <div ref={element => element && element.appendChild(rootele)} />
    );
  }

  render() {
    return (
      <ShadowDOM>
        <div>
          <Route
            exact
            path={this.props.location.pathname}
            component={() => <ErrorBoundry>{this.module}</ErrorBoundry>}
          />
        </div>
      </ShadowDOM>
    );
  }
}
