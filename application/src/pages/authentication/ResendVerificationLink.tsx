import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
import { PATH_AUTH } from '../../routes/paths';
import Page from '../../components/Page';
import { SentIcon } from '../../assets';
import ResendVerificationLinkForm from '../../components/authentication/resend-verification-link/ResendVerificationLinkForm';

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

export default function ResendVerificationLink() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <RootStyle title="Resend Verification Link | Expensely">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                Need a new verification link?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Please enter the email address associated with your account and We will send you a
                new verification email.
              </Typography>

              <ResendVerificationLinkForm
                onSent={() => setSent(true)}
                onGetEmail={(value) => setEmail(value)}
              />

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
                Request sent successfully
              </Typography>
              <Typography>
                We have sent an email with instructions on verify your account to&nbsp;
                <strong>{email}</strong>
              </Typography>

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
