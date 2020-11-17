import React, { createContext, useCallback, useState, useContext } from 'react';

interface IUser {
  id: string;
  avatar_url: string;
  name: string;
  email: string;
  level: string;
}
interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

interface IAuthState {
  token: string;
  user: IUser;
}

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      // api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    // const response = await api.post('sessions', {
    //   email,
    //   password,
    // });
    // const { token, user } = response.data;
    // localStorage.setItem('@GoBarber:token', token);
    // localStorage.setItem('@GoBarber:user', JSON.stringify(user));
    // // api.defaults.headers.authorization = `Bearer ${token}`;
    // setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as IAuthState);
  }, []);

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth muste be user within as AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
