import React, { createContext, useCallback, useState, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';

interface IThemeContextData {
  theme: string;
  toggleTheme(): void;
}

const ThemeContext = createContext({
  theme: 'light',
} as IThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

function useTheme(): IThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme muste be user within as ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
