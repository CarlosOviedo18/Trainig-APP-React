import { useState } from 'react'

export const useTrainings = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [trainings, setTrainings] = useState([])

  const API_URL = 'http://localhost:3000/api'

  // =====================
  // FUNCIONES API
  // =====================

  // GET - Obtener todos los entrenamientos
  const getTrainings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_URL}/entrenamientos`)
      const data = await response.json()
      
      if (response.ok) {
        // Validar que sea un array
        if (Array.isArray(data)) {
          setTrainings(data)
        } else {
          setTrainings([])
        }
        setMessage({ type: '', text: '' })
      } else {
        setMessage({
          type: 'error',
          text: `❌ Error: ${data.message || 'Error desconocido'}`
        })
        setTrainings([])
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Error al obtener entrenamientos: ${error.message}`
      })
      setTrainings([])
    } finally {
      setIsLoading(false)
    }
  }

  // POST - Crear nuevo entrenamiento
  const createTraining = async (formData) => {
    try {
      setIsLoading(true)
      setMessage({ type: '', text: '' })

      const response = await fetch(`${API_URL}/entrenamientos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: '✅ Entrenamiento creado exitosamente'
        })
        // Agregar el nuevo entrenamiento a la lista
        setTrainings([...trainings, data.training])
      } else {
        setMessage({
          type: 'error',
          text: `❌ Error: ${data.message}`
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Error de conexión: ${error.message}`
      })
    } finally {
      setIsLoading(false)
    }
  }

  // PUT - Editar entrenamiento
  const updateTraining = async (id, formData) => {
    try {
      setIsLoading(true)
      setMessage({ type: '', text: '' })

      const response = await fetch(`${API_URL}/entrenamientos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: '✅ Entrenamiento actualizado exitosamente'
        })
        // Actualizar el entrenamiento en la lista
        setTrainings(trainings.map(t => t.id === id ? data.training : t))
      } else {
        setMessage({
          type: 'error',
          text: `❌ Error: ${data.message}`
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Error al actualizar: ${error.message}`
      })
    } finally {
      setIsLoading(false)
    }
  }

  // DELETE - Eliminar entrenamiento
  const deleteTraining = async (id) => {
    try {
      setIsLoading(true)
      setMessage({ type: '', text: '' })

      const response = await fetch(`${API_URL}/entrenamientos/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: '✅ Entrenamiento eliminado exitosamente'
        })
        // Eliminar de la lista
        setTrainings(trainings.filter(t => t.id !== id))
      } else {
        setMessage({
          type: 'error',
          text: `❌ Error: ${data.message}`
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: `❌ Error al eliminar: ${error.message}`
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Limpiar mensaje
  const clearMessage = () => {
    setMessage({ type: '', text: '' })
  }

  return {
    isLoading,
    message,
    trainings,
    getTrainings,
    createTraining,
    updateTraining,
    deleteTraining,
    clearMessage
  }
}
