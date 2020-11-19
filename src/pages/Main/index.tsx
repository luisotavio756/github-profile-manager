import React, { useState, useEffect, useRef, useCallback } from 'react';
import Geocode from 'react-geocode';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import GitHubButton from 'react-github-btn';
import {
  FiAlignLeft,
  FiBook,
  FiChevronRight,
  FiLink,
  FiMapPin,
  FiMoon,
  FiSearch,
  FiStar,
  FiSun,
  FiUser,
  FiUserCheck,
  FiUsers,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import {
  Title,
  Form,
  Profile,
  Container,
  StarredRepos,
  MapView,
} from './styles';
import Logo from '../../assets/img/logo.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useTheme } from '../../hooks/theme';

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

        const address = findUser.data.location;

        setStarredRepos(starred.data);
        setUser(findUser.data);

        if (!address) {
          addToast({
            type: 'info',
            title: 'Address invalid or empty!',
            description: `Sorry! We can't search the user address with a invalid address stored by he.`,
          });

          return;
        }

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
    }
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY || '');

    Geocode.setLanguage('en');

    Geocode.setRegion('es');
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
      <Title>Manage Profiles on Github</Title>
      <Form ref={formRef} onSubmit={handleSubmit} data-testid="form">
        <Input
          data-testid="user-input"
          name="user"
          placeholder="Digite o nome do usuário"
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
          <Profile data-testid="profile-section">
            <header>
              <img src={user.avatar_url} alt="" />
              <div>
                <div className="name">
                  <strong>{user.name}</strong>
                  <p>{user.login}</p>
                </div>
                <p>
                  <FiAlignLeft />
                  {user.bio || 'Without description'}
                </p>
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  <FiLink /> {user.html_url}
                </a>
              </div>
            </header>
            <ul>
              <li>
                <strong>
                  <FiUsers />
                  {user.followers}
                </strong>
                <span>Follows</span>
              </li>
              <li>
                <strong>
                  <FiUserCheck /> {user.following}
                </strong>
                <span>Following</span>
              </li>
              <li>
                <strong>
                  <FiBook /> {user.public_repos}
                </strong>
                <span>Public Repos</span>
              </li>
            </ul>
          </Profile>
          <StarredRepos theme={theme}>
            <h1>
              <FiStar /> Starred Repositories
            </h1>
            {starredRepos.map(repository => (
              <a
                key={repository.full_name}
                href={repository.html_url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="github-button">
                  <GitHubButton
                    href={`https://github.com/${repository.full_name}`}
                    data-color-scheme="no-preference: light; light: dark; dark: light;"
                    data-icon="octicon-star"
                    data-show-count
                    aria-label={`Star ${repository.full_name} on GitHub`}
                  >
                    Star
                  </GitHubButton>
                </div>
                <div className="content">
                  <img src={repository.owner.avatar_url} alt="Avatar" />
                  <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                  </div>
                  <FiChevronRight size={20} />
                </div>
              </a>
            ))}
            {starredRepos.length === 0 && (
              <div className="not-repos">
                <p>Nothing starred repositories</p>
              </div>
            )}
          </StarredRepos>
          <MapView>
            <h1>
              <FiMapPin /> Location
            </h1>
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: 200 }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </MapView>
        </>
      )}
      {loading && <div className="loading" data-testid="loading" />}
    </Container>
  );
};

export default Main;
