const express = require('express');
const router = express.Router();
const db = require('../config/database/mysql');
const controller = require('../controller/index');

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './assets/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage})

router.get('/', controller.mahasiswa.getAll);
router.get('/search', controller.mahasiswa.getSearch);
router.get('/:nim', controller.mahasiswa.getOne);
router.post('/', upload.single('foto'), controller.mahasiswa.post);
router.put('/:nim', controller.mahasiswa.put);
router.delete('/:nim', controller.mahasiswa.delete);


//=========================================VIA QUERY===================================
// router.get('/', (req, res, next) => {
//     let sql = "SELECT * FROM mahasiswa";
//     db.query(sql, (err, result) => {
//         if(err) throw err;

//         res.status(200).json({
//             message: 'get method mahasuswa',
//             data: result
//         });
//     })
// });

// router.post('/', (req, res, next) => {
//     const nim = req.body.nim;
//     const nama = req.body.nama;
//     const jurusan = req.body.jurusan;
//     var sql = "INSERT INTO mahasiswa (nim, nama, jurusan) VALUES ('"+nim+"', '"+nama+"', '"+jurusan+"')";

//     db.query(sql, (err, result) => {
//         if(err) throw err;

//         res.status(200).json({
//             message: 'berhasil tambah data mahasiswa',
//         });
//     })
// });

// router.get('/:nim', (req, res, next) => {
//     const nim = req.params.nim;
//     let sql = "SELECT * FROM mahasiswa WHERE nim ="+nim;
//     db.query(sql, (err, result) => {
//         if(err) throw err;

//         if(result.length > 0) {
//             res.status(200).json({
//                 message: 'mahasiswa ditemukan',
//                 data: result
//             });
//         }else{
//             res.status(200).json({
//                 message: 'mahasiswa tidak ditemukan',
//                 data: result
//             });
//         }
//     })
// });

// router.put('/', (req, res, next) => {
//     const nim = req.body.nim;
//     const nama = req.body.nama;
//     const jurusan = req.body.jurusan;
//     var sql = "UPDATE mahasiswa SET nama = '"+nama+"', jurusan = '"+jurusan+"' WHERE nim = "+ nim;

//     db.query(sql, (err, result) => {
//         if(err) throw err;

//         res.status(200).json({
//             message: 'berhasil ubah mahasiswa',
//         });
//     })
// });

// router.delete('/:nim', (req, res, next) => {
//     const nim = req.params.nim;
//     var sql = "DELETE FROM mahasiswa WHERE nim = "+nim;

//     db.query(sql, (err, result) => {
//         if(err) throw err;

//         res.status(200).json({
//             message: 'berhasil delete mahasiswa '+nim,
//         });
//     })
// });

module.exports = router;