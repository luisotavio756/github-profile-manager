import { renderHook, act } from '@testing-library/react-hooks';

import { useTheme, ThemeProvider } from '../../hooks/theme';

describe('Theme hook', () => {
  it('should be hable to switch theme', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    act(() => {
      result.current.toggleTheme();
    });

    const { theme } = result.current;

    expect(theme).toBe('light');
  });
});
