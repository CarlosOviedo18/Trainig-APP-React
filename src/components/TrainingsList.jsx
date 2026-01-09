import React from 'react'
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

function TrainingsList({ trainings, isLoading, onDelete, onEdit }) {
  const [openDelete, setOpenDelete] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState(null)

  const handleDeleteClick = (id) => {
    setSelectedId(id)
    setOpenDelete(true)
  }

  const handleConfirmDelete = () => {
    onDelete(selectedId)
    setOpenDelete(false)
    setSelectedId(null)
  }
  if (isLoading) {
    return <Typography>Cargando...</Typography>
  }

  if (trainings.length === 0) {
    return (
      <Typography sx={{ textAlign: 'center', color: '#999', my: 4 }}>
        No hay entrenamientos aún. ¡Crea uno!
      </Typography>
    )
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Mis Entrenamientos
      </Typography>

      <Grid container spacing={2}>
        {trainings.map((training) => (
          <Grid item xs={12} sm={6} md={4} key={training.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  {training.name}
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1 }}>
                  Duración: {training.duration} min
                </Typography>
                {training.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {training.description}
                  </Typography>
                )}
              </CardContent>
              <CardActions sx={{ pt: 0 }}>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => onEdit(training.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteClick(training.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>¿Eliminar entrenamiento?</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro que deseas eliminar este entrenamiento? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TrainingsList
