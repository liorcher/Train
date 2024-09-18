import React from 'react';
import { IconButton, Tooltip } from '@mui/material';

interface Props {
  title: string;
  Icon: React.ElementType;
  onClick: VoidFunction;
  isSelected: boolean;
}

export const FormStepIcon: React.FC<Props> = ({ title, Icon, onClick, isSelected }) => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick}>
        <Icon sx={{ color: isSelected ? 'info.main' : 'primary.light' }} />
      </IconButton>
    </Tooltip>
  );
};
