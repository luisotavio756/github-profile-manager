import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
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
