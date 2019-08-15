const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require('bcryptjs');

const StudentSchema = new mongoose.Schema({

    username: {
    type: String,
    required: true
    },
    first_name1: {
    type: String,
    required: true
    },
    last_name1: {
    type: String,
    required: true
    },
    first_name2: {
    type: String,
    required: true
    },
    last_name2: {
    type: String,
    required: true
    },
    Marks: {
    type: Number,
    required: true
    },
    School: {
    type: String,
    required: true
    },
    Standard: {
    type: Number,
    required: true
    },

});

StudentSchema.plugin(passportLocalMongoose);

const Student = mongoose.model('Student', StudentSchema,"students");

module.exports = Student;
