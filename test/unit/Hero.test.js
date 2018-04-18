const { assert } = require('chai');
const Hero = require('../../lib/models/Hero');

describe('Hero model', () => {

    it('valid model', () => {
        const data = {
            alias: 'Tracer',
            name: 'Lena Oxton',
            nationality: 'British',
            age: 26,
            affiliation: 'Overwatch',
            health: 150,
            primaryFire: {
                weapon: 'Pulse Pistols',
                damage: 12
            },
            abilities: ['blink', 'recall'],
            ultimate: 'Pulse Bomb'
        };
        const tracer = new Hero(data);

        assert.deepEqual(tracer.toJSON(), { _id: tracer._id, ...data });
    });

});