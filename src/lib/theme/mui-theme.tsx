'use client';

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialMode = savedTheme 
      ? savedTheme === 'dark' ? 'dark' : 'light'
      : prefersDark ? 'dark' : 'light';
    
    setMode(initialMode);

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setMode(isDark ? 'dark' : 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#22c55e' : '#16a34a', // green-500 : green-600
        light: '#4ade80', // green-400
        dark: '#15803d', // green-700
        contrastText: '#ffffff',
      },
      secondary: {
        main: mode === 'dark' ? '#2c2c2e' : '#e8e8ea',
        light: mode === 'dark' ? '#38383a' : '#f5f5f7',
        dark: mode === 'dark' ? '#1c1c1e' : '#d1d1d6',
      },
      background: {
        default: mode === 'dark' ? '#1c1c1e' : '#f5f5f7',
        paper: mode === 'dark' ? '#2c2c2e' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? 'rgba(255, 255, 255, 0.95)' : '#1a1a1a',
        secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.7)',
      },
      divider: mode === 'dark' ? '#38383a' : '#d1d1d6',
      action: {
        hover: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
        selected: mode === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shadows: [
      'none',
      '0 2px 4px rgba(0,0,0,0.05)',
      '0 4px 8px rgba(0,0,0,0.08)',
      '0 6px 12px rgba(0,0,0,0.1)',
      '0 8px 16px rgba(0,0,0,0.12)',
      '0 10px 20px rgba(0,0,0,0.15)',
      '0 12px 24px rgba(0,0,0,0.18)',
      '0 14px 28px rgba(0,0,0,0.2)',
      '0 16px 32px rgba(0,0,0,0.22)',
      '0 18px 36px rgba(0,0,0,0.25)',
      '0 10px 30px -5px rgba(0,0,0,0.3), 0 4px 10px -2px rgba(0,0,0,0.2)',
      '0 12px 36px -6px rgba(0,0,0,0.35), 0 5px 12px -3px rgba(0,0,0,0.25)',
      '0 14px 42px -7px rgba(0,0,0,0.4), 0 6px 14px -4px rgba(0,0,0,0.3)',
      '0 16px 48px -8px rgba(0,0,0,0.45), 0 7px 16px -5px rgba(0,0,0,0.35)',
      '0 18px 54px -9px rgba(0,0,0,0.5), 0 8px 18px -6px rgba(0,0,0,0.4)',
      '0 20px 50px -10px rgba(0,0,0,0.4), 0 8px 20px -4px rgba(0,0,0,0.3)',
      '0 22px 56px -11px rgba(0,0,0,0.55), 0 9px 22px -7px rgba(0,0,0,0.45)',
      '0 24px 62px -12px rgba(0,0,0,0.6), 0 10px 24px -8px rgba(0,0,0,0.5)',
      '0 26px 68px -13px rgba(0,0,0,0.65), 0 11px 26px -9px rgba(0,0,0,0.55)',
      '0 28px 74px -14px rgba(0,0,0,0.7), 0 12px 28px -10px rgba(0,0,0,0.6)',
      '0 30px 80px -15px rgba(0,0,0,0.75), 0 13px 30px -11px rgba(0,0,0,0.65)',
      '0 32px 86px -16px rgba(0,0,0,0.8), 0 14px 32px -12px rgba(0,0,0,0.7)',
      '0 34px 92px -17px rgba(0,0,0,0.85), 0 15px 34px -13px rgba(0,0,0,0.75)',
      '0 36px 98px -18px rgba(0,0,0,0.9), 0 16px 36px -14px rgba(0,0,0,0.8)',
      '0 38px 104px -19px rgba(0,0,0,0.95), 0 17px 38px -15px rgba(0,0,0,0.85)',
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '10px 24px',
            fontSize: '0.95rem',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'dark' 
              ? '0 10px 30px -5px rgba(0,0,0,0.6), 0 4px 10px -2px rgba(0,0,0,0.4)'
              : '0 10px 30px -5px rgba(0,0,0,0.3), 0 4px 10px -2px rgba(0,0,0,0.2)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
          elevation1: {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
          elevation2: {
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          },
          elevation3: {
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
            },
          },
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
