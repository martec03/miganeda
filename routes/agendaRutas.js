const express = require('express');
const rutas = express.Router();
const AgendaModel = require('../models/Agenda');

rutas.get('/', async (req, res) =>{
    try {
        const agendas = await AgendaModel.find();
        // console.log(tareas);
        res.json(agendas);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.post('/agregar', async (req, res) =>{
    // console.log(req.body);
    const nuevaAgenda = new AgendaModel({
        fecha: req.body.fecha,
        evento: req.body.evento,
        lugar: req.body.lugar,
        hora:req.body.hora,
        personal_contacto: req.body.personal_contacto,
        telefono_contacto: req.body.telefono_contacto,
        estado: req.body.estado,
        usuario:req.body.usuario

    });
    try {
        const guardarAgenda = await nuevaAgenda.save();
        res.status(201).json(guardarAgenda);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarAgenda = await AgendaModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarAgenda);
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarAgenda = await AgendaModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Registro de Agenda eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//consultas ----------------------
// - Listar agenda sengun el estado
rutas.get('/por_estados/:es', async (req, res) =>{
    try {
        console.log(req.params.es);
        const porestados = await AgendaModel.find({ estado: req.params.es});
        res.json(porestados);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});


// - Consultar agenda de por lugar 
rutas.get('/por_lugar/:lug', async (req, res) =>{
    try {
       
        const porlugar = await AgendaModel.find({ lugar:req.params.lug});
        res.json(porlugar);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

// consulta con findOne registro unico 
rutas.get('/finOne/:dato', async (req, res) =>{
    try {
       
        const findOne = await AgendaModel.findOne({ telefono_contacto:req.params.dato}).exec();
        res.json(findOne);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

// consulta estado y usuario
rutas.get('/estado_usuario', async (req, res) =>{
    try {
       const est = req.body.estado;
       const user = req.body.usuario;
        const findOne = await AgendaModel.find({estado:est, usuario:user},{evento:1,estado:1,usuario:1});
        res.json(findOne);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});












// - Ordenar la agenda segun la fecha
rutas.get('/ordenar', async (req, res) =>{
    try {
        const AgendaAscendente = await AgendaModel.find().sort({evento:1});
        //db.getCollection('collection1').find({}).sort({name:1})
        res.json(AgendaAscendente);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
// - Consultar una tarea especifica por Id
rutas.get('/tarea/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const tarea = await AgendaModel.findById(req.params.id);
        res.json(tarea);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
// - Eliminar todas las tareas con una prioridad determinada
rutas.delete('/eliminar-prioridad/:prioridad', async (req, res) =>{
    try {
        console.log(req.params.prioridad);
        const prioridad = req.params.prioridad
        const eliminarTareas = await TareaModel.deleteMany({prioridad});
        res.json({mensaje: 'Tareas eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
// - Consultar la tarea mas reciente anadida a la base de datos
rutas.get('/tarea-reciente', async (req, res) =>{
    try {
        const tarea = await AgendaModel.findOne().sort({_id: -1});
        res.json(tarea);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
module.exports = rutas;
