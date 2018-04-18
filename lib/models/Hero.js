const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredString = {
    type: String,
    required: true
};
const positiveNumber = {
    type: Number,
    min: 0
};

const schema = new Schema({
    alias: requiredString,
    name: String,
    nationality: String,
    age: positiveNumber,
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