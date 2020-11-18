import styled from 'styled-components';
import { shade } from 'polished';
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 40px 20px;

  img {
    width: 180px;
    height: auto;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
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
          color: #3d3d4d;
          margin-right: 4px;
        }
      }

      p {
        font-size: 14px;
        color: #737390;
        margin-top: 4px;

        svg {
          margin-right: 4px;
        }
      }

      a {
        font-size: 14px;
        color: #737390;

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
        color: #3d3d4d;

        svg {
          margin-right: 4px;
        }
      }

      span {
        margin-top: 4px;
        display: block;
        color: #6c6c80;
      }
    }
  }
`;

export const StarredRepos = styled.div`
  margin-top: 36px;

  h1 {
    font-size: 36px;
    color: #3a3a3a;
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
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    display: flex;
    text-decoration: none;
    align-items: center;
    transition: transform 0.2s linear;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

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
        color: #3d3d4d;
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
`;

export const MapView = styled.div`
  margin-top: 36px;

  h1 {
    font-size: 36px;
    color: #3a3a3a;
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
`;
