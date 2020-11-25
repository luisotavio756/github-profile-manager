import styled from 'styled-components';

interface IStarredRepositoriesProps {
  theme: string;
}

export const Container = styled.div<IStarredRepositoriesProps>`
  margin-top: 36px;

  h1 {
    font-size: 36px;
    color: #8bb03e;
    line-height: 32px;

    max-width: 580px;
    margin: 36px 0 24px;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    svg {
      margin-right: 4px;
    }
  }

  .not-repos {
    p {
      font-size: 16px;
      color: #777;
    }
  }

  a {
    position: relative;
    background: ${props => (props.theme === 'light' ? '#fff' : '#444')};
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    transition: transform 0.2s linear;

    .github-button {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    &::before {
      position: absolute;
      height: 80%;
      width: 2.6px;
      left: 0;
      top: 10%;
      content: '';
      background: #8bb03e;
    }

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

    .content {
      display: flex;
      align-items: center;

      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }

      div {
        margin: 0 16px;
        flex: 1;

        strong {
          font-size: 18px;
        }

        p {
          font-size: 14px;
          color: #a8a8b3;
        }
      }

      svg {
        margin-left: auto;
        color: #a8a8b3;
      }
    }

    @media screen and (max-width: 790px) {
      .content {
        img {
          width: 48px;
          height: 48px;
        }

        div {
          strong {
            font-size: 14px;
          }

          p {
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
`;
