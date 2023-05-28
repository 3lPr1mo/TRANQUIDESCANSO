import { db } from "../database/db.js";
import {DataTypes} from "sequelize";

const registro_salida = db.define('registro_salida',{
    id:{type: DataTypes.NUMBER, primaryKey: true},
    fecha:{type: DataTypes.DATE},
    hora:{type: DataTypes.TIME},
},{
    timestamps:false,
    tableName: 'registro_salida'
});

export default registro_salida;