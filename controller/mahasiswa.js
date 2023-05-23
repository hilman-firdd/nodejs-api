const model = require('../config/model/index')
const controller = {};
const { Op } = require('sequelize');

controller.getAll = async function(req, res) {
    try {
        let mahasiswa = await model.mahasiswa.findAll({
            attributes: [
                ['nim', 'nimMahasiswa'],
                ['nama', 'namaMahasiswa'],
                ['kd_jurusan', 'kodeJurusan'],
                ['alamat', 'alamat'],
                ['angkatan', 'tahunAngkatan'],
            ],
            include: [
                { model: model.jurusan }
            ],
            where:{
                [Op.and]: [
                    { nama: 'Udin Petot'},
                    { kd_jurusan: 'TKJ'}
                ]
            },
            order: [['angkatan', 'asc']],
            // limit: 2
        })

        if(mahasiswa.length > 0) {
            res.status(200).json({
                message: 'get method mahasiswa',
                data: mahasiswa
            });
        }else{
            res.status(200).json({
                message: 'tidak ada data',
                data: []
            });
        }
    }catch(error){
        res.status(404).json({
            message:error
        })
    }
}

controller.getSearch = async function(req, res) {
    const search = req.query.keyword;
    try {
        let mahasiswa = await model.mahasiswa.findAll({
            attributes: [
                ['nim', 'nimMahasiswa'],
                ['nama', 'namaMahasiswa'],
                ['kd_jurusan', 'kodeJurusan'],
                ['alamat', 'alamat'],
                ['angkatan', 'tahunAngkatan'],
            ],
            where:{
                [Op.or]: [{ 
                    nim: {
                        [Op.like]: '%' +search+ '%'
                    },
                },{
                    nama: {
                        [Op.like]: '%' +search+ '%'
                    }
                }]
            }
        })

        if(mahasiswa.length > 0) {
            res.status(200).json({
                message: 'get method mahasiswa',
                data: mahasiswa
            });
        }else{
            res.status(200).json({
                message: 'tidak ada dataa',
                data: []
            });
        }
    }catch(error){
        res.status(404).json({
            message:error
        })
    }
}


controller.getOne = async function(req, res) {
    try {
        let mahasiswa = await model.mahasiswa.findAll({
            where: {
                nim: req.params.nim
            }
        })

        if(mahasiswa.length > 0) {
            res.status(200).json({
                message: 'mahasiswa ditemukan',
                data: mahasiswa
            });
        }else{
            res.status(200).json({
                message: 'mahasiswa tidak ditemukan',
                data: []
            });
        }
    }catch(err){
        res.status(404).json({
            message: err.message
        });
    }
}

controller.post = async function(req, res) {
    try{
        let mahasiswa = await model.mahasiswa.create({
            nim: req.body.nim,
            nama: req.body.nama,
            kd_jurusan: req.body.kd_jurusan,
            alamat: req.body.alamat,
            angkatan: req.body.angkatan,
            foto: req.file.path
        })

        res.status(201).json({
            message: 'berhasil tambah data mahasiswa',
            data: mahasiswa
        });
    }catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}

controller.put = async function(req, res) {
    try{
        let mahasiswa = await model.mahasiswa.update({
            nama: req.body.nama,
            kd_jurusan: req.body.kd_jurusan,
            alamat: req.body.alamat,
            angkatan: req.body.angkatan
        }, {
            where: {
                nim: req.params.nim
            }
        })

        res.status(200).json({
            message: 'berhasil ubah data mahasiswa'
        });
    }catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}

controller.delete = async function(req, res) {
    try{
        let mahasiswa = await model.mahasiswa.destroy({
            where: {
                nim: req.params.nim
            }
        })

        res.status(200).json({
            message: 'berhasil hapus data mahasiswa'
        });
    }catch(err){
        res.status(404).json({
            message: err.message
        })
    }
}

module.exports = controller