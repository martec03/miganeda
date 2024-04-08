const mongoose = require("mongoose");
const agendaSchema = new mongoose.Schema({
    fecha : Date,
    evento : String,
    lugar : String,
    hora:String,
    personal_contacto:String,
    telefeono_contacto:String,
    estado:String,
    usuario:String
});

const Agenda = mongoose.model('Agenda', agendaSchema,'agenda');
module.exports = Agenda;