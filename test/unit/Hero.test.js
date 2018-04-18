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

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'expected validation errors but got none');
        return validation.errors;
    };

    it('required fields', () => {
        const hero = new Hero({});
        const errors = getValidationErrors(hero.validateSync());
        assert.equal(Object.keys(errors).length, 4); // should be 5
        assert.equal(errors.alias.kind, 'required');
        assert.equal(errors.ultimate.kind, 'required');
        assert.equal(errors['primaryFire.weapon'].kind, 'required');
        assert.equal(errors['primaryFire.damage'].kind, 'required');
        // assert.equal(errors.abilites.kind, 'required');
    });

});