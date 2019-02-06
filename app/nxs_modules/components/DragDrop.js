import React, { Component } from 'react';
import FileDrop from 'react-file-drop';
import styled from '@emotion/styled';
import { jsx, css } from '@emotion/core';
const DropField = styled.div(({ theme }) => ({
  padding: '1em',
  border: `2px dashed ${theme.mixer(0.25)} `,
  borderRadius: '5px',
  width: 300,
  textAlign: 'center',
}));

const DragFeedback = styled.div({
  '.file-drop > .file-drop-target.file-drop-dragging-over-target': {
    background: 'White',
    width: 300,
    boxShadow: '0 10px 10px black',
  },
});

class DragDrop extends Component {
  handleDrop = (files, event) => {
    console.log(files, event);
  };

  render() {
    return (
      <DragFeedback>
        <FileDrop onDrop={this.handleDrop}>
          <DropField>Drop Your Shit Here</DropField>
        </FileDrop>
      </DragFeedback>
    );
  }
}

export default DragDrop;
