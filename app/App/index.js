// External
import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
// import IntlWrapper from './IntlWrapper';
import styled from '@emotion/styled';

// Internal
import UIController from 'components/UIController';
import GlobalStyles from './GlobalStyles';
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
// import Exchange from './Exchange';
import AppBackground from './AppBackground';
import ThemeController from './ThemeController';

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

/**
 * Main App Page
 *
 * @export
 * @class App
 * @extends {Component}
 */
export default class App extends Component {
  /**
   * React Render
   *
   * @returns
   * @memberof App
   */
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ThemeController>
          <ConnectedRouter history={history}>
            <UIController>
              <div>
                <GlobalStyles />
                <AppBackground />
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
                      {/* <Route path="/Exchange" component={Exchange} /> */}
                      {/* <Route exact path="/List" component={TrustList} /> */}
                      <Route exact path="/About" component={About} />
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
