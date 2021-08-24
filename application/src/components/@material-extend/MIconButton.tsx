import { forwardRef } from 'react';
// material
import { IconButton, IconButtonProps } from '@material-ui/core';
//
import { ButtonAnimate } from '../animate';

// ----------------------------------------------------------------------

const MIconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, ...other }, ref) => (
    <ButtonAnimate>
      <IconButton ref={ref} {...other}>
        {children}
      </IconButton>
    </ButtonAnimate>
  )
);

export default MIconButton;
