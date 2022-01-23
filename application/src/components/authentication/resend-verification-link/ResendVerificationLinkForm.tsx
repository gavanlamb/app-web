import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { Alert, Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { ResendVerificationProps } from './types';
import { InitialValues } from '../forgot-password/types';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import useAuth from '../../../hooks/useAuth';

export default function ResendVerificationLinkForm(props: ResendVerificationProps) {
  const { resendVerificationLink } = useAuth();
  const isMountedRef = useIsMountedRef();

  const ResendVerificationLinkSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: ''
    },
    validationSchema: ResendVerificationLinkSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await resendVerificationLink(values.email);
        if (isMountedRef.current) {
          props.onSent();
          props.onGetEmail(formik.values.email);
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
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('email')}
            type="email"
            label="Email address"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Resend verification link
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
