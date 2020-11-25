import React from 'react';
import GitHubButton from 'react-github-btn';
import { FiChevronRight, FiStar } from 'react-icons/fi';
import { useTheme } from '../../../hooks/theme';

import { Container } from './styles';

interface IStarredReposProps {
  starredRepos: Array<{
    id: number;
    full_name: string;
    owner: {
      login: string;
      avatar_url: string;
    };
    description: string;
    html_url: string;
  }>;
}

const StarredRepos: React.FC<IStarredReposProps> = ({ starredRepos }) => {
  const { theme } = useTheme();

  return (
    <Container theme={theme}>
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
    </Container>
  );
};

export default StarredRepos;
