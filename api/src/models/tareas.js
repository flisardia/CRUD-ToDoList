const mongoose = require('mongoose')

const TareaSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Tareas', TareaSchema)