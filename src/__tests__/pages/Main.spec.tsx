import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Geocode from 'react-geocode';
import MockAdapter from 'axios-mock-adapter';
import api from '../../services/api';
import Main from '../../pages/Main';
import * as Toast from '../../hooks/toast';

const apiMock = new MockAdapter(api);

apiMock.onGet(/starred$/).reply(200, [
  {
    id: 289597983,
    full_name: 'gzmael/dark-theme-typescript-tailwind',
    owner: {
      login: 'gzmael',
      avatar_url: 'https://avatars3.githubusercontent.com/u/896631?v=4',
    },
    html_url: 'https://github.com/gzmael/dark-theme-typescript-tailwind',
    description: 'SingIn exemple with DarkMode (TypeScript + Tailwind)',
  },
]);

apiMock.onGet(/\users/).reply(200, {
  name: 'string',
  login: 'string',
  avatar_url: 'string',
  url: 'string',
  bio: 'string',
  location: 'string',
  followers: 10,
  following: 10,
  public_repos: 10,
});

jest.mock('react-github-btn', () => jest.fn());

Geocode.fromAddress = jest.fn();
Geocode.setApiKey = jest.fn();
Geocode.setLanguage = jest.fn();
Geocode.setRegion = jest.fn();

describe('Main Page', () => {
  it('should be able render the Main', async () => {
    render(<Main />);

    await waitFor(() => expect(screen.getByTestId('container')).toBeTruthy());
  });

  it('should be able display error toast when input is empty', async () => {
    const mockedToast = jest.fn();

    jest.spyOn(Toast, 'useToast').mockImplementation(() => ({
      addToast: params => mockedToast(params),
      removeToast: () => jest.fn(),
    }));

    render(<Main />);

    const userField = screen.getByTestId('user-input');
    const button = screen.getByTestId('button-submit');

    act(() => {
      fireEvent.change(userField, { target: { value: '' } });
      fireEvent.click(button);
    });

    await waitFor(() => expect(mockedToast).toHaveBeenCalled());
  });
});
