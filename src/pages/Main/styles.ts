import styled from 'styled-components';
import { shade } from 'polished';
import { Form as Unform } from '@unform/web';

interface IStarredRepositoriesProps {
  theme: string;
}

export const Container = styled.div`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;

  img {
    width: 180px;
    height: auto;
  }

  .button-switch-theme {
    background: transparent;
    border: none;
    position: absolute;
    right: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    font-weight: 600;
    font-size: 16px;

    svg {
      margin-right: 4px;
    }

    &.switch-to-dark {
      color: #fff;

      &:hover {
        color: ${shade('0.2', '#fff')};
        border-bottom: 2px solid ${shade('0.2', '#fff')};
      }
    }

    &.switch-to-light {
      color: #3a3a3a;

      &:hover {
        color: ${shade('0.2', '#3a3a3a')};
        border-bottom: 2px solid ${shade('0.2', '#3a3a3a')};
      }
    }
  }
`;

export const Title = styled.h1`
  font-size: 2.4em;
  line-height: 56px;

  max-width: 580px;
  margin: 56px 0 24px;
`;

export const Form = styled(Unform)`
  display: flex;

  .submit-button {
    margin-top: 0;
    margin-left: 8px;
    width: 100%;
    width: 200px;
  }

  @media screen and (max-width: 790px) {
    flex-direction: column;

    .submit-button {
      margin-top: 16px;
      margin-left: 0px;
      width: 100%;
    }
  }
`;

export const Profile = styled.div`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    > div {
      margin-left: 24px;

      .name {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        strong {
          font-size: 32px;
          margin-right: 4px;
        }
      }

      p {
        font-size: 14px;
        margin-top: 4px;

        svg {
          margin-right: 4px;
        }
      }

      a {
        font-size: 14px;

        &:hover {
          color: ${shade('0.2', '#737390')};
        }
      }
    }

    @media screen and (max-width: 790px) {
      flex-direction: column;

      > div {
        margin-top: 16px;
        margin-left: 0;
      }
    }
  }

  ul {
    display: flex;

    list-style: none;
    margin-top: 40px;

    li + li {
      margin-left: 80px;
    }

    @media screen and (max-width: 790px) {
      li + li {
        margin-left: 0;
      }

      justify-content: space-between;
    }

    li {
      strong {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36px;
        color: #8bb03e;

        svg {
          margin-right: 4px;
        }
      }

      span {
        margin-top: 4px;
        display: block;
      }
    }
  }
`;

export const StarredRepos = styled.div<IStarredRepositoriesProps>`
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
