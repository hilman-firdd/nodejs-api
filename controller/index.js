const mahasiswa = require('./mahasiswa');
const jurusan = require('./jurusan');
const axios = require('./axios');
const controller = {};

controller.mahasiswa = mahasiswa;
controller.jurusan = jurusan;
controller.axios = axios;

module.exports = controller;