
import React, { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Box
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import '../../scss/layout/_FormExercise.scss'

function FormExercise({ 
  onSubmit = () => {}, 
  isLoading = false, 
  title = 'Agregar Ejercicio',
  initialData = null,
  onCancel = null
}) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    duration: '',
    series: '',
    reps: '',
    weight: ''
  })

  // Cargar datos iniciales si se proporcionan (modo edición)
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        description: initialData.description || '',
        duration: initialData.duration || '',
        series: initialData.series || '',
        reps: initialData.reps || '',
        weight: initialData.weight || ''
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = () => {
    if (form.name.trim() === '') {
      alert('El nombre del ejercicio es requerido')
      return
    }

    // Pasar los datos al backend mediante la función onSubmit
    onSubmit(form)

    // Limpiar formulario solo si no estamos editando
    if (!initialData) {
      setForm({
        name: '',
        description: '',
        duration: '',
        series: '',
        reps: '',
        weight: ''
      })
    }
  }

  const handleCancel = () => {
    // Limpiar formulario
    setForm({
      name: '',
      description: '',
      duration: '',
      series: '',
      reps: '',
      weight: ''
    })
    if (onCancel) {
      onCancel()
    }
  }

  const isEditMode = !!initialData

  return (
    <div className="form-exercise">
      <h2 className="form-exercise__title">{title}</h2>

      {/* Formulario */}
      <Box className="form-exercise__field">
        <TextField
          label="Nombre del ejercicio"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ej: Sentadillas"
          variant="outlined"
          fullWidth
          disabled={isLoading}
        />
      </Box>

      <Box className="form-exercise__field">
        <TextField
          label="Descripción"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe el ejercicio..."
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          disabled={isLoading}
        />
      </Box>
<Box className="form-exercise__field">
        <TextField
          label="Duración (minutos)"
          name="duration"
          type="number"
          value={form.duration}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          disabled={isLoading}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        <Box className="form-exercise__field">
          <TextField
            label="Series"
            name="series"
            type="number"
            value={form.series}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            disabled={isLoading}
          />
        </Box>

        <Box className="form-exercise__field">
          <TextField
            label="Repeticiones"
            name="reps"
            type="number"
            value={form.reps}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            disabled={isLoading}
          />
        </Box>
      </Box>

      <Box className="form-exercise__field">
        <TextField
          label="Peso (kg)"
          name="weight"
          type="number"
          value={form.weight}
          onChange={handleChange}
          placeholder="Opcional"
          variant="outlined"
          fullWidth
          disabled={isLoading}
        />
      </Box>

      {/* Botón Submit */}
      <Box className="form-exercise__buttons" sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color={isEditMode ? 'primary' : 'success'}
          startIcon={isEditMode ? <SaveIcon /> : <AddIcon />}
          onClick={handleSubmit}
          className="form-exercise__button"
          disabled={isLoading}
          sx={{ flex: 1 }}
        >
          {isLoading ? 'Procesando...' : (isEditMode ? 'Guardar Cambios' : 'Agregar Entrenamiento')}
        </Button>
        {isEditMode && (
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleCancel}
            disabled={isLoading}
            sx={{ flex: 1 }}
          >
            Cancelar
          </Button>
        )}
      </Box>
    </div>
  )
}

export default FormExercise
