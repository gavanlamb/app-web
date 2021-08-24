import { Theme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function IconButton(theme: Theme) {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {}
      }
    }
  };
}
