let mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

let Schema = mongoose.Schema;
const AssignmentSchema = Schema({
    date: String,
    title: String,
    description: String,
    status: String
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
