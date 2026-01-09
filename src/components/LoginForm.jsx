import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Link,
  InputAdornment,
  CircularProgress
} from '@mui/material'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'

function LoginForm({ onSubmit = () => {}, isLoading = false }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })

  const validateForm = () => {
    const newErrors = { email: '', password: '' }

    if (!email) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido'
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    setErrors(newErrors)
    return newErrors.email === '' && newErrors.password === ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit({ email, password })
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffffff',
        padding: '2rem'
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              marginBottom: '0.5rem',
              color: '#333333'
            }}
          >
            Training App
          </Typography>
          <Typography variant="body1" sx={{ color: '#666666', fontSize: '1.05rem' }}>
            Inicia sesión para continuar
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            padding: '2.5rem',
            borderRadius: '16px',
            marginBottom: '2rem',
            background: '#f0f0f0'
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Email Field */}
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                disabled={isLoading}
                placeholder="tu@email.com"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaEnvelope style={{ color: '#667eea', marginRight: '8px', fontSize: '18px' }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f5f5f5',
                    borderRadius: '12px',
                    '&:hover': {
                      backgroundColor: '#f0f0f0'
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                      '& fieldset': {
                        borderColor: '#667eea',
                        borderWidth: '2px'
                      }
                    }
                  }
                }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                disabled={isLoading}
                placeholder="••••••"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaLock style={{ color: '#667eea', marginRight: '8px', fontSize: '18px' }} />
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f5f5f5',
                    borderRadius: '12px',
                    '&:hover': {
                      backgroundColor: '#f0f0f0'
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'white',
                      '& fieldset': {
                        borderColor: '#667eea',
                        borderWidth: '2px'
                      }
                    }
                  }
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  background: '#667eea',
                  color: 'white',
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: '12px',
                  marginTop: '1rem',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    background: '#5a67d8',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(102, 126, 234, 0.4)'
                  },
                  '&:disabled': {
                    background: '#ccc',
                    cursor: 'not-allowed'
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </Box>
          </form>
        </Paper>

        {/* Register Link */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#666666', fontWeight: 300 }}>
            ¿No tienes cuenta?{' '}
            <Link
              component={RouterLink}
              to="/register"
              sx={{
                color: '#667eea',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Regístrate aquí
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default LoginForm
