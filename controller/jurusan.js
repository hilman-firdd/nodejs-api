const model = require('../config/model/index')
const controller = {};
const { Op } = require('sequelize');
const db = require('../config/database/mysql');

controller.getAll = async function(req, res) {
    try {
        let jurusan = await model.jurusan.findAll()
        if(jurusan.length > 0) {
            res.status(200).json({
                message: 'data semua jurusan',
                data: jurusan
            });
        }else{
            res.status(200).json({
                message: 'tidak ada data',
                data: []
            })
        }
    } catch(error) {
        res.status(404).json({
            message: error.message
        })
    }
}

controller.post = async function(req, res) {
    try {
        let jurusan = await model.jurusan.create({
            kd_jurusan : req.body.kd_jurusan,
            nama_jurusan : req.body.nama_jurusan
        })

        res.status(200).json({
            message: 'berhasil tambah data jurusan',
            data: jurusan
        })
    }catch(error) {
        res.status(200).json({
            message: error.message,
        })
    }
}


module.exports = controller;