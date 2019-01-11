import React, { Component } from 'react';
import ShadowDOM from 'react-shadow';
import ErrorBoundry from 'components/ErrorBoundry';
import { Route } from 'react-router';

export default class ModuleImporter extends Component {
  builder() {
    let rootele = document.createElement('div');
    this.props.moduleEntry(rootele, {
      /* This is where the API will be passed in*/
    });
    return rootele;
  }

  render() {
    return (
      <ShadowDOM>
        <div>
          <Route
            exact
            path={this.props.location.pathname}
            render={() => {
              return (
                <ErrorBoundry>
                  <div
                    ref={element =>
                      element && element.appendChild(this.builder())
                    }
                  />
                </ErrorBoundry>
              );
            }}
          />
        </div>
      </ShadowDOM>
    );
  }
}
