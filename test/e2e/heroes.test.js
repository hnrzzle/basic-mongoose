const { assert } = require('chai');
const request = require('./request');
const Hero = require('../../lib/models/Hero');
const { dropCollection } = require('./db');

describe('Overwatch API', () => {

    before(() => dropCollection('heros'));

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

    let genji = {
        alias: 'Genji',
        name: 'Genji Schimada',
        nationality: 'Japanese',
        age: 35,
        role: 'Flanker',
        affiliation: 'Overwatch',
        health: 200,
        primaryFire: {
            weapon: 'Shuriken',
            damage: 28
        },
        abilites: ['Cyber-Agility', 'Fan of Blades', 'Swift Strike', 'Deflect'],
        ultimate: 'Dragon Blade'
    };

    // it.skip('saves and gets a hero', () => {
    //     return new Hero(tracer).save()
    //         .then(saved => {
    //             saved = saved.toJSON();
    //             const { _id, __v } = saved;
    //             assert.ok(_id);
    //             assert.equal(__v, 0);
    //             assert.deepEqual(saved, {
    //                 _id, __v,
    //                 ...tracer
    //             });
    //             tracer = saved;
    //             return Hero.findById(saved._id).lean();
    //         })
    //         .then(found => {
    //             assert.deepEqual(found, tracer);
    //         });
    // });
    it('saves hero', () => {
        return request.post('/heroes')
            .send(tracer)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    _id, __v, ...tracer
                });
                tracer = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets a hero by id', () => {
        return Hero.create(genji).then(roundTrip)
            .then(saved => {
                genji = saved;
                return request.get(`/heroes/${genji._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, genji);
            });
    });

    it('updates a hero', () => {
        genji.role = 'DPS';
        
        return request.put(`/heroes/${genji._id}`)
            .send(genji)
            .then(({ body }) => {
                assert.deepEqual(body, genji);
                return Hero.findById(genji._id).then(roundTrip);
            })
            .then((updated) => {
                assert.deepEqual(updated, genji);
            });
    });

    const getFields = ({ _id, alias, role, affiliation }) => ({ _id, alias, role, affiliation });

    it('gets all heroes but only selected fields', () => {
        return request.get('/heroes')
            .then(({ body }) => {
                assert.deepEqual(body, [tracer, genji].map(getFields));
            });
    });

    it('deletes a hero', () => {
        return request.delete(`/heroes/${genji._id}`)
            .then(() => {
                return Hero.findById(genji._id);
            })
            .then(found => {
                assert.isNull(found);
            });
    });

    it('queries heroes', () => {
        return request.get('/heroes?role=Flanker')
            .then(({ body }) => {
                assert.deepEqual(body, [tracer].map(getFields));
            });
    });



});