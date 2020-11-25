import React, { useMemo } from 'react';
import {
  FiAlignLeft,
  FiBook,
  FiLink,
  FiUserCheck,
  FiUsers,
} from 'react-icons/fi';

import { Container } from './styles';

interface IProfileProps {
  user: {
    name: string;
    login: string;
    avatar_url: string;
    html_url: string;
    bio: string;
    followers: number;
    following: number;
    public_repos: number;
  };
}

const Profile: React.FC<IProfileProps> = ({ user }) => {
  const {
    name,
    avatar_url,
    bio,
    followers,
    following,
    public_repos,
    html_url,
    login,
  } = useMemo(() => user, [user]);

  return (
    <Container>
      <header>
        <img src={avatar_url} alt="" />
        <div>
          <div className="name">
            <strong>{name}</strong>
            <p>{login}</p>
          </div>
          <p>
            <FiAlignLeft />
            {bio || 'Without description'}
          </p>
          <a href={html_url} target="_blank" rel="noreferrer">
            <FiLink /> {html_url}
          </a>
        </div>
      </header>
      <ul>
        <li>
          <strong>
            <FiUsers />
            {followers}
          </strong>
          <span>Follows</span>
        </li>
        <li>
          <strong>
            <FiUserCheck /> {following}
          </strong>
          <span>Following</span>
        </li>
        <li>
          <strong>
            <FiBook /> {public_repos}
          </strong>
          <span>Public Repos</span>
        </li>
      </ul>
    </Container>
  );
};

export default Profile;
