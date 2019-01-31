import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ShadowDOM from 'react-shadow';
import ErrorBoundry from 'components/ErrorBoundry';
import { Route } from 'react-router';
import { readFileSync, existsSync } from 'fs';
import Parser from 'html-react-parser';
import Script from 'react-load-script';
import ModuleEncapsulater from 'components/ModuleEncapsulater';
import Loadable from 'react-loadable';

export default class ModuleImporter extends Component {
  componentDidMount() {
    // global
    //   .require(this.props.moduleEntry)
    //   .default
    this.props.importedModule(ModuleEncapsulater.shadowRoot, {
      ReactDOM: ReactDOM,
    });
  }

  render() {
    console.log(this.props.otherProps);
    return (
      <ErrorBoundry>
        {/* <ShadowDOM> */}
        {/* <div>
            <div
              ref={element => {
                console.log(element);

                return (
                  element &&
                  global.require(this.props.moduleEntry).default(element, {
                    ReactDOM: ReactDOM,
                  })
                );
              }}
            />
          </div> */}
        <div
          ref={element => {
            console.log(element);

            return element && element.append(ModuleEncapsulater);
          }}
        />
        {/* </ShadowDOM> */}
        {console.log(ModuleEncapsulater.shadowRoot)}
      </ErrorBoundry>
    );
  }
}
