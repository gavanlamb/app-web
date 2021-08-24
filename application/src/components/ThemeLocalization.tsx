import { ReactNode } from 'react';
// material
import { ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
// hooks
import useLocales from '../hooks/useLocales';

// ----------------------------------------------------------------------

type ThemeLocalizationProps = {
  children: ReactNode;
};

export default function ThemeLocalization({ children }: ThemeLocalizationProps) {
  const defaultTheme = useTheme();
  const { currentLang } = useLocales();

  const theme = createTheme(defaultTheme, currentLang.systemValue);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
