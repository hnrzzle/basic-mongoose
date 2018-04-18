const { assert } = require('chai');
const request = require('./request');
const Hero = require('../../lib/models/Hero');
const { dropCollection } = require('./db');

describe('Overwatch API', () => {

    before(() => dropCollection('heroes'));

    let tracer = {
        alias: 'Tracer',
        name: 'Lena Oxton',
        nationality: 'British',
        age: 26,
        role: 'Flanker',
        affiliation: 'Overwatch',
        health: 150,
        primaryFire: {
            weapon: 'Pulse Pistols',
            damage: 12
        },
        abilities: ['blink', 'recall'],
        ultimate: 'Pulse Bomb'
    };

    it('saves and gets a hero', () => {
        return new Hero(tracer).save()
            .then(saved => {
                saved = saved.toJSON();
                const { _id, __v } = saved;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(saved, {
                    _id, __v,
                    ...tracer
                });
                tracer = saved;
                return Hero.findById(saved._id).lean();
            })
            .then(found => {
                assert.deepEqual(found, tracer);
            });
    });

});