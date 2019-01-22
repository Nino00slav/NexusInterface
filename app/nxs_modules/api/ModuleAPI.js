import React from 'react';
import ReactDOM from 'react-dom';
import electron from 'electron';
// import Emotion from 'emotion-theming';

import UIController from 'components/UIController';

export default {
  libraries: {
    React: React,
    ReactDom: ReactDOM,
    electron: electron,
    // Emotion: Emotion,
  },
  components: {
    // Panel, Modal, Button, TextField, Switch, Tooltip,...
  },
  UI: UIController,
  // {
  //   // openModal, showNotification,...
  // }
};
