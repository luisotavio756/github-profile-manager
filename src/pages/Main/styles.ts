import styled from 'styled-components';
import { shade } from 'polished';
import { Form as Unform } from '@unform/web';

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
