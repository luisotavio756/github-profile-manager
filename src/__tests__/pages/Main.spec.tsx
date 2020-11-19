import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Geocode from 'react-geocode';
import Main from '../../pages/Main';

jest.mock('react-github-btn', () => jest.fn());
jest.mock('../../hooks/toast', () => ({
  useToast: () => ({
    addToast: jest.fn(),
  }),
}));

Geocode.fromAddress = jest.fn();
Geocode.setApiKey = jest.fn();
Geocode.setLanguage = jest.fn();
Geocode.setRegion = jest.fn();

jest.mock('axios', () => {
  return {
    create: (options: any) => ({
      get: jest.fn(() =>
        Promise.resolve({
          data: [],
        }),
      ),
    }),
    get: jest.fn(() =>
      Promise.resolve({
        data: [
          {
            name: 'string',
            login: 'string',
            avatar_url: 'string',
            url: 'string',
            bio: 'string',
            location: 'string',
            followers: 'string',
            following: 'string',
            public_repos: 'string',
          },
        ],
      }),
    ),
  };
});
describe('Main Page', () => {
  it('should be able show user profile', async () => {
    const { getByTestId } = render(<Main />);

    const userField = getByTestId('user-input');
    const button = getByTestId('button-submit');

    act(() => {
      fireEvent.change(userField, { target: { value: 'luisotavio756' } });
      fireEvent.click(button);
    });

    expect(waitFor(() => getByTestId('profile-section'))).toBeTruthy();
  });

  it('should be able show user profile', async () => {
    const { getByTestId } = render(<Main />);

    const userField = getByTestId('user-input');
    const button = getByTestId('button-submit');

    act(() => {
      fireEvent.change(userField, { target: { value: 'luisotavio756' } });
      fireEvent.click(button);
    });

    expect(waitFor(() => getByTestId('profile-section'))).toBeTruthy();
  });
});
