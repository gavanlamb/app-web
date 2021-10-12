import closeFill from '@iconify/icons-eva/close-fill';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import LoadingScreen from '../../LoadingScreen';
import useAuth from '../../../hooks/useAuth';
import { MIconButton } from '../../@material-extend';
import { VerifyAttributeLinkProps } from './types';

export default function VerifyAttributeLink(props: VerifyAttributeLinkProps) {
  const { confirmAttribute } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [verificationError, setVerificationError] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        await confirmAttribute(props.userId, props.type, props.code);
        enqueueSnackbar('Your email has been verified', {
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
  }, [confirmAttribute, setVerificationError, enqueueSnackbar, closeSnackbar, props]);

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
              Once your email is verified we will redirect you.
            </Typography>
          </Box>
        </>
      )}
    </>
  );
}
