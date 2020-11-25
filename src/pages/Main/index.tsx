import React, { useState, useEffect, useRef, useCallback } from 'react';
import Geocode from 'react-geocode';

import { FiMoon, FiSearch, FiSun, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Title, Form, Container } from './styles';
import Logo from '../../assets/img/logo.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useTheme } from '../../hooks/theme';
import Map from './Map';
import Profile from './Profile';
import StarredRepos from './StarredRepos';

interface IUser {
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface IRepository {
  id: number;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  html_url: string;
}
interface IFormData {
  user: string;
}

const Main: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { toggleTheme, theme } = useTheme();
  const [starredRepos, setStarredRepos] = useState<IRepository[]>([]);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      if (data.user?.length === 0) {
        addToast({
          type: 'info',
          title: 'Field required!',
          description: 'Plese, enter the Github username to query data.',
        });

        return;
      }

      setLoading(true);
      setUser({} as IUser);

      try {
        const findUser = await api.get<IUser>(`/users/${data.user}`);

        const starred = await api.get<IRepository[]>(
          `/users/${data.user}/starred`,
        );

        const address = findUser.data?.location;

        setStarredRepos(starred.data);
        setUser(findUser.data);

        if (address) {
          await Geocode.fromAddress(`${address}`).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;

              setPosition([lat, lng]);
            },
            error => {
              addToast({
                type: 'error',
                title: 'Error!',
                description: 'Happen a error when search the user address.',
              });
            },
          );
        } else {
          addToast({
            type: 'info',
            title: 'Address invalid or empty!',
            description: `Sorry! We can't search the user address with a invalid address stored by he.`,
          });
        }
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Error!',
          description:
            'Not was possible get the User profile, please, verify the username and try again.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  useEffect(() => {
    if (!process.env.REACT_APP_GOOGLE_MAPS_KEY) {
      addToast({
        type: 'info',
        title: 'Maps Key is required!',
        description:
          'Please, set the REACT_APP_GOOGLE_MAPS_KEY environment variable',
      });
    } else {
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY || '');

      Geocode.setLanguage('en');

      Geocode.setRegion('es');
    }
  }, [addToast]);

  return (
    <Container data-testid="container">
      <button
        className={`button-switch-theme switch-to-${theme}`}
        type="button"
        onClick={toggleTheme}
      >
        {theme === 'light' ? (
          <>
            <FiMoon /> Dark mode
          </>
        ) : (
          <>
            <FiSun /> Light mode
          </>
        )}
      </button>
      <img src={Logo} alt="" />
      <Title>Find Profiles on Github</Title>
      <Form ref={formRef} onSubmit={handleSubmit} data-testid="form">
        <Input
          data-testid="user-input"
          name="user"
          placeholder="Enter the Github username"
          type="text"
          icon={FiUser}
          className="user-input"
        />
        <Button
          type="submit"
          className="submit-button"
          data-testid="button-submit"
        >
          <FiSearch /> Find
        </Button>
      </Form>
      {!!Object.keys(user).length && !loading && (
        <>
          <Profile user={user} data-testid="profile-section" />
          <StarredRepos starredRepos={starredRepos} />
          <Map position={position} />
        </>
      )}
      {loading && <div className="loading" data-testid="loading" />}
    </Container>
  );
};

export default Main;
