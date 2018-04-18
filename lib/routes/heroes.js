const router = require('express').Router();
const Hero = require('../models/Hero');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Hero.create(req.body)
            .then(hero => res.json(hero))
            .catch(err => errorHandler(err, req, res));
    })
    
    .get('/:id', (req, res) => {
        const { id } = req.params;

        Hero.findById(id)
            .lean()
            .then(hero => {
                if(!hero) {
                    errorHandler({
                        status: 404,
                        error: `Hero id ${id} does not exist`
                    }, req, res);
                }
                else res.json(hero);
            })
            .catch(err => errorHandler(err, req, res));
    })

    .put('/:id', (req, res) => {
        const { id } = req.params;

        Hero.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
            .then(hero => res.json(hero))
            .catch(err => errorHandler(err, req, res));
    });