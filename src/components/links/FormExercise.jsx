
import React, { useState } from 'react'
import {
  TextField,
  Button,
  Box
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import '../../scss/layout/_FormExercise.scss'

function FormExercise({ onSubmit = () => {}, isLoading = false, title = 'Agregar Ejercicio' }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    series: '',
    reps: '',
    weight: ''
  })

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

    // Limpiar formulario
    setForm({
      name: '',
      description: '',
      series: '',
      reps: '',
      weight: ''
    })
  }

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
      <Box className="form-exercise__buttons">
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleSubmit}
          className="form-exercise__button"
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </Button>
      </Box>
    </div>
  )
}

export default FormExercise
