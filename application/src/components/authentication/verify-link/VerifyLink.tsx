import closeFill from '@iconify/icons-eva/close-fill';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import LoadingScreen from '../../LoadingScreen';
import useAuth from '../../../hooks/useAuth';
import { MIconButton } from '../../@material-extend';
import { Props } from './types';

export default function VerifyLink(props: Props) {
  const { confirmRegistration } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [verificationError, setVerificationError] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        await confirmRegistration(props.userId, props.code);
        enqueueSnackbar('Your account has been verified', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      } catch (error) {
        setVerificationError(error.message);
      }
    };

    verify();
  }, [confirmRegistration, setVerificationError, props]);

  return (
    <>
      {verificationError ? (
        <>
          <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h3" paragraph>
              There seems to be a problem
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>{verificationError}</Typography>
          </Box>
        </>
      ) : (
        <>
          <LoadingScreen />
          <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h3" paragraph>
              Hold tight while we verify your email.
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Once your email is verified we will redirect to the login page.
            </Typography>
          </Box>
        </>
      )}
    </>
  );
}
