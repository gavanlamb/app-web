import { useLocation } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// components
import Page from '../../components/Page';
import VerifyLink from '../../components/authentication/verify/VerifyLink';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Verify() {
  const searchParameters = new URLSearchParams(useLocation().search);
  const code = searchParameters.has('code') ? searchParameters.get('code') : undefined;
  const userId = searchParameters.has('user-id') ? searchParameters.get('user-id') : undefined;

  return (
    <RootStyle title="Verify | Expensely">
      <LogoOnlyLayout />
      <Container>
        {code && userId ? (
          <VerifyLink userId={userId} code={code} />
        ) : (
          <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h3" paragraph>
              Oops, something has gone wrong!
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              We're not able to verify you account right now.
            </Typography>
          </Box>
        )}
      </Container>
    </RootStyle>
  );
}
