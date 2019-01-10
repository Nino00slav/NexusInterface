// External
import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
// import IntlWrapper from './IntlWrapper';
import styled from '@emotion/styled';
//needed for module loading
import { join } from 'path';
import configuration from 'api/configuration';
import { readdirSync, Stats, lstatSync, readFileSync } from 'fs';
import ShadowDOM from 'react-shadow';
import ErrorBoundry from 'components/ErrorBoundry';

// Internal
import UIController from 'components/UIController';
import GlobalStyles from './GlobalStyles';
import Loader from './Loader';
import Overview from './Overview';
import Header from './Header';
import Navigation from './Navigation';
import SendPage from './SendPage';
import Transactions from './Transactions';
import Market from './Market';
import AddressBook from './AddressBook';
import BlockExplorer from './BlockExplorer';
import Settings from './Settings';
import Terminal from './Terminal';
import StyleGuide from './StyleGuide';
import TrustList from './TrustList';
import About from './About';
import Exchange from './Exchange';
import AppBackground from './AppBackground';
import ThemeController from './ThemeController';
import ModMarket from './ModMarket';

const AppWrapper = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'grid',
  height: '100%',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '74px auto 75px',
  gridTemplateAreas: '"header" "content" "navigation"',
});

const Main = styled.main({
  gridArea: 'content',
  overflow: 'hidden',
  padding: '30px 10%',
  display: 'flex',
  alignItems: 'stretch',
});

const AppLoader = styled.div({
  position: 'fixed',
  top: '50%',
  left: '50%',
  width: 300,
  height: 300,
  transform: 'translate(-50%,-50%)',
});

export default class App extends Component {
  ModulePreloadChecker() {
    const moduleInstallDir = join(
      configuration.GetAppDataDirectory(),
      'Installed_Modules'
    );
    const rawInstalled = readdirSync(moduleInstallDir);
    let elegeableInstalled = [];
    if (rawInstalled.length > 0) {
      elegeableInstalled = rawInstalled
        .filter(e => {
          if (lstatSync(join(moduleInstallDir, e)).isDirectory()) {
            let currentMod = readdirSync(join(moduleInstallDir, e));
            console.log(
              e,
              currentMod.includes('index.js'),
              currentMod.includes('package.json'),
              currentMod.findIndex(e => {
                if (e.includes('icon')) return e;
              })
            );
            if (
              currentMod.includes('index.js') &&
              currentMod.includes('package.json') &&
              currentMod.findIndex(e => {
                if (e.includes('icon')) return e;
              }) >= 0
              // this is where we can make validations happen for modules
            ) {
              console.log('Valid Module');
              return e;
            } else {
              console.log('Invalid Module, Skipping...');
            }
          } else {
            console.log('Not a Module, Skipping...');
          }
        })
        .map(mod => {
          // Pulling out relevent information
          let packageDOTjson = JSON.parse(
            readFileSync(join(moduleInstallDir, mod, 'package.json'))
          );
          let moduleFiles = readdirSync(join(moduleInstallDir, mod));

          return {
            routePath: `/${mod}-${packageDOTjson.productName}-${
              packageDOTjson.version
            }`.replace(' ', '-'),
            name: packageDOTjson.productName,
            version: packageDOTjson.version,
            buildDate: packageDOTjson.buildDate,
            entryFilePath: join(moduleInstallDir, mod, 'index.js'),
            iconPath: join(
              moduleInstallDir,
              mod,
              moduleFiles[
                moduleFiles.findIndex(e => {
                  if (e.includes('icon')) return e;
                })
              ]
            ),
          };
        });
      console.log(elegeableInstalled);
    } else {
      console.log('Install Directory is empty.');
    }
    this.props.store.dispatch({
      type: 'ENABLED_MODULES',
      payload: elegeableInstalled,
    });
    return elegeableInstalled;
  }

  render() {
    const { store, history } = this.props;
    const InstalledModules = this.ModulePreloadChecker();
    console.log(store);
    return (
      <Provider store={store}>
        <ThemeController>
          <ConnectedRouter history={history}>
            <UIController>
              <div>
                <GlobalStyles />
                <AppBackground />
                <AppLoader>
                  <Loader />
                </AppLoader>
                <AppWrapper>
                  <Header />
                  <Main>
                    <Switch>
                      <Route exact path="/" component={Overview} />
                      <Route exact path="/SendPage" component={SendPage} />
                      <Route
                        exact
                        path="/Transactions"
                        component={Transactions}
                      />
                      <Route exact path="/Market" component={Market} />
                      <Route
                        exact
                        path="/AddressBook"
                        component={AddressBook}
                      />
                      <Route
                        exact
                        path="/BlockExplorer"
                        component={BlockExplorer}
                      />
                      <Route path="/Settings" component={Settings} />
                      <Route path="/Terminal" component={Terminal} />
                      <Route exact path="/StyleGuide" component={StyleGuide} />
                      <Route path="/Exchange" component={Exchange} />
                      <Route exact path="/List" component={TrustList} />
                      <Route exact path="/About" component={About} />
                      {/* component={ModMarket} */}
                      <Route
                        exact
                        path="/ModMarket"
                        render={props => {
                          return (
                            <ShadowDOM {...props}>
                              <div>Hello World</div>
                            </ShadowDOM>
                          );
                        }}
                      />
                      {InstalledModules.map(e => {
                        console.log(e);

                        console.log(
                          '--------------------------------',
                          e.entryFilePath,
                          global.require(e.entryFilePath)
                        );
                        let ThisModule = global.require(e.entryFilePath)
                          .default;
                        return (
                          <ErrorBoundry>
                            <ShadowDOM>
                              <div>
                                <Route
                                  key={e.routePath}
                                  exact
                                  path={e.routePath}
                                  render={props => {
                                    return <ThisModule {...props} />;
                                  }}
                                />
                              </div>
                            </ShadowDOM>
                          </ErrorBoundry>
                        );
                      })}
                    </Switch>
                  </Main>
                  <Navigation />
                </AppWrapper>
              </div>
            </UIController>
          </ConnectedRouter>
        </ThemeController>
      </Provider>
    );
  }
}
