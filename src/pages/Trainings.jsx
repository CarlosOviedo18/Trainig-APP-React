import React, { useEffect, useState } from 'react'
import { Box, Alert } from '@mui/material'
import FormExercise from '../components/links/FormExercise'
import TrainingsList from '../components/TrainingsList'
import { useTrainings } from '../hooks/useTrainings'

function Trainings() {
  const { isLoading, message, trainings, getTrainings, createTraining, updateTraining, deleteTraining } = useTrainings()
  const [editingTraining, setEditingTraining] = useState(null)

  // Cargar entrenamientos al montar el componente
  useEffect(() => {
    getTrainings()
  }, [])

  const handleEditClick = (trainingId) => {
    // Buscar el entrenamiento a editar
    const training = trainings.find(t => t.id === trainingId)
    if (training) {
      // Parsear exercises si es JSON
      let exerciseData = {
        series: '',
        reps: '',
        weight: ''
      }
      
      if (training.exercises) {
        try {
          exerciseData = JSON.parse(training.exercises)
        } catch (e) {
          // Si no es JSON válido, mantener los valores por defecto
        }
      }

      setEditingTraining({
        ...training,
        ...exerciseData
      })
      // Scroll al formulario
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = (formData) => {
    if (editingTraining) {
      // Estamos editando
      updateTraining(editingTraining.id, formData)
      setEditingTraining(null)
    } else {
      // Estamos creando
      createTraining(formData)
    }
  }

  const handleCancel = () => {
    setEditingTraining(null)
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '2rem auto', px: 2 }}>
      
      {/* Mostrar mensaje de éxito o error */}
      {message.text && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      {/* Formulario para agregar o editar entrenamiento */}
      <Box sx={{ mb: 4 }}>
        <FormExercise
          onSubmit={handleSubmit}
          isLoading={isLoading}
          title={editingTraining ? 'Editar Entrenamiento' : 'Agregar Nuevo Entrenamiento'}
          initialData={editingTraining}
          onCancel={handleCancel}
        />
      </Box>

      {/* Lista de entrenamientos */}
      <TrainingsList 
        trainings={trainings}
        isLoading={isLoading}
        onDelete={deleteTraining}
        onEdit={handleEditClick}
      />
    </Box>
  )
}

export default Trainings


