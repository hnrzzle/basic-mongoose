const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    alias: requiredString,
    name: String,
    nationality: String,
    age: Number,
    affiliation: {
        type: String,
        enum: ['Overwatch', 'Talon']
    },
    health: Number,
    primaryFire: {
        weapon: requiredString,
        damage: {
            type: Number,
            min: 0,
            required: true
        }
    },
    abilities: [requiredString],
    ultimate: requiredString
});

module.exports = mongoose.model('Hero', schema);