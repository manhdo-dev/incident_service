const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var incidentTypeSchema = new Schema({
    name: String,
    active: {
        type: String,
        default: false
    },
    createAt: String,
    createBy: String,
    modifiedBy: String,
    modifiedAt: String
});

module.exports = mongoose.model('incidentType', incidentTypeSchema);