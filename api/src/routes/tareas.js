const express = require('express');
const router = express.Router();

const Tarea = require('../models/tareas')

//LISTA TODOS LOS ITEMS
router.get('/', async (req, res) => {
    try {
        const tarea = await Tarea.find();
        res.json(tarea)
    } catch (error) {
        res.json({ message: error });
    }
});


//GUARDA UN ITEM
router.post('/', async (req, res) => {

    try {
        const tarea = new Tarea({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion
        })
        const tareaSave = await tarea.save(tarea)
        res.json(tareaSave);
    } catch (error) {
        res.json({ message: error });
    }
});

//BUSCA UN ITEM POR ID
router.get('/:tareaId', async (req, res) => {
    try {
        const tarea = await Tarea.findById({ _id: req.params.tareaId });
        res.json(tarea)
    } catch (error) {
        res.json({ message: error });
    }
});

//ELIMINA UN ITEM
router.delete('/:tareaId', async (req, res) => {
    try {
        const tarea = await Tarea.deleteOne({ _id: req.params.tareaId });
        res.json(tarea)
    } catch (error) {
        res.json({ message: error });
    }
});

//ACTUALIZA UN ITEM
router.put('/:tareaId', async (req, res) => {
    try {
        const tarea = await Tarea.updateOne({ _id: req.params.tareaId }, {
            $set: {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion
            }
        });
        res.json(tarea)
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;