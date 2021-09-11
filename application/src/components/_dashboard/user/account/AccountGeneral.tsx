import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, TextField, Alert } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// @types
import { User } from '../../../../@types/account';
import MyAvatar from '../../../MyAvatar';

// ----------------------------------------------------------------------

interface InitialState extends Omit<User, 'id' | 'displayName' | 'phoneNumber' | 'password'> {
  afterSubmit?: string;
}

export default function AccountGeneral() {
  const isMountedRef = useIsMountedRef();
  const { user, updateProfile } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    givenName: Yup.string().required('First name is required'),
    familyName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Name is required')
  });

  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: {
      givenName: user?.givenName,
      familyName: user?.familyName,
      email: user?.email
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile?.(values.email, values.givenName, values.familyName);
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }} style={{ justifyContent: 'center', display: 'flex' }}>
              <MyAvatar style={{ fontSize: 'xxx-large', height: '130px', width: '130px' }} />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...getFieldProps('givenName')}
                    error={Boolean(touched.givenName && errors.givenName)}
                    helperText={touched.givenName && errors.givenName}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...getFieldProps('familyName')}
                    error={Boolean(touched.familyName && errors.familyName)}
                    helperText={touched.familyName && errors.familyName}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
