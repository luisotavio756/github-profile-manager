import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #8bb03e;
  height: 56px;
  color: #fff;
  border-radius: 10px;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  border: none;
  margin-top: 16px;
  transition: background 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 4px;
  }

  &:hover {
    background: ${shade(0.2, '#8bb03e')};
  }
`;
