export const cognitoConfig = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID
};

export const mapConfig = process.env.REACT_APP_MAP_MAPBOX;

export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;

export const termsOfServiceUrl = process.env.REACT_APP_TERMLY_TERMS_OF_SERVICE_URL;
export const privacyPolicyUrl = process.env.REACT_APP_TERMLY_PRIVACY_POLICY_URL;
