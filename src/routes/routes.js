import express from 'express';
import pool from '../database.js';

const router = express.Router();

// =====================
// RUTAS DE ENTRENAMIENTOS
// =====================

// GET - Obtener todos los entrenamientos del usuario
router.get('/entrenamientos', async (req, res) => {
    try {
        // TODO: Obtener entrenamientos de la BD
        res.json({ message: 'Obtener todos los entrenamientos' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

// GET - Obtener un entrenamiento por ID
router.get('/entrenamientos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // TODO: Obtener entrenamiento específico por ID
        res.json({ message: `Obtener entrenamiento con ID: ${id}` });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

// POST - Crear nuevo entrenamiento
router.post('/entrenamientos', async (req, res) => {
    try {
        const { name, description, duration, exercises } = req.body;
        // TODO: Validar datos
        // TODO: Insertar en BD
        res.status(201).json({ message: 'Entrenamiento creado' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

// PUT - Actualizar entrenamiento
router.put('/entrenamientos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, duration, exercises } = req.body;
        // TODO: Validar datos
        // TODO: Actualizar en BD
        res.json({ message: `Entrenamiento ${id} actualizado` });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

// DELETE - Eliminar entrenamiento
router.delete('/entrenamientos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // TODO: Eliminar de la BD
        res.json({ message: `Entrenamiento ${id} eliminado` });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});


        



// =====================
// RUTAS DE AUTENTICACIÓN
// =====================

// POST - Registrar usuario
router.post('/registro', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // TODO: Validar datos
        // TODO: Encriptar contraseña
        // TODO: Insertar en BD
        // TODO: Generar JWT
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

// POST - Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // TODO: Validar datos
        // TODO: Buscar usuario en BD
        // TODO: Comparar contraseña
        // TODO: Generar JWT
        res.json({ message: 'Login exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

export default router;
