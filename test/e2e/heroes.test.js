const { assert } = require('chai');
const request = require('./request');
const Hero = require('../../lib/models/Hero');
const { dropCollection } = require('./db');

describe('Overwatch API', () => {

    before(() => dropCollection('heroes'));

});