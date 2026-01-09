import express from 'express';
import pool from '../database.js';

const router = express.Router();

// =====================
// RUTAS DE ENTRENAMIENTOS
// =====================

// GET - Obtener todos los entrenamientos del usuario
router.get('/entrenamientos', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [trainings] = await connection.query('SELECT * FROM trainings ORDER BY created_at DESC');
        connection.release();
        res.json(trainings);
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
        const { name, description, duration, series, reps, weight } = req.body;
        
        // Validar datos requeridos
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'El nombre del ejercicio es requerido' });
        }

        // Obtener o crear usuario de prueba (por ahora sin autenticación)
        const connection = await pool.getConnection();
        
        // Buscar si existe algún usuario
        const [users] = await connection.query('SELECT id FROM users LIMIT 1');
        let userId;
        
        if (users.length === 0) {
            // Si no hay usuarios, crear uno de prueba
            const [insertResult] = await connection.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                ['Usuario Anónimo', 'anonimo@example.com', '123456']
            );
            userId = insertResult.insertId;
        } else {
            userId = users[0].id;
        }

        // Insertar entrenamiento
        const [result] = await connection.query(
            'INSERT INTO trainings (user_id, name, description, duration, exercises) VALUES (?, ?, ?, ?, ?)',
            [userId, name, description || '', duration || 0, JSON.stringify({ series, reps, weight })]
        );
        connection.release();

        res.status(201).json({ 
            message: 'Entrenamiento creado exitosamente',
            id: result.insertId,
            training: { id: result.insertId, name, description, duration, series, reps, weight }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

// PUT - Actualizar entrenamiento
router.put('/entrenamientos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, duration, series, reps, weight } = req.body;
        
        // Validar datos requeridos
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'El nombre del ejercicio es requerido' });
        }

        // Actualizar en la BD
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'UPDATE trainings SET name = ?, description = ?, duration = ?, exercises = ? WHERE id = ?',
            [name, description || '', duration || 0, JSON.stringify({ series, reps, weight }), id]
        );
        connection.release();

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Entrenamiento no encontrado' });
        }

        res.status(200).json({ 
            message: 'Entrenamiento actualizado exitosamente',
            training: { id, name, description, duration, series, reps, weight }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

// DELETE - Eliminar entrenamiento
router.delete('/entrenamientos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Eliminar de la BD
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'DELETE FROM trainings WHERE id = ?',
            [id]
        );
        connection.release();

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Entrenamiento no encontrado' });
        }

        res.status(200).json({ 
            message: 'Entrenamiento eliminado exitosamente',
            id: id
        });
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
        
        // Validar datos requeridos
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });
        }

        // Insertar usuario en la BD
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password] // TODO: Encriptar contraseña con bcrypt
        );
        connection.release();

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente',
            id: result.insertId,
            user: { id: result.insertId, name, email }
        });
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
