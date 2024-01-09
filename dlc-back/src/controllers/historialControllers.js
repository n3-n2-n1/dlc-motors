    const db = require('../database/db');


    const getHistorial = (req, res) => {
        db.query("SELECT * FROM devoluciones, errores, movimientos LIMIT 10", (error, results, fields) => {
            if (error) {
                console.error("An error occurred while executing the query", error);
                res.status(500).json({ error: "Error al abrir la base de datos." });
                return;
            }

            console.log(results);
            res.json(results);
        });
    };


    const createHistorial = (req, res) => {
        const historialData = {
            accion: 'Nuevo Producto',
            descripcion: 'Producto insertado.',
            fecha: 'Ayer',
        };
    
        db.query(
            'INSERT INTO historial (accion, descripcion, fecha) VALUES (?, ?, ?)',
            [historialData.accion, historialData.descripcion, historialData.fecha],
            (error) => {
                if (error) {
                    console.error('Error al registrar la acción en el historial:', error);
                    return res.status(400).json({ error: 'Error al registrar la acción en el historial' });
                }
    
                console.log('Acción registrada en el historial correctamente.');
                return res.status(200).json({ message: 'Acción registrada en el historial correctamente' });
            }
        );
    };
    

    module.exports = {
        createHistorial,
        getHistorial,
    }