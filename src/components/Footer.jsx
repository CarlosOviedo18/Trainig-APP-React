import React from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack
} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2',
        color: '#fff',
        py: 6,
        mt: 8,
        marginTop: 'auto'
      }}
    >
      <Container maxWidth="lg">
        {/* Contenido Principal */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* Sobre nosotros */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FitnessCenterIcon sx={{ mr: 1, fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                App Training
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Tu aplicación para crear y gestionar entrenamientos personalizados.
            </Typography>
          </Grid>

          {/* Enlaces Rápidos */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Enlaces Rápidos
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="hover">
                Inicio
              </Link>
              <Link href="/entrenamientos" color="inherit" underline="hover">
                Mis Entrenamientos
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Sobre Nosotros
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Contacto
              </Link>
            </Stack>
          </Grid>

          {/* Soporte */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Soporte
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">
                Centro de Ayuda
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Privacidad
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Términos y Condiciones
              </Link>
              <Link href="#" color="inherit" underline="hover">
                FAQ
              </Link>
            </Stack>
          </Grid>

          {/* Redes Sociales */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Síguenos
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                color="inherit"
                href="#"
                sx={{
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="#"
                sx={{
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="#"
                sx={{
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                color="inherit"
                href="#"
                sx={{
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        {/* Divisor */}
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', my: 3 }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} App Training. Todos los derechos reservados.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', mt: 1 }}>
            Diseñado con ❤️ para tu entrenamiento
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer