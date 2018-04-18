const router = require('express').Router();
const Hero = require('../models/Hero');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Hero.create(req.body)
            .then(hero => res.json(hero))
            .catch(err => errorHandler(err, req, res));
    })