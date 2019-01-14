// External
import React from 'react';
import styled from '@emotion/styled';

// Internal
import Tooltip from 'components/Tooltip';
import userIcon from 'images/user.sprite.svg';
import { timing } from 'styles';
import { color } from 'utils';
import StatusIcon from './StatusIcon';

const MyAddressesIcon = styled(StatusIcon)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.primary,
  transitionProperty: 'color, filter',
  transitionDuration: timing.normal,

  '&:hover': {
    color: color.lighten(theme.primary, 0.2),
    filter: `drop-shadow(0 0 3px ${theme.primary})`,
  },
}));

const MyAddresses = () => (
  <Tooltip.Trigger
    align="end"
    tooltip="My Addresses"
    style={{ transform: 'translateX(12px)' }}
  >
    <MyAddressesIcon icon={userIcon} />
  </Tooltip.Trigger>
);

export default MyAddresses;
