const mongoose = require('mongoose');

const VOCASchema = new mongoose.Schema({
    voca : { type:String, required:true, unique:true },
    meaning : { type:String, required:true },
});

module.exports = mongoose.model('VOCA', VOCASchema);

