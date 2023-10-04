const { DataTypes, sequelize } = require('../database');

const PublicacionSchema = sequelize.define('Publicaciones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detalle: {
    type: DataTypes.STRING,
    allowNull : false
  },
  autor: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
  fecha_publicacion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  url_imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  tableName: 'publicaciones',
  timestamps: false
});


  module.exports = PublicacionSchema;
