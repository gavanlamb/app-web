import { ISignUpResult } from 'amazon-cognito-identity-js';

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

export type AWSCognitoContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  method: 'cognito';
  login: (email: string, password: string) => Promise<unknown>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<ISignUpResult | undefined>;
  logout: VoidFunction;
  forgotPassword: (email: string) => Promise<unknown>;
  resetPassword: (userId: string, code: string, password: string) => Promise<unknown>;
  updateProfile: (email: string, firstName: string, lastName: string) => Promise<unknown>;
  confirmRegistration: (userId: string, code: string) => Promise<unknown>;
  resendVerificationLink: (email: string) => Promise<unknown>;
  confirmAttribute: (userId: string, attribute: string, code: string) => Promise<unknown>;
};
