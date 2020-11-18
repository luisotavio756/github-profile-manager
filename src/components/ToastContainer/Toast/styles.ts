import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface IToastProps {
  type?: 'success' | 'error' | 'info';
  hasdescription: number;
}

const toastTypeVariations = {
  info: css`
    background: #ebf8ff !important;
    color: #3172b7 !important;
  `,
  success: css`
    background: #e6fffa !important;
    color: #2e656a !important;
  `,
  error: css`
    background: #fddede !important;
    color: #c53030 !important;
  `,
};

export const Container = styled(animated.div)<IToastProps>`
  max-width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;

  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  & + & {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    strong {
      color: #242424 !important;
      font-weight: 600;
    }

    p {
      color: #444;
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;

    opacity: 0.6;
    border: 0;

    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.hasdescription &&
    css`
      align-items: center;

      svg {
        margin-top: 0;
      }
    `}
`;
