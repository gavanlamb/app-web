import { createContext, ReactNode, useCallback, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CognitoUser,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoUserAttribute,
  ISignUpResult
} from 'amazon-cognito-identity-js';
// utils
import axios from '../utils/axios';
// routes
import { PATH_AUTH } from '../routes/paths';
// @types
import { ActionMap, AuthState, AuthUser, AWSCognitoContextType } from '../@types/authentication';
//
import { cognitoConfig } from '../config';

export const UserPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.userPoolId || '',
  ClientId: cognitoConfig.clientId || ''
});

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

enum Types {
  auth = 'AUTHENTICATE',
  logout = 'LOGOUT'
}

type AwsAuthPayload = {
  [Types.auth]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.logout]: undefined;
};

type AwsActions = ActionMap<AwsAuthPayload>[keyof ActionMap<AwsAuthPayload>];

const reducer = (state: AuthState, action: AwsActions) => {
  if (action.type === 'AUTHENTICATE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
  return state;
};

const AuthContext = createContext<AWSCognitoContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUserAttributes = useCallback(
    (currentUser: CognitoUser): Record<string, any> =>
      new Promise((resolve, reject) => {
        currentUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
          } else {
            const results: Record<string, any> = {};

            attributes?.forEach((attribute) => {
              results[attribute.Name] = attribute.Value;
            });
            resolve(results);
          }
        });
      }),
    []
  );

  const getSession = useCallback(
    () =>
      new Promise<{
        user: CognitoUser | null;
        session: CognitoUserSession | null;
        headers: { Authorization: string | undefined };
      } | void>((resolve, reject) => {
        const user = UserPool.getCurrentUser();
        if (user) {
          user.getSession(async (err: Error | null, session: CognitoUserSession | null) => {
            if (err) {
              reject(err);
            } else {
              const attributes = await getUserAttributes(user);
              const token = session?.getIdToken().getJwtToken();
              axios.defaults.headers.common.Authorization = token;
              dispatch({
                type: Types.auth,
                payload: { isAuthenticated: true, user: attributes }
              });
              resolve({
                user,
                session,
                headers: { Authorization: token }
              });
            }
          });
        } else {
          dispatch({
            type: Types.auth,
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      }),
    [getUserAttributes]
  );

  const initial = useCallback(async () => {
    try {
      await getSession();
    } catch {
      dispatch({
        type: Types.auth,
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  }, [getSession]);

  useEffect(() => {
    initial();
  }, [initial]);

  // We make sure to handle the user update here, but return the resolve value in order for our components to be
  // able to chain additional `.then()` logic. Additionally, we `.catch` the error and "enhance it" by providing
  // a message that our React components can use.
  const login = useCallback(
    (email, password) =>
      new Promise((resolve, reject) => {
        const user = new CognitoUser({
          Username: email,
          Pool: UserPool
        });

        const authDetails = new AuthenticationDetails({
          Username: email,
          Password: password
        });

        user.authenticateUser(authDetails, {
          onSuccess: async (data) => {
            await getSession();
            resolve(data);
          },
          onFailure: (err) => {
            switch (err.code) {
              case 'NotAuthorizedException': {
                switch (err.message) {
                  case 'Incorrect username or password.': {
                    reject(new Error('Username or password are incorrect, please try again.'));
                    navigate(PATH_AUTH.login, { replace: true });
                    break;
                  }
                  default: {
                    reject(err);
                  }
                }
                break;
              }
              default: {
                reject(err);
              }
            }
          },
          newPasswordRequired: () => {
            // Handle this on login page for update password.
            resolve({ message: 'newPasswordRequired' });
          },
          customChallenge: (challengeParameters: any) => {
            console.log('customChallenge');
            console.log(challengeParameters);
          },
          selectMFAType: (challengeName, challengeParameters) => {
            console.log('selectMFAType');
            console.log(challengeName);
            console.log(challengeParameters);
          },
          mfaRequired: (challengeName, challengeParameters) => {
            console.log('mfaRequired');
            console.log(challengeName);
            console.log(challengeParameters);
          },
          totpRequired: (challengeName, challengeParameters) => {
            console.log('totpRequired');
            console.log(challengeName);
            console.log(challengeParameters);
          },
          mfaSetup: (challengeName, challengeParameters) => {
            console.log('mfaSetup');
            console.log(challengeName);
            console.log(challengeParameters);
          }
        });
      }),
    [getSession]
  );

  // same thing here
  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      dispatch({ type: Types.logout });
    }
  };

  const register = (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<ISignUpResult | undefined> =>
    new Promise((resolve, reject) => {
      UserPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'given_name', Value: `${firstName}` }),
          new CognitoUserAttribute({ Name: 'family_name', Value: `${lastName}` })
        ],
        [],
        async (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(res);
          window.location.href = PATH_AUTH.verify;
        }
      );
    });

  const resetPassword = (email: string) =>
    new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: UserPool
      });

      cognitoUser.forgotPassword({
        onSuccess: (data) => {
          console.log(data);
          resolve(data);
        },
        onFailure: (err) => {
          console.log(err);
          reject(err);
        }
      });
    });

  const updateProfile = (email: string, firstName: string, lastName: string) =>
    new Promise((resolve, reject) => {
      getSession().then((session) => {
        const attributes = [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
          new CognitoUserAttribute({ Name: 'family_name', Value: lastName })
        ];
        if (session?.user) {
          session.user.updateAttributes(attributes, async (error: any, result: unknown) => {
            if (error) {
              await getSession();
              reject(error);
            } else {
              await getSession();
              resolve(result);
            }
          });
        } else {
          reject();
        }
      });
    });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'cognito',
        user: {
          role: 'user',
          id: state.user?.sub,
          displayName: `${state?.user?.given_name} ${state?.user?.family_name}`,
          givenName: state?.user?.given_name,
          familyName: state?.user?.family_name,
          phoneNumber: state?.user?.phone_number,
          email: state?.user?.email
        },
        login,
        register,
        logout,
        updateProfile,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
