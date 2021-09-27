export type InitialValues = {
  email: string;
  afterSubmit?: string;
};

export type ResetPasswordFormProps = {
  onSent: VoidFunction;
  onGetEmail: (value: string) => void;
};
