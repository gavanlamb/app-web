import { Theme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function Link(theme: Theme) {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover'
      },

      styleOverrides: {
        root: {}
      }
    }
  };
}
