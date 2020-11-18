import React, { useState, useEffect, useRef, useCallback } from 'react';
import Geocode from 'react-geocode';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
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
  url: string;
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
          setLoading(false);

          addToast({
            type: 'info',
            title: 'Endereço inválido ou vazio!',
            description:
              'Infelizmente não podemos buscar o endereço do usuário. A localização informada por ele está vazia ou inválida',
          });

          return;
        }

        Geocode.fromAddress(`${address}`)
          .then(
            response => {
              console.log(response);

              const { lat, lng } = response.results[0].geometry.location;

              setPosition([lat, lng]);
            },
            error => {
              addToast({
                type: 'error',
                title: 'Ocorreu um erro!',
                description: 'Ocorreu um erro ao buscar o endereço do usuário',
              });
            },
          )
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);

        addToast({
          type: 'error',
          title: 'Ocorreu um erro!',
          description:
            'Não foi possível buscar o usuário, verifique o nome de usuário e tente novamente.',
        });
      }
    },
    [addToast],
  );

  useEffect(() => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_KEY || '');

    // set response language. Defaults to english.
    Geocode.setLanguage('en');

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion('es');
  }, []);

  return (
    <Container>
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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="user"
          placeholder="Digite o nome do usuário"
          type="text"
          icon={FiUser}
          className="user-input"
        />
        <Button type="submit" className="submit-button">
          <FiSearch /> Find
        </Button>
      </Form>
      {!!Object.keys(user).length && !loading && (
        <>
          <Profile>
            <header>
              <img src={user.avatar_url} alt="" />
              <div>
                <div className="name">
                  <strong>{user.name}</strong>
                  <p>{user.login}</p>
                </div>
                <p>
                  <FiAlignLeft />
                  {user.bio}
                </p>
                <a href={user.url} target="_blank" rel="noreferrer">
                  <FiLink /> {user.url}
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
          <StarredRepos>
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
                <img src={repository.owner.avatar_url} alt="Avatar" />
                <div>
                  <strong>{repository.full_name}</strong>
                  <p>{repository.description}</p>
                </div>
                <FiChevronRight size={20} />
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
      {loading && <div className="loading" />}
    </Container>
  );
};

export default Main;
