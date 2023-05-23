const {Sequelize, DataTypes} = require('sequelize');
const db = require('../database/mysql');
const jurusan = require('./jurusan');

var mahasiswa = db.define('mahasiswa', {
    nim: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kd_jurusan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    angkatan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    freezeTableName:true,
    timestamps:false
});

mahasiswa.hasOne(jurusan, { foreignKey: 'kd_jurusan'});
mahasiswa.belongsTo(jurusan, { foreignKey: 'kd_jurusan'});

mahasiswa.removeAttribute('id');

mahasiswa.sync().then(() => {
    console.log('mahasiswa table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });


module.exports = mahasiswa