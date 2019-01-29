import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ShadowDOM from 'react-shadow';
import ErrorBoundry from 'components/ErrorBoundry';
import { Route } from 'react-router';
import { readFileSync, existsSync } from 'fs';
import Parser from 'html-react-parser';
import Script from 'react-load-script';
export default class ModuleImporter extends Component {
  // htmlLoader() {
  //   let HTML = readFileSync(
  //     this.props.moduleEntry.replace('js', 'html')
  //   ).toString();
  //   let html = '';
  //   try {
  //     html = Parser(HTML, {
  //       replace: function(domNode) {
  //         if (domNode.name === 'html' || 'head' || 'body') {
  //           domNode.name = 'div';
  //           return domNode;
  //         }
  //         if (domNode.name === 'script') {
  //           return null;
  //         }
  //       },
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   return html;
  // }
  render() {
    console.log(this.props);
    let HTML = readFileSync(
      this.props.moduleEntry.replace('js', 'html')
    ).toString();

    console.log(HTML);
    return (
      // <Route
      //   exact
      //   path={this.props.location.pathname}
      //   component={() => (

      <ErrorBoundry>
        <ShadowDOM>
          <div id="entrypoint">
            {/* <div
              ref={element => {
                console.log(this.props.moduleEntry);
                // 
                return (
                  element &&
                  global
                    .require(this.props.moduleEntry)
                    .default(element, { ReactDOM: ReactDOM })
                );
              }}
            /> */}
            {console.log(this.props.moduleEntry.replace('js', 'html'))}
            {existsSync(this.props.moduleEntry.replace('js', 'html')) &&
              Parser(
                HTML
                //   {
                //   replace: function(domNode) {
                //     console.log(domNode);

                //     if (domNode.name === 'script') {
                //       return (
                //         <div />
                //         // <Script
                //         //   url="/home/dillon/.config/Nexus_Wallet_BETA_v0.8.5/Installed_Modules/TestModule2/index.js"
                //         //   onLoad={console.log('Hello')}
                //         // />
                //       );
                //     }
                //   },
                // }
              )}
          </div>
        </ShadowDOM>
      </ErrorBoundry>
    );
  }
}
