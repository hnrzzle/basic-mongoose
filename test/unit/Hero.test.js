const { assert } = require('chai');
const Hero = require('../../lib/models/Hero');

describe('Hero model', () => {

    it('valid good model', () => {
        const data = {
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
        assert.equal(Object.keys(errors).length, 5);
        assert.equal(errors.role.kind, 'required');
        assert.equal(errors.alias.kind, 'required');
        assert.equal(errors.ultimate.kind, 'required');
        assert.equal(errors['primaryFire.weapon'].kind, 'required');
        assert.equal(errors['primaryFire.damage'].kind, 'required');
    });
    it('role must be enum, age must be a number, damage must be positive number', () => {
        const hero = new Hero({
            alias: 'test',
            age: 'test',
            role: 'test',
            primaryFire: {
                weapon: 'test',
                damage: -20
            },
            ultimate: 'test'
        });
        const errors = getValidationErrors(hero.validateSync());
        assert.equal(errors.role.kind, 'enum');
        assert.equal(errors['primaryFire.damage'].kind, 'min');
    });

});