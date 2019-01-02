// External
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import styled from '@emotion/styled';

// Internal
import Modal from 'components/Modal';
import styles from './style.css';
import * as TYPE from 'actions/actiontypes';
import ChangePassword from './ChangePassword';
import ImportPrivKey from './ImportPrivKey';
import ViewPrivKeyForAddress from './ViewPrivKeyForAddress';

const SecuritySettings = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
});

const mapStateToProps = state => {
  return {
    ...state.common,
    ...state.login,
  };
};

const mapDispatchToProps = dispatch => ({
  wipe: () => dispatch({ type: TYPE.WIPE_LOGIN_INFO }),
  busy: () => dispatch({ type: TYPE.TOGGLE_BUSY_FLAG }),
  OpenModal: type => dispatch({ type: TYPE.SHOW_MODAL, payload: type }),
  getInfo: payload => dispatch({ type: TYPE.GET_INFO_DUMP, payload: payload }),
});

class Security extends Component {
  componentWillUnmount() {
    this.props.wipe();
  }
  render() {
    if (!this.props.loggedIn) {
      return (
        <Redirect to={this.props.match.path.replace('/Content', '/Security')} />
      );
    }
    return (
      <div>
        <SecuritySettings>
          <ChangePassword {...this.props} />
          <ImportPrivKey {...this.props} />
        </SecuritySettings>
        <ViewPrivKeyForAddress {...this.props} />
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Security);
