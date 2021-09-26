import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// UI
import closeFill from '@iconify/icons-eva/close-fill';
import { TextField, FormHelperText, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Icon } from '@iconify/react';
import { MIconButton } from '../../@material-extend';
// utils
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import { InitialValues, Props } from "./types";

export default function VerifyCodeForm(props: Props) {
  const navigate = useNavigate();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isLinkValidation = props.sub ? true : false

  const VerifyCodeSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    verificationCode: Yup.number().typeError('Value must be a number').required('Code is required')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: '',
      verificationCode: ''
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        // verify code call
        // login
        enqueueSnackbar('Successfully verified your account', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.message });
        }
      }
    }
  });

  const { errors, isValid, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            {...getFieldProps('email')}
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            {...getFieldProps('verificationCode')}
            type="number"
            error={Boolean(touched.verificationCode && errors.verificationCode)}
            helperText={touched.verificationCode && errors.verificationCode}
            inputProps={{
              type: 'numeric',
              inputMode: 'numeric',
              minLength: 6,
              maxLength: 6
            }}
          />
        </Stack>

        <FormHelperText error={!isValid} style={{ textAlign: 'right' }}>
          {!isValid && 'Code is required'}
        </FormHelperText>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Verify
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
