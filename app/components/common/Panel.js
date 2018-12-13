// External Dependencies
import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { darken, fade } from 'utils/colors';

// Internal Global Dependencies
import Icon from 'components/common/Icon';
import { colors } from 'styles';

const intro = keyframes`
  from { 
    transform: scale(0.92);
    opacity: 0.66 
  }
  to { 
    transform: scale(1);
    opacity: 1
  }
`;

const borderRadius = 4;

const PanelWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  color: colors.light,
  width: '100%',
  animation: `${intro} .2s ease-out`,
});

const PanelHeader = styled.div({
  backgroundColor: colors.dark,
  borderTopLeftRadius: borderRadius,
  borderTopRightRadius: borderRadius,
  flexShrink: 0,
  padding: '10px 30px',
  fontSize: 28,
  fontWeight: 200,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const TitleIcon = styled(Icon)({
  width: 28,
  height: 28,
  marginRight: '.3em',
});

const PanelBody = styled.div(
  {
    backgroundColor: fade(darken(colors.dark, 0.2), 0.2),
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    flexGrow: 1,
    padding: '10px 20px',
    position: 'relative',
  },
  ({ scrollable }) => ({
    overflow: scrollable ? 'auto' : 'hidden',
  })
);

const PanelBodyOverlay = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  padding: '10px 20px',
});

const Panel = ({ icon, title, controls, children, bodyScrollable = true }) => (
  <PanelWrapper>
    <PanelHeader>
      <div>
        {!!icon && <TitleIcon icon={icon} width={28} height={28} />}
        <span className="v-align">{title}</span>
      </div>
      {controls}
    </PanelHeader>

    <PanelBody scrollable={bodyScrollable}>
      {bodyScrollable ? (
        children
      ) : (
        <PanelBodyOverlay>{children}</PanelBodyOverlay>
      )}
    </PanelBody>
  </PanelWrapper>
);

export default Panel;
