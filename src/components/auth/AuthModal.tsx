"use client";

import { useState } from 'react';
import { X, Mail, Github, Chrome, Wallet, KeyRound } from 'lucide-react';
import { useAuth } from '@/app/providers';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle,
  TextField,
  Button,
  IconButton,
  Divider,
  Alert,
  Box,
  Typography,
  Tabs,
  Tab
} from '@mui/material';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (authMode === 'login') {
        await login(email, password);
      } else {
        await register(name || email.split('@')[0], email, password);
      }
      onClose();
    } catch (e: any) {
      setError(e?.message || `Failed to ${authMode}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: 'background.paper',
          boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.4), 0 8px 20px -4px rgba(0, 0, 0, 0.3)',
          overflow: 'visible',
        }
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Header with close button */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 3,
          pb: 2
        }}>
          <DialogTitle sx={{ p: 0, fontSize: '1.75rem', fontWeight: 700 }}>
            Welcome
          </DialogTitle>
          <IconButton 
            onClick={onClose}
            sx={{ 
              '&:hover': { 
                bgcolor: 'action.hover',
                transform: 'rotate(90deg)',
                transition: 'transform 0.3s ease'
              }
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        <DialogContent sx={{ px: 3, pb: 3 }}>
          {/* Mode Tabs */}
          <Tabs 
            value={authMode} 
            onChange={(_, value) => setAuthMode(value)}
            sx={{ 
              mb: 3,
              '& .MuiTabs-indicator': {
                bgcolor: 'primary.main',
                height: 3,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            <Tab 
              label="Sign In" 
              value="login"
              sx={{ 
                flex: 1,
                fontWeight: 600,
                fontSize: '1rem'
              }}
            />
            <Tab 
              label="Create Account" 
              value="register"
              sx={{ 
                flex: 1,
                fontWeight: 600,
                fontSize: '1rem'
              }}
            />
          </Tabs>

          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert 
                  severity="error" 
                  onClose={() => setError(null)}
                  sx={{ mb: 3, borderRadius: 2 }}
                >
                  {error}
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {authMode === 'register' && (
              <TextField
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }
                }}
              />
            )}

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading || !email || !password}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
                '&:hover': {
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s ease'
                }
              }}
              startIcon={<Mail size={18} />}
            >
              {loading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Or continue with
              </Typography>
            </Divider>

            {/* Social Auth Buttons */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <Button
                variant="outlined"
                startIcon={<Chrome size={16} />}
                sx={{
                  py: 1.25,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                startIcon={<Github size={16} />}
                sx={{
                  py: 1.25,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                GitHub
              </Button>
              <Button
                variant="outlined"
                startIcon={<Wallet size={16} />}
                sx={{
                  gridColumn: 'span 2',
                  py: 1.25,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                Web3 Wallet
              </Button>
              <Button
                variant="outlined"
                startIcon={<KeyRound size={16} />}
                sx={{
                  gridColumn: 'span 2',
                  py: 1.25,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                Passkey
              </Button>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
              By continuing, you agree to our Terms and Privacy Policy.
            </Typography>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}
