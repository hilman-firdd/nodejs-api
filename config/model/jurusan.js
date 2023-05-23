const {Sequelize, DataTypes} = require('sequelize');
const db = require('../database/mysql');

var jurusan = db.define('jurusan', {
    kd_jurusan: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    nama_jurusan: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    freezeTableName:true,
    timestamps:false
});

jurusan.removeAttribute('id');

jurusan.sync().then(() => {
    console.log('jurusan table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = jurusan