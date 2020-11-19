import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface IContainerProps {
  isFocus: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<IContainerProps>`
  background: #fff;
  border-radius: 10px;
  border: 2px solid #fff;
  padding: 16px;
  width: 100%;
  color: #666360;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  svg {
    margin-right: 16px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocus &&
    css`
      color: #8bb03e;
      border-color: #8bb03e;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #8bb03e;
      border-color: #8bb03e;
    `}

  input {
    color: #666;
    flex: 1;
    background: transparent;
    border: none;

    &::placeholder {
      color: #a8a8b3;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
