const mahasiswa = require('./mahasiswa');
const axios = require('./axios');
const controller = {};

controller.mahasiswa = mahasiswa;
controller.axios = axios;
module.exports = controller;