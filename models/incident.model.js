const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentsSchema = [{
    comment: String,
    createBy: String,
    createAt: String
}];

var incidentSchema = new Schema({
    propertyId: String,
    typeId: String,
    details: String,
    incidentDate: String,
    title: String,
    comments: [commentsSchema],
    createAt: String,
    createBy: String,
    modifiedBy: String,
    modifiedAt: String,
    removed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('incident', incidentSchema);