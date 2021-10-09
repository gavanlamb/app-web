import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { ForgotPasswordForm } from '../../components/authentication/forgot-password';
//
import { SentIcon } from '../../assets';
import { ResetPasswordForm } from '../../components/authentication/reset-password';

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export default function ResetPassword() {
  const searchParameters = new URLSearchParams(useLocation().search);
  const code = searchParameters.has('code') ? searchParameters.get('code') : undefined;
  const userId = searchParameters.has('user-id') ? searchParameters.get('user-id') : undefined;

  return (
    <RootStyle title="Reset Password | Expensely">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {code && userId ? (
            <>
              <Typography variant="h3" paragraph>
                Reset your password
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Please enter your new password below
              </Typography>

              <ResetPasswordForm code={code} userId={userId} />

              <Button
                fullWidth
                size="large"
                component={RouterLink}
                to={PATH_AUTH.login}
                sx={{ mt: 1 }}
              >
                Back
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Something is wrong
              </Typography>
              <Typography>That link doesn't look valid</Typography>

              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_AUTH.login}
                sx={{ mt: 5 }}
              >
                Back
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
