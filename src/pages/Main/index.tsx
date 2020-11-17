import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiSend, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Title, Form } from './styles';
import Logo from '../../assets/img/logo.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';

interface Repository {
  id: number;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
}

const Main: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(() => {
    alert('Form submited');
  }, []);

  return (
    <>
      <img src={Logo} alt="" />
      <Title>Explore perfis no Github</Title>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="user"
          placeholder="Digite o nome do usuário"
          type="text"
          icon={FiUser}
          className="user-input"
        />
        <Button type="submit" className="submit-button">
          <FiSend /> Buscar
        </Button>
      </Form>
    </>
  );
};

export default Main;
