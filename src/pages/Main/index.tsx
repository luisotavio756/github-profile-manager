import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FiAlignLeft,
  FiChevronRight,
  FiLink,
  FiSearch,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Title, Form, Profile, Container, StarredRepos } from './styles';
import Logo from '../../assets/img/logo.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface IUser {
  id: number;
  name: string;
  avatar_url: string;
  url: string;
  bio: string;
  location: string;
  followers: number;
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
  const [starredRepos, setStarredRepos] = useState<IRepository[]>([]);
  const [user, setUser] = useState<IUser>({} as IUser);
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

        setStarredRepos(starred.data);
        setUser(findUser.data);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Ocorreu um erro!',
          description:
            'Não foi possível buscar o usuário, verifique o nome de usuário e tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <img src={Logo} alt="" />
      <Title>Explore perfis no Github</Title>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="user"
          placeholder="Digite o nome do usuário"
          type="text"
          icon={FiUser}
          className="user-input"
        />
        <Button type="submit" className="submit-button">
          <FiSearch /> Buscar
        </Button>
      </Form>
      {!!Object.keys(user).length && !loading && (
        <>
          <Profile>
            <header>
              <img src={user.avatar_url} alt="" />
              <div>
                <strong>{user.name}</strong>
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
                <strong>10</strong>
                <span>Forks</span>
              </li>
              <li>
                <strong>10</strong>
                <span>Issues abertas</span>
              </li>
            </ul>
          </Profile>
          <StarredRepos>
            {starredRepos.map(repository => (
              <a key={repository.full_name} href={repository.html_url}>
                <img src={repository.owner.avatar_url} alt="Avatar" />
                <div>
                  <strong>{repository.full_name}</strong>
                  <p>{repository.description}</p>
                </div>
                <FiChevronRight size={20} />
              </a>
            ))}
          </StarredRepos>
        </>
      )}
      {loading && <div className="loading" />}
    </Container>
  );
};

export default Main;
