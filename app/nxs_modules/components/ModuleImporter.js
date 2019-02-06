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
import fs from 'fs';

export default class ModuleImporter extends Component {
  constructor() {
    super();
    this.mountRoot;
  }

  render() {
    console.log(this.props.otherProps);
    return (
      <ErrorBoundry>
        <ShadowDOM>
          <div>
            <div
              ref={element => {
                this.mountRoot = element;
                // this.mountRoot.innerHtml = '';
                return (
                  element &&
                  this.props.importedModule(this.mountRoot, {
                    fs: fs,
                  })
                );
              }}
            />
            {this.props.importedModule(this.mountRoot, {
              fs: fs,
            })}
          </div>
        </ShadowDOM>
      </ErrorBoundry>
    );
  }
}
