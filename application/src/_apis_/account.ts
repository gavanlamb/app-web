// utils
import fakeRequest from '../utils/fakeRequest';
// @types
import { User } from '../@types/account';
//
import mock from './mock';

// ----------------------------------------------------------------------

const users: User[] = [
  {
    id: 'ID',
    displayName: 'Gavan Lamb',
    givenName: 'Gavan',
    familyName: 'Lamb',
    email: 'demo@minimals.cc',
    phoneNumber: '+61406341148'
  }
];

// ----------------------------------------------------------------------

mock.onPost('/api/account/login').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email } = JSON.parse(config.data);
    const user = users.find((_user) => _user.email === email);

    if (!user) {
      return [400, { message: 'There is no user corresponding to the email address.' }];
    }

    return [200, { user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onPost('/api/account/register').reply(async (config) => {
  try {
    await fakeRequest(1000);

    const { email } = JSON.parse(config.data);
    let user = users.find((_user) => _user.email === email);

    if (user) {
      return [400, { message: 'There already exists an account with the given email address.' }];
    }

    user = {
      id: 'ID',
      displayName: 'Gavan Lamb',
      givenName: 'Gavan',
      familyName: 'Lamb',
      email: 'demo@minimals.cc',
      phoneNumber: '+61406341148'
    };

    return [200, { user }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/account/my-account').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }

    return [401, { message: 'Invalid authorization token' }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
