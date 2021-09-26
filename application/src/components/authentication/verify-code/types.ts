
export type InitialValues = {
    email: string;
    verificationCode: string;
    afterSubmit?: string;
};

export type Props = {
    sub: string;
    code: string;
}
