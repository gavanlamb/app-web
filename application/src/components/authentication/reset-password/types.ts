export type InitialValues = {
  password: string;
  afterSubmit?: string;
};

export type ResetPasswordFormProps = {
  userId: string;
  code: string;
  onSent: VoidFunction;
};
