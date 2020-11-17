import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import { Container } from './styles';
import { IToastMessage, useToast } from '../../../hooks/toast';

interface IToastProps {
  toast: IToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<IToastProps> = ({ toast, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [toast.id, removeToast]);

  return (
    <Container
      key={toast.id}
      type={toast.type}
      hasdescription={Number(!!toast.description)}
      style={style}
    >
      {icons[toast.type || 'info']}

      <div>
        <strong>{toast.title}</strong>
        <p>{toast.description && toast.description}</p>
      </div>

      <button type="button" onClick={() => removeToast(toast.id)}>
        <FiXCircle size={20} />
      </button>
    </Container>
  );
};

export default Toast;
